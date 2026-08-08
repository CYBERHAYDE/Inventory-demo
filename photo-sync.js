/**
 * CyberHayde Inventory — Offline-first photo sync
 * -------------------------------------------------
 * Drop this file in alongside app.js and add:
 *     <script src="photo-sync.js"></script>
 * to index.html, right BEFORE <script src="app.js"></script>.
 *
 * What it does:
 *   - Every photo a staff member adds is saved instantly to IndexedDB on
 *     the device, so it works with zero internet connection, same as the
 *     rest of the app.
 *   - Whenever the device is online, it quietly uploads any queued photos
 *     to your Apps Script backend, which stores them in Google Drive and
 *     writes the resulting URL back into your Sheet.
 *   - Once a photo finishes uploading, the app's local copy is swapped
 *     for the permanent Drive URL automatically.
 *
 * You only need to touch three spots in app.js — see "INTEGRATION" at the
 * bottom of this file for the exact snippets.
 */

const PhotoSync = (() => {
  const DB_NAME = 'chPhotoQueue';
  const STORE_NAME = 'queue';
  const RETRY_INTERVAL_MS = 20000; // also retry every 20s, not just on the 'online' event

  let config = null;          // { endpointUrl, secret }
  let onSyncedCallback = null; // (itemId, url) => void — you provide this
  let pendingIds = new Set();  // itemIds currently waiting to upload
  let dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(STORE_NAME, { keyPath: 'itemId' });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  async function dbPut(record) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function dbDelete(itemId) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(itemId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function dbGetAll() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async function uploadRecord(record) {
    try {
      const res = await fetch(config.endpointUrl, {
        method: 'POST',
        // IMPORTANT: text/plain avoids a CORS preflight request, which
        // Apps Script Web Apps don't handle. The backend still reads and
        // JSON.parses the raw body fine regardless of this header.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'uploadPhoto',
          secret: config.secret,
          itemId: record.itemId,
          base64: record.base64,
          filename: record.filename,
          mimeType: record.mimeType
        })
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Upload failed');

      await dbDelete(record.itemId);
      pendingIds.delete(record.itemId);
      if (onSyncedCallback) onSyncedCallback(record.itemId, data.url);
      return true;
    } catch (err) {
      // Leave it in the queue — the retry loop will try again later.
      console.warn('[PhotoSync] upload failed, will retry:', err.message);
      return false;
    }
  }

  async function syncAll() {
    if (!navigator.onLine) return;
    const records = await dbGetAll();
    for (const record of records) {
      await uploadRecord(record); // sequential, so a slow connection doesn't pile up requests
    }
  }

  /**
   * Call this once on app startup.
   * @param {Object} cfg
   * @param {string} cfg.endpointUrl - your deployed Apps Script Web App URL
   * @param {string} cfg.secret - must match UPLOAD_SECRET in the Apps Script
   * @param {function} cfg.onSynced - (itemId, driveUrl) => void, called when a queued photo finishes uploading
   */
  async function init(cfg) {
    config = cfg;
    onSyncedCallback = cfg.onSynced || null;

    const queued = await dbGetAll();
    pendingIds = new Set(queued.map(r => r.itemId));

    window.addEventListener('online', syncAll);
    setInterval(syncAll, RETRY_INTERVAL_MS);
    syncAll(); // in case the app was reopened while already online with leftovers
  }

  /**
   * Call this the moment a new photo is ready (already compressed via
   * your existing compressImage()). Saves it locally immediately and
   * tries to upload right away if online.
   * @param {string|number} itemId
   * @param {string} base64DataUrl - e.g. "data:image/jpeg;base64,...."
   */
  async function queuePhoto(itemId, base64DataUrl) {
    const record = {
      itemId,
      base64: base64DataUrl,
      filename: `item-${itemId}.jpg`,
      mimeType: 'image/jpeg',
      createdAt: Date.now()
    };
    await dbPut(record);
    pendingIds.add(itemId);
    uploadRecord(record); // fire immediately; if it fails, it's already queued for retry
  }

  function isPending(itemId) {
    return pendingIds.has(itemId);
  }

  function pendingCount() {
    return pendingIds.size;
  }

  return { init, queuePhoto, isPending, pendingCount, syncAll };
})();


/* =====================================================================
   INTEGRATION — three small edits inside app.js
   ===================================================================== */

/*
1) Near the top of app.js, after your other startup code, initialize it:

   PhotoSync.init({
     endpointUrl: 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE',
     secret: 'PASTE_THE_SAME_UPLOAD_SECRET_FROM_YOUR_APPS_SCRIPT_HERE',
     onSynced: (itemId, url) => {
       const item = items.find(i => i.id === itemId);
       if (item) {
         item.photo = url;      // swap the local base64 preview for the real Drive URL
         persistItems();
         renderAll();
       }
     }
   });

2) In submitNewItem(), right after the item is pushed into the items array
   (look for the line that does items.push({... photo: pendingPhoto ...})),
   add this right after it:

   if (pendingPhoto) PhotoSync.queuePhoto(id, pendingPhoto);

   (id is already in scope there — it's the same id used in the push.)

3) In photoCell(), add a small "syncing" badge for photos not yet backed
   up to Drive. Replace the existing function with:

   function photoCell(i){
     if (!i.photo) return `<div class="thumb-ph">📦</div>`;
     const syncing = PhotoSync.isPending(i.id)
       ? `<span class="pill pending" style="position:absolute;font-size:9px;">⏳</span>`
       : '';
     return `<div style="position:relative; display:inline-block;">
               <img class="thumb" src="${esc(i.photo)}">${syncing}
             </div>`;
   }
*/
