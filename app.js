/* ================= Config ================= */
/* One-per-organization deployment: this file is handed to a single business, not
   distributed publicly, so this key only ever needs to resist that one business's
   own staff — not the general public. Still, CyberHayde should generate a fresh
   random key per client at setup time (never reuse '4471' across deployments) and
   only tell the actual business owner, not the person doing the install. */
const ADMIN_SETUP_KEY = '4471';
PhotoSync.init({ endpointUrl: 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE', secret: 'PASTE_THE_SAME_UPLOAD_SECRET_FROM_YOUR_APPS_SCRIPT_HERE', onSynced: (itemId, url) => { const item = items.find(i => i.id === itemId); if (item) { item.photo = url; persistItems(); renderAll(); } } });

/* ================= Fictional gadget catalog ================= */
let items = JSON.parse(localStorage.getItem('ch_items') || 'null') || [
  {id:1, name:'Type-C Fast Charger Cable 1m', category:'Chargers & Cables', unit:'piece', cost:800, price:1200, stock:45, reorder:15, photo:null, barcode:'6009001000011'},
  {id:2, name:'Samsung 25W Fast Charger Adapter', category:'Chargers & Cables', unit:'piece', cost:3200, price:4500, stock:12, reorder:8, photo:null, barcode:'6009001000028'},
  {id:3, name:'iPhone Lightning Cable (Original Quality)', category:'Chargers & Cables', unit:'piece', cost:1800, price:2800, stock:6, reorder:10, photo:null, barcode:'6009001000035'},
  {id:4, name:'Bluetooth TWS Earbuds', category:'Audio', unit:'piece', cost:4500, price:6500, stock:9, reorder:8, photo:null, barcode:'6009001000042'},
  {id:5, name:'Anker Power Bank 10000mAh', category:'Power Banks', unit:'piece', cost:8500, price:11500, stock:5, reorder:6, photo:null, barcode:'6009001000059'},
  {id:6, name:'Generic Power Bank 20000mAh', category:'Power Banks', unit:'piece', cost:6200, price:8900, stock:14, reorder:8, photo:null, barcode:'6009001000066'},
  {id:7, name:'iPhone 13/14 Silicone Case', category:'Phone Accessories', unit:'piece', cost:900, price:1500, stock:22, reorder:10, photo:null, barcode:'6009001000073'},
  {id:8, name:'Tempered Glass Screen Protector', category:'Phone Accessories', unit:'piece', cost:250, price:500, stock:3, reorder:20, photo:null, barcode:'6009001000080'},
  {id:9, name:'Wireless Mouse', category:'Computer Accessories', unit:'piece', cost:2200, price:3200, stock:8, reorder:6, photo:null, barcode:'6009001000097'},
  {id:10, name:'JBL-Style Bluetooth Speaker', category:'Audio', unit:'piece', cost:6800, price:9500, stock:4, reorder:5, photo:null, barcode:'6009001000103'},
  {id:11, name:'SanDisk 64GB Memory Card', category:'Storage', unit:'piece', cost:3400, price:4800, stock:16, reorder:8, photo:null, barcode:'6009001000110'},
  {id:12, name:'Adjustable Phone Holder/Stand', category:'Phone Accessories', unit:'piece', cost:700, price:1200, stock:27, reorder:10, photo:null, barcode:'6009001000127'},
  {id:13, name:'HDMI Cable 2m', category:'Chargers & Cables', unit:'piece', cost:1100, price:1800, stock:11, reorder:8, photo:null, barcode:'6009001000134'},
  {id:14, name:'Laptop Backpack', category:'Computer Accessories', unit:'piece', cost:7200, price:10500, stock:2, reorder:5, photo:null, barcode:'6009001000141'},
  {id:15, name:'Fitness Smart Watch', category:'Wearables', unit:'piece', cost:9800, price:14500, stock:6, reorder:5, photo:null, barcode:'6009001000158'},
  {id:16, name:'Dual USB Car Charger', category:'Chargers & Cables', unit:'piece', cost:1500, price:2400, stock:19, reorder:10, photo:null, barcode:'6009001000165'},
];
const CATEGORIES = ['Chargers & Cables','Audio','Power Banks','Phone Accessories','Computer Accessories','Storage','Wearables'];

let sales = JSON.parse(localStorage.getItem('ch_sales') || 'null') || [
  {id:'A-1036', date:'Mon', time:'9:40 AM', staff:'Tunde (ST-001)', payment:'Cash', total:4500, lines:[{name:'iPhone 13/14 Silicone Case', qty:3, price:1500}]},
  {id:'A-1037', date:'Mon', time:'1:10 PM', staff:'Chidinma (ST-002)', payment:'Transfer', total:9500, lines:[{name:'JBL-Style Bluetooth Speaker', qty:1, price:9500}]},
  {id:'A-1038', date:'Tue', time:'10:22 AM', staff:'Tunde (ST-001)', payment:'Cash', total:2400, lines:[{name:'Tempered Glass Screen Protector', qty:2, price:500},{name:'Type-C Fast Charger Cable 1m', qty:1, price:1200},{name:'Tempered Glass Screen Protector', qty:1, price:500}]},
  {id:'A-1039', date:'Tue', time:'3:45 PM', staff:'Chidinma (ST-002)', payment:'POS', total:6500, lines:[{name:'Bluetooth TWS Earbuds', qty:1, price:6500}]},
  {id:'A-1040', date:'Wed', time:'11:05 AM', staff:'Tunde (ST-001)', payment:'Cash', total:3000, lines:[{name:'Tempered Glass Screen Protector', qty:4, price:500},{name:'Type-C Fast Charger Cable 1m', qty:1, price:1200},{name:'Type-C Fast Charger Cable 1m', qty:1, price:1200}]},
  {id:'A-1042', date:'Today', time:'9:14 AM', staff:'Tunde (ST-001)', payment:'Cash', total:8500,
    lines:[{name:'Type-C Fast Charger Cable 1m', qty:2, price:1200},{name:'Tempered Glass Screen Protector', qty:2, price:500},{name:'iPhone 13/14 Silicone Case', qty:4, price:1500}] },
  {id:'A-1043', date:'Today', time:'10:02 AM', staff:'Chidinma (ST-002)', payment:'Transfer', total:6500, lines:[{name:'Bluetooth TWS Earbuds', qty:1, price:6500}] },
  {id:'A-1044', date:'Today', time:'11:47 AM', staff:'Tunde (ST-001)', payment:'POS', total:11500, lines:[{name:'Anker Power Bank 10000mAh', qty:1, price:11500}] },
];
let saleCounter = 1045;

let settings = JSON.parse(localStorage.getItem('ch_settings') || 'null') || {
  name:'Adaeze Gadgets & Accessories', phone:'0803 214 8890', address:'14 Ojokoro Road, Iju-Ishaga, Lagos',
  footer:'Thank you for shopping with us. No refund on opened items.', paper:'Thermal 58mm', wa:'2348032148890', lockTimeout:60, vatRate:0, btService:'000018f0-0000-1000-8000-00805f9b34fb', btChar:'00002af1-0000-1000-8000-00805f9b34fb'
};

/* ================= Users / auth ================= */
let users = JSON.parse(localStorage.getItem('ch_users') || '[]');
let activityLog = JSON.parse(localStorage.getItem('ch_log') || '[]');
let currentUser = JSON.parse(sessionStorage.getItem('ch_current') || 'null');
let cart = [];
let pendingRegUser = null; // holds a just-registered user awaiting PIN setup
let scanTarget = null; // 'inventory' | 'sale'
let lockTimer = null;
let enteredPin = '';

function persistUsers(){ localStorage.setItem('ch_users', JSON.stringify(users)); }
function persistLog(){ localStorage.setItem('ch_log', JSON.stringify(activityLog)); }
function persistItems(){ localStorage.setItem('ch_items', JSON.stringify(items)); }
function persistSales(){ localStorage.setItem('ch_sales', JSON.stringify(sales)); }
function persistSettings(){ localStorage.setItem('ch_settings', JSON.stringify(settings)); }

function nextUserId(role){ const count = users.filter(u=>u.role===role).length + 1; return (role==='admin' ? 'AD-' : 'ST-') + String(count).padStart(3,'0'); }
function logActivity(action){
  const who = currentUser ? `${currentUser.name} (${currentUser.id})` : 'System';
  const roleLabel = currentUser ? currentUser.role : '—';
  activityLog.push({ time: new Date().toLocaleString('en-NG',{hour:'2-digit',minute:'2-digit',day:'2-digit',month:'short'}), user: who, role: roleLabel, action });
  persistLog();
}
function naira(n){ return '₦' + Number(n||0).toLocaleString('en-NG'); }

/* ---- XSS-safe escaping for any user-supplied text going into innerHTML ---- */
function esc(str){
  return String(str==null?'':str).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

/* ---- Client-side password hashing (SHA-256 + per-user salt via Web Crypto) ----
   NOTE: this is a mitigation, not a fix. Hashing happens in the browser, so it stops
   plaintext passwords sitting in localStorage in the clear (protects against casual
   device access / exported backups), but it can't stop someone reading the app's own
   JS and reproducing the hash function — that class of attack only goes away with a
   real server that verifies passwords and never ships the check to the client. */
async function hashSecret(secret, saltHex){
  const enc = new TextEncoder();
  const data = enc.encode(saltHex + ':' + secret);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
function randomSaltHex(){
  const arr = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(arr).map(b=>b.toString(16).padStart(2,'0')).join('');
}

/* ---- Auth gate rendering ---- */
function renderAuthGate(view){
  const card = document.getElementById('authCard');
  const hasAdmin = users.some(u=>u.role==='admin');
  if(!hasAdmin && view!=='registerAdmin') view = 'registerAdmin';
  if(!view) view = hasAdmin ? 'login' : 'registerAdmin';

  if(view==='registerAdmin'){
    card.innerHTML = `
      <div class="amark">A</div>
      <h2>${hasAdmin ? 'Register an Admin account' : 'Welcome — set up the Admin account'}</h2>
      <p class="sub">${hasAdmin ? 'Only someone with the setup key can create another admin account.' : 'This is the first time the app is opening. Create the owner/admin account to get started.'}</p>
      <div class="form-row"><label>Your full name</label><input type="text" id="aName" placeholder="e.g. Adaeze Okafor"></div>
      <div class="form-row"><label>Create a password</label><input type="password" id="aPass" placeholder="At least 4 characters"></div>
      <div class="form-row"><label>Confirm password</label><input type="password" id="aPass2" placeholder="Re-enter password"></div>
      <div class="form-row"><label>Admin setup key</label><input type="password" id="aKey" placeholder="Ask the business owner for this"></div>
      <div class="demohint">Demo setup key: <b class="mono">${ADMIN_SETUP_KEY}</b> — in a real deployment this key is private and only shared by CyberHayde with the actual business owner.</div>
      <div class="errtext" id="authErr"></div>
      <button class="btn gold" style="width:100%; margin-top:14px;" onclick="submitRegisterAdmin()">Create Admin account</button>
      ${hasAdmin ? `<div class="switchline">Already have an account? <a onclick="renderAuthGate('login')">Log in</a></div>` : ''}
    `;
  } else if(view==='registerStaff'){
    card.innerHTML = `
      <div class="amark">A</div>
      <h2>Register as Staff</h2>
      <p class="sub">No setup key needed — an admin can see exactly who registers, and when, in the Activity Log.</p>
      <div class="form-row"><label>Your full name</label><input type="text" id="sName" placeholder="e.g. Tunde Balogun"></div>
      <div class="form-row"><label>Create a password</label><input type="password" id="sPass" placeholder="At least 4 characters"></div>
      <div class="form-row"><label>Confirm password</label><input type="password" id="sPass2" placeholder="Re-enter password"></div>
      <div class="errtext" id="authErr"></div>
      <button class="btn gold" style="width:100%; margin-top:6px;" onclick="submitRegisterStaff()">Register</button>
      <div class="switchline">Already registered? <a onclick="renderAuthGate('login')">Log in</a></div>
    `;
  } else {
    card.innerHTML = `
      <div class="amark">A</div>
      <h2>Log in</h2>
      <p class="sub">Enter the ID you were given when you registered.</p>
      <div class="form-row"><label>Your ID</label><input type="text" id="lId" placeholder="e.g. ST-001"></div>
      <div class="form-row"><label>Password</label><input type="password" id="lPass" placeholder="Your password"></div>
      <div class="errtext" id="authErr"></div>
      <button class="btn gold" style="width:100%; margin-top:6px;" onclick="submitLogin()">Log in</button>
      <div class="switchline">New staff member? <a onclick="renderAuthGate('registerStaff')">Register here</a></div>
      <div class="switchline">Setting up as the owner? <a onclick="renderAuthGate('registerAdmin')">Admin setup</a></div>
    `;
  }
}
function showIdConfirm(user){
  const card = document.getElementById('authCard');
  card.innerHTML = `
    <div class="amark">A</div>
    <h2>You're all set, ${esc(user.name.split(' ')[0])}</h2>
    <p class="sub">Save this ID — you'll use it to log in every time after today.</p>
    <div class="yourid"><div class="lbl">Your login ID</div><div class="val">${esc(user.id)}</div></div>
    <button class="btn gold" style="width:100%;" onclick="goToSetPin()">Continue</button>
  `;
}
function goToSetPin(){
  const card = document.getElementById('authCard');
  card.innerHTML = `
    <div class="amark">🔐</div>
    <h2>Set a quick unlock PIN</h2>
    <p class="sub">Used only to unlock the app fast if it locks itself from inactivity — your password still protects full login.</p>
    <div class="form-row"><label>4-digit PIN</label><input type="password" maxlength="4" inputmode="numeric" id="setupPin" placeholder="e.g. 2468"></div>
    <div class="form-row"><label>Confirm PIN</label><input type="password" maxlength="4" inputmode="numeric" id="setupPin2" placeholder="Re-enter PIN"></div>
    <div class="errtext" id="authErr"></div>
    <button class="btn gold" style="width:100%;" onclick="submitSetPin()">Finish setup</button>
  `;
}
async function submitSetPin(){
  const p1 = document.getElementById('setupPin').value, p2 = document.getElementById('setupPin2').value;
  const err = document.getElementById('authErr');
  if(!/^\d{4}$/.test(p1)){ err.textContent = 'PIN should be exactly 4 digits.'; return; }
  if(p1!==p2){ err.textContent = 'PINs do not match.'; return; }
  const salt = randomSaltHex();
  currentUser.pinSalt = salt;
  currentUser.pinHash = await hashSecret(p1, salt);
  delete currentUser.pin; // legacy plaintext field, if present from an older session
  const idx = users.findIndex(u=>u.id===currentUser.id); users[idx] = currentUser; persistUsers();
  enterApp();
}
async function submitRegisterAdmin(){
  const name = document.getElementById('aName').value.trim();
  const pass = document.getElementById('aPass').value;
  const pass2 = document.getElementById('aPass2').value;
  const key = document.getElementById('aKey').value;
  const err = document.getElementById('authErr');
  if(!name || !pass){ err.textContent = 'Please fill in your name and a password.'; return; }
  if(pass.length<4){ err.textContent = 'Password should be at least 4 characters.'; return; }
  if(pass!==pass2){ err.textContent = 'Passwords do not match.'; return; }
  if(key!==ADMIN_SETUP_KEY){ err.textContent = 'Incorrect setup key — ask the business owner for this.'; return; }
  const salt = randomSaltHex();
  const user = { id: nextUserId('admin'), name, role:'admin', passSalt: salt, passHash: await hashSecret(pass, salt), pinHash:null, pinSalt:null, active:true };
  users.push(user); persistUsers(); currentUser = user;
  logActivity('Registered a new Admin account');
  showIdConfirm(user);
}
async function submitRegisterStaff(){
  const name = document.getElementById('sName').value.trim();
  const pass = document.getElementById('sPass').value;
  const pass2 = document.getElementById('sPass2').value;
  const err = document.getElementById('authErr');
  if(!name || !pass){ err.textContent = 'Please fill in your name and a password.'; return; }
  if(pass.length<4){ err.textContent = 'Password should be at least 4 characters.'; return; }
  if(pass!==pass2){ err.textContent = 'Passwords do not match.'; return; }
  const salt = randomSaltHex();
  const user = { id: nextUserId('staff'), name, role:'staff', passSalt: salt, passHash: await hashSecret(pass, salt), pinHash:null, pinSalt:null, active:true };
  users.push(user); persistUsers(); currentUser = user;
  logActivity('Registered a new Staff account');
  showIdConfirm(user);
}
/* ---- Login lockout: 5 wrong attempts per ID locks that ID out for 5 minutes.
   Stored in localStorage so it survives a page refresh (can't just be beaten by reloading). */
const LOGIN_MAX_ATTEMPTS = 5, LOGIN_LOCK_MS = 5*60*1000;
function getLoginAttempts(){ return JSON.parse(localStorage.getItem('ch_login_attempts')||'{}'); }
function setLoginAttempts(obj){ localStorage.setItem('ch_login_attempts', JSON.stringify(obj)); }
async function submitLogin(){
  const id = document.getElementById('lId').value.trim().toUpperCase();
  const pass = document.getElementById('lPass').value;
  const err = document.getElementById('authErr');
  const attempts = getLoginAttempts();
  const rec = attempts[id];
  if(rec && rec.lockedUntil && rec.lockedUntil>Date.now()){
    const mins = Math.ceil((rec.lockedUntil-Date.now())/60000);
    err.textContent = `Too many wrong attempts. Try again in about ${mins} minute${mins===1?'':'s'}.`;
    return;
  }
  const user = users.find(u=>u.id===id);
  const ok = user && user.passHash===await hashSecret(pass, user.passSalt);
  if(!ok){
    const count = (rec && !rec.lockedUntil ? rec.count : 0) + 1;
    if(count>=LOGIN_MAX_ATTEMPTS){ attempts[id] = { count:0, lockedUntil: Date.now()+LOGIN_LOCK_MS }; err.textContent = `Too many wrong attempts. Locked for 5 minutes.`; }
    else{ attempts[id] = { count, lockedUntil:null }; err.textContent = `ID or password not recognized. (${LOGIN_MAX_ATTEMPTS-count} attempt${LOGIN_MAX_ATTEMPTS-count===1?'':'s'} left before a lockout)`; }
    setLoginAttempts(attempts);
    return;
  }
  delete attempts[id]; setLoginAttempts(attempts);
  if(user.active===false){ err.textContent = 'This account has been deactivated. Contact your admin.'; return; }
  currentUser = user;
  logActivity('Logged in');
  if(!user.pinHash) goToSetPin(); else enterApp();
}
function enterApp(){
  sessionStorage.setItem('ch_current', JSON.stringify(currentUser));
  document.getElementById('authGate').style.display = 'none';
  document.getElementById('whoName').textContent = currentUser.name;
  document.getElementById('whoId').textContent = currentUser.id;
  const rb = document.getElementById('whoRole'); rb.textContent = currentUser.role; rb.className = 'rolebadge ' + currentUser.role;
  applyRoleLocks(); applyI18n(); renderAll(); resetLockTimer();
}
function logout(){
  logActivity('Logged out'); currentUser = null; sessionStorage.removeItem('ch_current');
  clearTimeout(lockTimer);
  document.getElementById('authGate').style.display = 'flex';
  renderAuthGate('login');
}

/* ---- Auto-lock ---- */
['mousemove','keydown','click','touchstart'].forEach(ev=>document.addEventListener(ev, ()=>{ if(currentUser) resetLockTimer(); }));
function resetLockTimer(){
  clearTimeout(lockTimer);
  const secs = settings.lockTimeout;
  if(!secs) return;
  lockTimer = setTimeout(showLockScreen, secs*1000);
}
function showLockScreen(){
  if(!currentUser) return;
  enteredPin = ''; pinLockedUntil = 0;
  document.getElementById('lockWho').textContent = `${currentUser.name} (${currentUser.id}) — enter your PIN`;
  document.getElementById('lockGate').style.display = 'flex';
  renderPinDots(); renderNumpad();
}
function renderPinDots(){
  document.getElementById('pinDots').innerHTML = [0,1,2,3].map(i=>`<div class="dot ${i<enteredPin.length?'filled':''}"></div>`).join('');
}
function renderNumpad(){
  const keys = ['1','2','3','4','5','6','7','8','9','⌫','0','✓'];
  document.getElementById('numpad').innerHTML = keys.map(k=>`<button onclick="pinKey('${k}')" ${pinLockedUntil>Date.now()?'disabled':''}>${k}</button>`).join('');
}
/* ---- PIN lockout: 5 wrong PINs locks the unlock pad for 30s (a stolen/borrowed
   device can't be brute-forced against a 4-digit PIN indefinitely). Falls back to
   full password login via "Not you? Log out" at any time. */
let pinFailCount = 0, pinLockedUntil = 0;
async function pinKey(k){
  const err = document.getElementById('lockErr');
  if(pinLockedUntil>Date.now()) return;
  if(k==='⌫'){ enteredPin = enteredPin.slice(0,-1); err.textContent=''; renderPinDots(); return; }
  if(k==='✓'){ await checkPin(err); return; }
  if(enteredPin.length<4){ enteredPin += k; renderPinDots(); err.textContent=''; }
  if(enteredPin.length===4){ await checkPin(err); }
}
async function checkPin(err){
  const hash = await hashSecret(enteredPin, currentUser.pinSalt);
  if(hash===currentUser.pinHash){ document.getElementById('lockGate').style.display='none'; pinFailCount=0; resetLockTimer(); return; }
  pinFailCount++;
  enteredPin='';
  if(pinFailCount>=5){
    pinLockedUntil = Date.now()+30000;
    err.textContent = 'Too many wrong PINs. Locked for 30 seconds — or log out and use your password.';
    renderNumpad();
    setTimeout(()=>{ pinFailCount=0; pinLockedUntil=0; err.textContent=''; renderNumpad(); }, 30000);
  } else {
    err.textContent = `Incorrect PIN. (${5-pinFailCount} left before a short lockout)`;
  }
  renderPinDots();
}

/* ================= Tabs, bottom nav, role locks ================= */
document.getElementById('tabs').addEventListener('click', e=>{ const btn=e.target.closest('button'); if(!btn||btn.dataset.locked==='1') return; switchView(btn.dataset.view); });
function switchView(name){
  document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.toggle('active', b.dataset.view===name));
  document.querySelectorAll('#bottomNav button').forEach(b=>b.classList.toggle('active', b.dataset.view===name));
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+name).classList.add('active');
  renderAll();
}
function openMore(){ document.getElementById('moreSheet').classList.add('active'); }
function closeMore(){ document.getElementById('moreSheet').classList.remove('active'); }
function fromMore(view){ closeMore(); if(document.getElementById('more'+view.charAt(0).toUpperCase()+view.slice(1)).dataset.locked==='1') return; switchView(view); }

function role(){ return currentUser ? currentUser.role : 'staff'; }
function applyRoleLocks(){
  const isStaff = role()==='staff';
  ['tabReports','tabActivity','tabCloseday','tabSettings'].forEach(id=>document.getElementById(id).dataset.locked = isStaff?'1':'0');
  ['moreReports','moreActivity','moreCloseday','moreSettings'].forEach(id=>document.getElementById(id).dataset.locked = isStaff?'1':'0');
  document.getElementById('reportsLocked').style.display = isStaff?'block':'none';
  document.getElementById('reportsContent').style.display = isStaff?'none':'block';
  document.getElementById('activityLocked').style.display = isStaff?'block':'none';
  document.getElementById('activityContent').style.display = isStaff?'none':'block';
  document.getElementById('closedayLocked').style.display = isStaff?'block':'none';
  document.getElementById('closedayContent').style.display = isStaff?'none':'block';
  document.getElementById('settingsLocked').style.display = isStaff?'block':'none';
  document.getElementById('settingsContent').style.display = isStaff?'none':'block';
  document.getElementById('costFieldWrap').style.display = isStaff?'none':'block';
  document.getElementById('staffCostNote').style.display = isStaff?'block':'none';
  const activeTab = document.querySelector('nav.tabs button.active').dataset.view;
  if(isStaff && ['reports','activity','closeday','settings'].includes(activeTab)) switchView('dashboard');
}

/* ================= Dashboard ================= */
function renderDashboard(){
  const today = sales.filter(s=>s.date==='Today');
  const todaysTotal = today.reduce((s,x)=>s+x.total,0);
  const lowStock = items.filter(i=>i.stock<=i.reorder);
  const stockValue = items.reduce((s,i)=>s+(i.cost||0)*i.stock,0);
  const qtyByItem = {};
  today.forEach(s=>s.lines.forEach(l=>{ qtyByItem[l.name]=(qtyByItem[l.name]||0)+l.qty; }));
  const topSeller = Object.entries(qtyByItem).sort((a,b)=>b[1]-a[1])[0];
  let cards = `
    <div class="card"><div class="k">${t('cardTodaysSales')}</div><div class="v">${naira(todaysTotal)}</div><div class="foot">${t('cardTransactionsFoot',{n:today.length})}</div></div>
    <div class="card"><div class="k">${t('cardLowStockAlerts')}</div><div class="v ${lowStock.length?'alert':'good'}">${lowStock.length}</div><div class="foot">${t('cardLowStockFoot')}</div></div>
    <div class="card"><div class="k">${t('cardTopSeller')}</div><div class="v" style="font-size:15px;">${topSeller?esc(topSeller[0]):'—'}</div><div class="foot">${topSeller?t('cardSoldFoot',{n:topSeller[1]}):''}</div></div>`;
  cards += role()==='admin'
    ? `<div class="card"><div class="k">${t('cardStockValueCost')}</div><div class="v">${naira(stockValue)}</div><div class="foot">${t('cardAdminOnlyFoot')}</div></div>`
    : `<div class="card"><div class="k">${t('cardStockValue')}</div><div class="v" style="font-size:13px; color:var(--muted);">${t('cardAdminOnly')}</div><div class="foot">${t('cardNotVisibleStaff')}</div></div>`;
  document.getElementById('dashCards').innerHTML = cards;
  document.getElementById('lowStockBody').innerHTML = lowStock.map(i=>`
    <tr><td>${photoCell(i)}</td><td>${esc(i.name)}</td><td>${esc(i.category)}</td><td class="mono">${i.stock} ${esc(i.unit)}</td><td class="mono">${i.reorder}</td><td><span class="pill low">${t('reorderSoonPill')}</span></td></tr>`).join('')
    || `<tr><td colspan="6" style="color:var(--muted);">Nothing needs reordering right now.</td></tr>`;
  const waWrap = document.getElementById('lowStockWaBtn');
  waWrap.innerHTML = (role()==='admin' && lowStock.length) ? `<button class="btn sm sage wabtn" onclick="shareLowStockWa()">💬 ${t('waAdminBtn')}</button>` : '';

  // Expiring soon — only shown at all once at least one item in the catalog has
  // an expiry date set. Most gadget items never will; this panel matters far
  // more for pharmacy/cosmetics/food clients using the same underlying app.
  const withExpiry = items.map(i=>({ i, es: expiryStatus(i.expiry) })).filter(x=>x.es && x.es.days<=30).sort((a,b)=>a.es.days-b.es.days);
  const expPanel = document.getElementById('expiringPanel');
  if(withExpiry.length){
    expPanel.style.display = 'block';
    document.getElementById('expiringBody').innerHTML = withExpiry.map(({i,es})=>`
      <tr><td>${photoCell(i)}</td><td>${esc(i.name)}</td><td>${esc(i.category)}</td><td class="mono">${i.stock} ${esc(i.unit)}</td><td><span class="pill low">${es.label}</span></td></tr>`).join('');
  } else { expPanel.style.display = 'none'; }
}
function photoCell(i){ return i.photo ? `<img class="thumb" src="${esc(i.photo)}">` : `<div class="thumb-ph">📦</div>`; }

/* ================= Inventory ================= */
function populateCategoryFilters(){
  const sel = document.getElementById('invCategory');
  if(sel.options.length===1) CATEGORIES.forEach(c=>{ const o=document.createElement('option'); o.value=c; o.textContent=c; sel.appendChild(o); });
  const newSel = document.getElementById('newCategory');
  if(newSel.options.length===0) CATEGORIES.forEach(c=>{ const o=document.createElement('option'); o.value=c; o.textContent=c; newSel.appendChild(o); });
}
function renderInventory(){
  populateCategoryFilters();
  const q = document.getElementById('invSearch').value.toLowerCase();
  const cat = document.getElementById('invCategory').value;
  const rows = items.filter(i => (!cat || i.category===cat) && (i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q) || (i.barcode||'').includes(q)));
  const isAdmin = role()==='admin';
  document.getElementById('invHead').innerHTML = isAdmin
    ? `<tr><th></th><th>${t('colItem')}</th><th>${t('colCategory')}</th><th>${t('colStock')}</th><th>${t('colCost')}</th><th>${t('colSellPrice')}</th><th>${t('colMargin')}</th><th>${t('colStatus')}</th><th></th></tr>`
    : `<tr><th></th><th>${t('colItem')}</th><th>${t('colCategory')}</th><th>${t('colStock')}</th><th>${t('colSellPrice')}</th><th>${t('colStatus')}</th><th></th></tr>`;
  document.getElementById('invBody').innerHTML = rows.map(i=>{
    const low = i.stock<=i.reorder;
    const expiryInfo = expiryStatus(i.expiry);
    const status = `<span class="pill ${low?'low':'ok'}">${low?t('lowStockPill'):t('inStockPill')}</span>${expiryInfo ? ` <span class="pill ${expiryInfo.pillClass}">${expiryInfo.label}</span>` : ''}`;
    if(editingItemId===i.id) return renderEditRow(i, isAdmin);
    if(restockingItemId===i.id) return renderRestockRow(i);
    const nameCell = `${esc(i.name)}${i.supplier ? `<br><span class="stock" style="color:var(--muted);">${t('supplierLabel')}: ${esc(i.supplier)}</span>` : ''}`;
    const costCell = i.cost==null ? `<span class="pill pending">${t('pendingCost')}</span>` : `<span class="mono">${naira(i.cost)}</span>`;
    const margin = i.cost==null ? '—' : (((i.price-i.cost)/i.price)*100).toFixed(0)+'%';
    // Editing price/cost is Admin-only, by design — staff get a Restock action
    // (adds stock, optional supplier/expiry) instead of the ability to overwrite
    // price, which is one of the fraud-prevention rules this app is built around.
    const actionBtns = isAdmin
      ? `<button class="btn sm ghost" onclick="startEditItem(${i.id})" title="${t('editTitle')}">✎ ${t('editBtn')}</button> <button class="btn sm ghost" onclick="startRestock(${i.id})" title="${t('restockTitle')}">↻ ${t('restockBtn')}</button>`
      : `<button class="btn sm ghost" onclick="startRestock(${i.id})" title="${t('restockTitle')}">↻ ${t('restockBtn')}</button>`;
    return isAdmin
      ? `<tr><td>${photoCell(i)}</td><td>${nameCell}</td><td>${esc(i.category)}</td><td class="mono">${i.stock} ${esc(i.unit)}</td><td>${costCell}</td><td class="mono">${naira(i.price)}</td><td class="mono">${margin}</td><td>${status}</td><td style="white-space:nowrap;">${actionBtns}</td></tr>`
      : `<tr><td>${photoCell(i)}</td><td>${nameCell}</td><td>${esc(i.category)}</td><td class="mono">${i.stock} ${esc(i.unit)}</td><td class="mono">${naira(i.price)}</td><td>${status}</td><td style="white-space:nowrap;">${actionBtns}</td></tr>`;
  }).join('') || `<tr><td colspan="9" style="color:var(--muted);">No items match that search.</td></tr>`;
}

/* ---- Expiry helper: flags items already expired or expiring within 30 days.
   Purely optional per item — most gadgets never set this field, and nothing
   here fires for items with no expiry date. ---- */
function expiryStatus(expiry){
  if(!expiry) return null;
  const days = Math.ceil((new Date(expiry+'T00:00:00') - new Date(new Date().toDateString())) / 86400000);
  if(days<0) return { label:t('expiredPill'), pillClass:'low', days };
  if(days<=30) return { label:t('expiresInDays',{d:days}), pillClass:'low', days };
  return { label:`Exp. ${expiry}`, pillClass:'ok', days };
}

/* ---- Inline edit of price / stock (and, for Admin, cost) — Admin only ---- */
let editingItemId = null;
function startEditItem(id){ editingItemId = id; restockingItemId = null; renderInventory(); }
function cancelEditItem(){ editingItemId = null; renderInventory(); }

/* ---- Restock: the everyday "stock just arrived" action, available to both
   roles. Unlike Edit, this only ever adds to current stock (never overwrites
   it) and never touches selling price — so staff can keep inventory accurate
   without ever getting a way to change what something sells for. ---- */
let restockingItemId = null;
function startRestock(id){ restockingItemId = id; editingItemId = null; renderInventory(); }
function cancelRestock(){ restockingItemId = null; renderInventory(); }
function renderRestockRow(i){
  return `<tr class="editor-row" style="background:#EEF5FB;">
    <td>${photoCell(i)}</td>
    <td><b>${esc(i.name)}</b><br><span class="stock" style="color:var(--muted);">${t('currentlyInStock',{n:i.stock, unit:esc(i.unit)})}</span></td>
    <td>${esc(i.category)}</td>
    <td colspan="${role()==='admin'?4:2}">
      <div class="editfield-row">
        <div class="editfield"><label>${t('qtyReceived')}</label>
          <input type="number" class="mono" id="restockQty" placeholder="0"></div>
        <div class="editfield"><label>${t('supplierOptional')}</label>
          <input type="text" id="restockSupplier" value="${esc(i.supplier||'')}" placeholder="e.g. Alaba Market"></div>
        <div class="editfield"><label>${t('newExpiryOptional')}</label>
          <input type="date" id="restockExpiry" value="${i.expiry||''}"></div>
      </div>
    </td>
    <td colspan="2" class="editrow-actions">
      <button class="btn sm gold" onclick="submitRestock(${i.id})">${t('addStock')}</button>
      <button class="btn sm ghost" onclick="cancelRestock()">${t('cancel')}</button>
    </td>
  </tr>`;
}
function submitRestock(id){
  const item = items.find(x=>x.id===id);
  const qty = Number(document.getElementById('restockQty').value);
  const supplier = document.getElementById('restockSupplier').value.trim();
  const expiry = document.getElementById('restockExpiry').value || null;
  if(!qty || qty<=0){ alert('Enter how many units were received.'); return; }
  item.stock += qty;
  const details = [];
  if(supplier && supplier!==item.supplier){ item.supplier = supplier; details.push(`supplier: ${supplier}`); }
  if(expiry!==item.expiry){ item.expiry = expiry; details.push(`expiry: ${expiry||'cleared'}`); }
  persistItems();
  logActivity(`Restocked "${item.name}" — +${qty} ${item.unit}${details.length ? ' ('+details.join(', ')+')' : ''}`);
  restockingItemId = null;
  renderAll();
}
function renderEditRow(i, isAdmin){
  const costInput = isAdmin
    ? `<td><input type="number" class="mono editcell" id="editCost" value="${i.cost==null?'':i.cost}" placeholder="—"></td>`
    : '';
  const marginTd = isAdmin ? `<td class="mono" style="color:var(--muted);">—</td>` : '';
  return `<tr class="editor-row" style="background:#FBF8ED;">
    <td>${photoCell(i)}</td>
    <td><b>${esc(i.name)}</b></td>
    <td>${esc(i.category)}</td>
    <td><input type="number" class="mono editcell editcell-sm" id="editStock" value="${i.stock}"> ${esc(i.unit)}</td>
    ${costInput}
    <td><input type="number" class="mono editcell" id="editPrice" value="${i.price}"></td>
    ${marginTd}
    <td colspan="2" class="editrow-actions">
      <button class="btn sm gold" onclick="saveEditItem(${i.id})">${t('save')}</button>
      <button class="btn sm ghost" onclick="cancelEditItem()">${t('cancel')}</button>
    </td>
  </tr>`;
}
function saveEditItem(id){
  const item = items.find(x=>x.id===id);
  const newPrice = Number(document.getElementById('editPrice').value);
  const newStock = Number(document.getElementById('editStock').value);
  if(!newPrice || newPrice<=0){ alert('Selling price must be greater than zero.'); return; }
  if(newStock<0){ alert('Stock cannot be negative.'); return; }
  const changes = [];
  if(newPrice!==item.price) changes.push(`price ${naira(item.price)} → ${naira(newPrice)}`);
  if(newStock!==item.stock) changes.push(`stock ${item.stock} → ${newStock}`);
  item.price = newPrice; item.stock = newStock;
  if(role()==='admin'){
    const costEl = document.getElementById('editCost');
    if(costEl){
      const newCost = costEl.value==='' ? null : Number(costEl.value);
      if(newCost!==item.cost) changes.push(`cost ${item.cost==null?'—':naira(item.cost)} → ${newCost==null?'—':naira(newCost)}`);
      item.cost = newCost;
    }
  }
  persistItems();
  if(changes.length) logActivity(`Edited "${item.name}" — ${changes.join(', ')}`);
  editingItemId = null;
  renderAll();
}
function toggleAddBox(){ const box=document.getElementById('addBox'); box.classList.toggle('open'); if(box.classList.contains('open')) applyRoleLocks(); }
let pendingPhoto = null;
/* Product photos are stored as base64 inside localStorage, which has a hard ~5-10MB
   quota shared by the whole app — a handful of full-resolution phone photos fills
   it fast and starts silently failing saves. Downscaling + re-compressing every
   photo to a small JPEG before it's stored keeps dozens of products comfortably
   inside quota. This is a mitigation for the localStorage ceiling, not a fix for
   "no real file storage" — that still needs a real backend (see the roadmap note). */
function compressImage(file, maxDim=480, quality=0.72){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = e=>{
      const img = new Image();
      img.onload = ()=>{
        let { width, height } = img;
        if(width>height && width>maxDim){ height = Math.round(height*maxDim/width); width = maxDim; }
        else if(height>maxDim){ width = Math.round(width*maxDim/height); height = maxDim; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
async function previewPhoto(){
  const f = document.getElementById('newPhoto').files[0]; if(!f) return;
  try{
    pendingPhoto = await compressImage(f);
    const img=document.getElementById('newPhotoPreview'); img.src=pendingPhoto; img.style.display='block'; document.getElementById('newPhotoPlaceholder').style.display='none';
  }catch(e){ alert('Could not read that image — please try a different photo.'); }
}
function submitNewItem(){
  const name = document.getElementById('newName').value.trim();
  const category = document.getElementById('newCategory').value;
  const unit = document.getElementById('newUnit').value.trim() || 'piece';
  const price = Number(document.getElementById('newPrice').value);
  const stock = Number(document.getElementById('newStock').value) || 0;
  const reorder = Number(document.getElementById('newReorder').value) || 5;
  const cost = role()==='admin' ? Number(document.getElementById('newCost').value) : null;
  const supplier = document.getElementById('newSupplier').value.trim();
  const expiry = document.getElementById('newExpiry').value || null;
  if(!name || !price){ alert('Please add at least a product name and selling price.'); return; }
  const id = Math.max(0,...items.map(i=>i.id)) + 1;
  items.push({ id, name, category: category||CATEGORIES[0], unit, cost:(cost||cost===0)?cost:null, price, stock, reorder, photo: pendingPhoto, barcode: '600900'+String(1000000+id), supplier: supplier||null, expiry });
  if (pendingPhoto) PhotoSync.queuePhoto(id, pendingPhoto);
  persistItems();
  logActivity(`Added new product "${name}"${supplier?` (supplier: ${supplier})`:''}`);
  pendingPhoto = null;
  ['newName','newUnit','newPrice','newStock','newReorder','newCost','newSupplier','newExpiry'].forEach(id2=>document.getElementById(id2).value='');
  document.getElementById('newPhotoPreview').style.display='none'; document.getElementById('newPhotoPlaceholder').style.display='flex';
  toggleAddBox(); renderAll();
}

/* ================= Register Sale ================= */
function renderSaleSearch(){
  const q = document.getElementById('saleSearch').value.toLowerCase();
  const results = q.length===0 ? [] : items.filter(i=>i.name.toLowerCase().includes(q) || (i.barcode||'').includes(q)).slice(0,6);
  document.getElementById('saleSearchResults').innerHTML = results.map(i=>`
    <div class="add-row"><div class="left">${photoCell(i)}<div class="info"><b>${esc(i.name)}</b><br><span class="stock">${i.stock} ${esc(i.unit)} in stock · ${naira(i.price)}</span></div></div>
    <button class="btn sm gold" onclick="addToCart(${i.id})" ${i.stock<1?'disabled':''}>Add</button></div>`).join('')
    || (q ? `<p class="helptext">No matches.</p>` : `<p class="helptext">Start typing to find an item…</p>`);
}
function addToCart(id){
  const item = items.find(i=>i.id===id); const line = cart.find(c=>c.id===id);
  if(line){ if(line.qty<item.stock) line.qty++; } else cart.push({id:item.id, name:item.name, price:item.price, qty:1});
  renderCart();
}
function changeQty(id, delta){
  const line = cart.find(c=>c.id===id); const item = items.find(i=>i.id===id);
  line.qty += delta;
  if(line.qty<=0) cart = cart.filter(c=>c.id!==id); else if(line.qty>item.stock) line.qty = item.stock;
  renderCart();
}
function renderCart(){
  const list = document.getElementById('cartList');
  list.innerHTML = cart.length===0 ? `<p class="helptext">${t('noItemsYet')}</p>` :
    cart.map(c=>`<div class="cart-row"><div>${esc(c.name)}<br><span class="stock">${naira(c.price)} each</span></div>
      <div class="qty"><button onclick="changeQty(${c.id},-1)">–</button><span>${c.qty}</span><button onclick="changeQty(${c.id},1)">+</button></div></div>`).join('');
  const total = cart.reduce((s,c)=>s+c.price*c.qty,0);
  document.getElementById('cartTotal').textContent = naira(total);
  document.getElementById('completeSaleBtn').disabled = cart.length===0;
}
document.getElementById('payMethods').addEventListener('change', e=>{
  document.querySelectorAll('#payMethods label').forEach(l=>l.classList.toggle('checked', l.querySelector('input').checked));
  document.getElementById('creditNameRow').style.display = e.target.value==='Credit' ? 'block' : 'none';
});
let lastSale = null;
function completeSale(){
  const payment = document.querySelector('#payMethods input:checked').value;
  const customer = document.getElementById('creditName').value;
  // Re-check stock at the moment of completion, not just when items were added to
  // the cart — protects against two staff selling the last unit of something from
  // two different sessions on the same device in quick succession.
  for(const c of cart){
    const item = items.find(i=>i.id===c.id);
    if(!item || c.qty>item.stock){ alert(`Not enough stock of "${item?item.name:'an item'}" left to complete this sale. Please adjust the cart.`); renderSaleSearch(); renderCart(); return; }
  }
  const subtotal = cart.reduce((s,c)=>s+c.price*c.qty,0);
  const vatRate = Number(settings.vatRate)||0;
  const vatAmount = Math.round(subtotal*vatRate/100);
  const total = subtotal + vatAmount;
  cart.forEach(c=>{ items.find(i=>i.id===c.id).stock -= c.qty; });
  persistItems();
  const id = 'A-'+saleCounter++;
  const timeStr = new Date().toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit'});
  const record = { id, date:'Today', time: timeStr, staff: `${currentUser.name} (${currentUser.id})`, payment, subtotal, vatRate, vatAmount, total, customer, refunded:false, lines: cart.map(c=>({name:c.name, qty:c.qty, price:c.price})) };
  sales.push(record); persistSales();
  logActivity(`Registered sale ${id} (${naira(total)}, ${payment})`);
  lastSale = record;
  showReceipt(record);
  cart = []; document.getElementById('creditName').value=''; renderCart();
}

/* ================= Receipt ================= */
function showReceipt(sale){
  const stampHtml = sale.refunded ? `<div class="stamp credit">REFUNDED</div>` : sale.payment==='Credit' ? `<div class="stamp credit">ON CREDIT</div>` : `<div class="stamp">PAID</div>`;
  const lines = sale.lines.map(l=>`<div class="rline"><span class="nm">${esc(l.name)}</span><span>${naira(l.qty*l.price)}</span></div><div class="rline qp"><span>${l.qty} × ${naira(l.price)}</span><span></span></div>`).join('');
  const vatRow = sale.vatAmount ? `<div class="rmeta"><span>Subtotal</span><span>${naira(sale.subtotal)}</span></div><div class="rmeta"><span>VAT (${sale.vatRate}%)</span><span>${naira(sale.vatAmount)}</span></div>` : '';
  document.getElementById('receiptContent').innerHTML = `
    ${stampHtml}<div class="rlogo">${esc(settings.name)}</div><div class="raddr">${esc(settings.address)}<br>${esc(settings.phone)}</div><hr>
    <div class="rmeta"><span>Receipt #${esc(sale.id)}</span><span>${esc(sale.time)}</span></div>
    <div class="rmeta"><span>Served by</span><span>${esc(sale.staff)}</span></div>
    ${sale.customer ? `<div class="rmeta"><span>Customer</span><span>${esc(sale.customer)}</span></div>` : ''}
    <hr>${lines}<hr>
    ${vatRow}
    <div class="rtotal"><span>TOTAL</span><span>${naira(sale.total)}</span></div>
    <div class="rmeta" style="margin-top:6px;"><span>Payment</span><span>${esc(sale.payment)}</span></div>
    <div class="rfoot">${esc(settings.footer)}<br><span style="opacity:0.6;">Paper: ${esc(settings.paper)}</span></div>`;
  document.getElementById('receiptOverlay').classList.add('active');
}
function closeReceipt(){ document.getElementById('receiptOverlay').classList.remove('active'); renderAll(); }

/* ---- ESC/POS over Web Bluetooth ----
   Real ESC/POS byte commands (not just CSS print), for shops with a cheap BLE
   thermal printer instead of a USB/driver-based one. This is genuinely best-effort:
   Web Bluetooth only exists in Chrome/Edge, and BLE thermal printers don't share one
   standard profile the way USB ESC/POS printers mostly do — the UUIDs in Settings
   cover the most common generic 58mm printers, but this needs a real test against
   whatever printer the shop actually buys, and a fallback to the plain Print button
   always stays available. */
function buildEscPos(sale){
  const enc = new TextEncoder();
  const chunks = [];
  const push = (...bytes)=>chunks.push(new Uint8Array(bytes));
  const text = (s, extra='')=>chunks.push(enc.encode(s.replace(/[^\x00-\x7F]/g,'') + extra));
  push(0x1B,0x40); // init
  push(0x1B,0x61,0x01); // center
  push(0x1B,0x45,0x01); text(settings.name, '\n'); push(0x1B,0x45,0x00); // bold name
  text(`${settings.address}\n${settings.phone}\n`);
  push(0x1B,0x61,0x00); // left align
  text('--------------------------------\n');
  text(`Receipt #${sale.id}   ${sale.time}\n`);
  text(`Served by: ${sale.staff}\n`);
  if(sale.customer) text(`Customer: ${sale.customer}\n`);
  text('--------------------------------\n');
  sale.lines.forEach(l=>{
    text(`${l.name}\n`);
    text(`  ${l.qty} x ${naira(l.price)}`.padEnd(24) + naira(l.qty*l.price) + '\n');
  });
  text('--------------------------------\n');
  if(sale.vatAmount){ text(`Subtotal: ${naira(sale.subtotal)}\n`); text(`VAT (${sale.vatRate}%): ${naira(sale.vatAmount)}\n`); }
  push(0x1B,0x45,0x01); text(`TOTAL: ${naira(sale.total)}\n`); push(0x1B,0x45,0x00);
  text(`Payment: ${sale.payment}\n`);
  push(0x1B,0x61,0x01); text(`\n${settings.footer}\n\n\n`);
  push(0x1D,0x56,0x01); // partial cut (ignored by printers that can't cut)
  const total = chunks.reduce((n,c)=>n+c.length,0);
  const out = new Uint8Array(total); let off=0;
  chunks.forEach(c=>{ out.set(c, off); off+=c.length; });
  return out;
}
async function printEscPosBluetooth(){
  if(!lastSale){ alert('Complete a sale first.'); return; }
  if(!navigator.bluetooth){ alert("This browser doesn't support Web Bluetooth. Use Chrome or Edge on Android/desktop, or use the regular Print button."); return; }
  try{
    const serviceUuid = (settings.btService||'000018f0-0000-1000-8000-00805f9b34fb').toLowerCase();
    const charUuid = (settings.btChar||'00002af1-0000-1000-8000-00805f9b34fb').toLowerCase();
    const device = await navigator.bluetooth.requestDevice({ filters:[{ services:[serviceUuid] }], optionalServices:[serviceUuid] });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(serviceUuid);
    const characteristic = await service.getCharacteristic(charUuid);
    const data = buildEscPos(lastSale);
    const CHUNK = 20; // conservative BLE write size that works across most devices
    for(let i=0;i<data.length;i+=CHUNK){
      await characteristic.writeValue(data.slice(i, i+CHUNK));
      await new Promise(r=>setTimeout(r, 20));
    }
    logActivity(`Printed receipt ${lastSale.id} via Bluetooth thermal printer`);
  }catch(e){
    alert("Couldn't print to a Bluetooth printer — either none was selected, the printer uses different UUIDs than the ones in Settings, or it doesn't support this profile. The regular Print button still works as a fallback.");
  }
}
if('bluetooth' in navigator){ const b=document.getElementById('btPrintBtn'); if(b) b.style.display='inline-block'; }
function shareReceiptWa(){
  if(!lastSale) return;
  let text = `Receipt ${lastSale.id} — ${settings.name}%0A`;
  lastSale.lines.forEach(l=>{ text += `${l.name} x${l.qty} — ${naira(l.qty*l.price)}%0A`; });
  text += `TOTAL: ${naira(lastSale.total)}%0APayment: ${lastSale.payment}%0A${settings.footer}`;
  window.open(`https://wa.me/?text=${text}`,'_blank');
}
function shareLowStockWa(){
  const lowStock = items.filter(i=>i.stock<=i.reorder);
  let text = `Low stock alert — ${settings.name}%0A`;
  lowStock.forEach(i=>{ text += `${i.name}: ${i.stock} ${i.unit} left (reorder at ${i.reorder})%0A`; });
  window.open(`https://wa.me/${settings.wa||''}?text=${text}`,'_blank');
}

/* ================= Barcode scan ================= */
/* Chrome's native BarcodeDetector isn't available on Safari/iOS at all, so it alone
   would lock a big share of phones out of scanning. ZXing is a pure-JS decoder that
   works in any modern browser off the camera feed — it's loaded from a CDN the first
   time someone scans (small one-time download, then cached by the browser), and we
   fall back to BarcodeDetector, then to plain manual entry, if that load fails (e.g.
   the very first run with no internet yet). */
let zxingLoadPromise = null;
function loadZXing(){
  if(window.ZXing) return Promise.resolve(window.ZXing);
  if(zxingLoadPromise) return zxingLoadPromise;
  zxingLoadPromise = new Promise((resolve, reject)=>{
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js';
    s.onload = ()=> resolve(window.ZXing);
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return zxingLoadPromise;
}
let scanStream = null;
let zxingReader = null;
function openScanner(target){
  scanTarget = target;
  document.getElementById('scanOverlay').classList.add('active');
  const body = document.getElementById('scanBody');
  if(!('mediaDevices' in navigator) || !navigator.mediaDevices.getUserMedia){
    body.innerHTML = `<p>Camera not available in this browser.</p><p class="hint">Just type the barcode into search instead.</p>`;
    return;
  }
  body.innerHTML = `<video id="scanVideo" autoplay playsinline muted></video><p class="hint" id="scanHint">Loading scanner…</p>`;
  loadZXing().then(ZXing=>{
    if(!document.getElementById('scanOverlay').classList.contains('active')) return;
    document.getElementById('scanHint').textContent = 'Point the camera at a barcode…';
    zxingReader = new ZXing.BrowserMultiFormatReader();
    zxingReader.decodeFromVideoDevice(null, 'scanVideo', (result, err)=>{
      if(result) handleScanResult(result.getText());
    }).catch(()=>{ body.innerHTML = `<p>Camera permission was not granted.</p><p class="hint">You can still type the barcode into search.</p>`; });
  }).catch(()=>{
    // No internet for the scanner library (first run offline) — fall back to the
    // browser's own detector where available, otherwise manual entry.
    document.getElementById('scanHint').textContent = 'Point the camera at a barcode…';
    navigator.mediaDevices.getUserMedia({ video:{ facingMode:'environment' } }).then(stream=>{
      scanStream = stream;
      const video = document.getElementById('scanVideo'); video.srcObject = stream;
      if('BarcodeDetector' in window){
        const detector = new BarcodeDetector();
        const loop = async ()=>{
          if(!document.getElementById('scanOverlay').classList.contains('active')) return;
          try{ const codes = await detector.detect(video); if(codes.length){ handleScanResult(codes[0].rawValue); return; } }catch(e){}
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      } else {
        document.getElementById('scanHint').textContent = "Scanner library needs internet the first time it loads, and this browser has no built-in fallback. Type the barcode into search instead.";
      }
    }).catch(()=>{ body.innerHTML = `<p>Camera permission was not granted.</p><p class="hint">You can still type the barcode into search.</p>`; });
  });
}
function handleScanResult(code){
  closeScanner();
  const match = items.find(i=>i.barcode===code);
  if(scanTarget==='sale'){
    if(match){ addToCart(match.id); switchView('sale'); }
    else { document.getElementById('saleSearch').value = code; switchView('sale'); renderSaleSearch(); }
  } else {
    document.getElementById('invSearch').value = match ? match.name : code;
    switchView('inventory'); renderInventory();
  }
}
function closeScanner(){
  document.getElementById('scanOverlay').classList.remove('active');
  if(scanStream){ scanStream.getTracks().forEach(tr=>tr.stop()); scanStream=null; }
  if(zxingReader){ try{ zxingReader.reset(); }catch(e){} zxingReader=null; }
}

/* ================= Reports ================= */
function renderReports(){
  if(role()!=='admin') return;
  const todaySales = sales.filter(s=>s.date==='Today' && !s.refunded);
  const grossProfit = todaySales.reduce((s,sale)=>s + sale.lines.reduce((ls,l)=>{ const item=items.find(i=>i.name===l.name); const cost = item && item.cost!=null ? item.cost : 0; return ls+(l.price-cost)*l.qty; },0),0);
  const revenue = todaySales.reduce((s,sale)=>s+sale.total,0);
  document.getElementById('reportCards').innerHTML = `
    <div class="card"><div class="k">${t('cardRevenueToday')}</div><div class="v">${naira(revenue)}</div></div>
    <div class="card"><div class="k">${t('cardGrossProfitToday')}</div><div class="v good">${naira(grossProfit)}</div></div>
    <div class="card"><div class="k">${t('cardTransactionsToday')}</div><div class="v">${todaySales.length}</div></div>`;
  const qtyByItemToday = {};
  todaySales.forEach(s=>s.lines.forEach(l=>{ qtyByItemToday[l.name]=qtyByItemToday[l.name]||{qty:0,revenue:0}; qtyByItemToday[l.name].qty+=l.qty; qtyByItemToday[l.name].revenue+=l.qty*l.price; }));
  document.getElementById('topSellersBody').innerHTML = Object.entries(qtyByItemToday).sort((a,b)=>b[1].qty-a[1].qty)
    .map(([name,d])=>`<tr><td>${esc(name)}</td><td class="mono">${d.qty}</td><td class="mono">${naira(d.revenue)}</td></tr>`).join('') || `<tr><td colspan="3" style="color:var(--muted);">No sales yet today.</td></tr>`;
  document.getElementById('salesLogBody').innerHTML = sales.slice().reverse().map(s=>`<tr><td class="mono">${esc(s.id)}</td><td>${esc(s.date)} ${esc(s.time)}</td><td>${esc(s.staff)}</td><td>${esc(s.payment)}</td><td class="mono">${naira(s.total)}</td><td>${s.refunded?'<span class="pill low">Refunded</span>':`<button class="btn sm ghost" onclick="refundSale('${s.id}')">Refund</button>`}</td></tr>`).join('');

  // Reorder suggestions — velocity across all seeded days (refunds excluded)
  const nonRefunded = sales.filter(s=>!s.refunded);
  const daysSeen = new Set(nonRefunded.map(s=>s.date));
  const numDays = Math.max(1, daysSeen.size);
  const qtyAllTime = {};
  nonRefunded.forEach(s=>s.lines.forEach(l=>{ qtyAllTime[l.name] = (qtyAllTime[l.name]||0) + l.qty; }));
  const suggestions = Object.entries(qtyAllTime).map(([name,totalQty])=>{
    const item = items.find(i=>i.name===name); if(!item) return null;
    const avgDaily = totalQty/numDays;
    const daysLeft = avgDaily>0 ? Math.floor(item.stock/avgDaily) : null;
    return { name, avgDaily, daysLeft, item };
  }).filter(Boolean).sort((a,b)=>(a.daysLeft??999)-(b.daysLeft??999));
  document.getElementById('reorderBody').innerHTML = suggestions.map(s=>`
    <tr><td>${esc(s.name)}</td><td class="mono">${s.avgDaily.toFixed(1)}/day</td><td class="mono">${s.daysLeft}</td>
    <td>${s.daysLeft<=7 ? `<span class="pill low">${t('reorderSoonPill')}</span>` : `<span class="pill ok">${t('comfortablePill')}</span>`}</td></tr>`).join('')
    || `<tr><td colspan="4" style="color:var(--muted);">Not enough sales history yet.</td></tr>`;
}
/* ---- Refunds: restocks the items, marks the sale, and logs it — kept simple
   (full return workflow with partial-line returns is a good next step, but this
   covers the common "whole sale returned" case at zero extra infrastructure cost). */
function refundSale(id){
  const sale = sales.find(s=>s.id===id);
  if(!sale || sale.refunded) return;
  if(!confirm(`Refund ${sale.id} (${naira(sale.total)}) and return these items to stock?`)) return;
  sale.lines.forEach(l=>{ const item = items.find(i=>i.name===l.name); if(item) item.stock += l.qty; });
  sale.refunded = true;
  persistItems(); persistSales();
  logActivity(`Refunded sale ${sale.id} (${naira(sale.total)}) — items returned to stock`);
  renderAll();
}
function renderActivity(){
  if(role()!=='admin') return;
  document.getElementById('activityBody').innerHTML = activityLog.slice().reverse().map(e=>
    `<tr><td class="mono">${esc(e.time)}</td><td>${esc(e.user)}</td><td><span class="rolebadge ${esc(e.role)}">${esc(e.role)}</span></td><td>${esc(e.action)}</td></tr>`).join('') || `<tr><td colspan="4" style="color:var(--muted);">No activity yet.</td></tr>`;
}

/* ================= Close Day ================= */
function renderCloseDay(){
  if(role()!=='admin') return;
  const today = sales.filter(s=>s.date==='Today' && !s.refunded);
  const total = today.reduce((s,x)=>s+x.total,0);
  const cashTotal = today.filter(s=>s.payment==='Cash').reduce((s,x)=>s+x.total,0);
  const lowStock = items.filter(i=>i.stock<=i.reorder).length;
  document.getElementById('closeCards').innerHTML = `
    <div class="card"><div class="k">${t('cardTotalSalesToday')}</div><div class="v">${naira(total)}</div></div>
    <div class="card"><div class="k">${t('cardCashSalesToday')}</div><div class="v good">${naira(cashTotal)}</div></div>
    <div class="card"><div class="k">${t('cardLowStockItems')}</div><div class="v ${lowStock?'alert':'good'}">${lowStock}</div></div>`;
  document.getElementById('expectedCashNote').textContent = `Expected cash in till from today's Cash sales: ${naira(cashTotal)}`;
  window._expectedCash = cashTotal;
  updateCashDiff();
}
function updateCashDiff(){
  const counted = Number(document.getElementById('countedCash').value)||0;
  const expected = window._expectedCash||0;
  const diff = counted - expected;
  const note = document.getElementById('cashDiffNote');
  if(!document.getElementById('countedCash').value){ note.textContent=''; return; }
  if(diff===0){ note.style.color='var(--sage)'; note.textContent='Matches exactly.'; }
  else if(diff>0){ note.style.color='var(--sage)'; note.textContent=`${naira(diff)} more than expected.`; }
  else{ note.style.color='var(--stamp)'; note.textContent=`${naira(Math.abs(diff))} short — worth checking.`; }
}
function confirmCloseDay(){
  const counted = Number(document.getElementById('countedCash').value)||0;
  const diff = counted - (window._expectedCash||0);
  logActivity(`Closed the day — cash counted ${naira(counted)} (${diff===0?'matched':diff>0?'+'+naira(diff):naira(diff)})`);
  alert('Day closed and logged to the Activity Log.');
}

/* ================= CSV export ================= */
function downloadCSV(filename, rows){
  const csv = rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
}
function exportCSV(type){
  if(type==='items'){
    const rows = [['Name','Category','Unit','Stock','Reorder','Cost','Price']];
    items.forEach(i=>rows.push([i.name,i.category,i.unit,i.stock,i.reorder, role()==='admin'?(i.cost??''):'', i.price]));
    downloadCSV('inventory.csv', rows);
  } else {
    const rows = [['Receipt','Date','Time','Staff','Payment','Total']];
    sales.forEach(s=>rows.push([s.id,s.date,s.time,s.staff,s.payment,s.total]));
    downloadCSV('sales.csv', rows);
  }
  logActivity(`Exported ${type} as CSV`);
}

/* ================= Settings ================= */
function loadSettingsForm(){
  document.getElementById('setName').value = settings.name; document.getElementById('setPhone').value = settings.phone;
  document.getElementById('setAddress').value = settings.address; document.getElementById('setFooter').value = settings.footer;
  document.getElementById('setWa').value = settings.wa||''; document.getElementById('setLockTimeout').value = settings.lockTimeout;
  document.getElementById('setVat').value = settings.vatRate||0;
  document.getElementById('setBtService').value = settings.btService||'';
}
function saveSettings(){
  settings.name = document.getElementById('setName').value; settings.phone = document.getElementById('setPhone').value;
  settings.address = document.getElementById('setAddress').value; settings.footer = document.getElementById('setFooter').value;
  settings.wa = document.getElementById('setWa').value; settings.paper = document.querySelector('#paperGroup input:checked').value;
  settings.lockTimeout = Number(document.getElementById('setLockTimeout').value);
  settings.vatRate = Math.max(0, Number(document.getElementById('setVat').value)||0);
  settings.btService = document.getElementById('setBtService').value.trim() || '000018f0-0000-1000-8000-00805f9b34fb';
  persistSettings(); logActivity('Updated receipt settings'); resetLockTimer();
  alert('Saved — go complete a sale and print a receipt to see it reflected.');
}
document.getElementById('paperGroup').addEventListener('change', e=>{ document.querySelectorAll('#paperGroup label').forEach(l=>l.classList.toggle('checked', l.querySelector('input').checked)); });

/* ================= Init ================= */
function renderAll(){ renderDashboard(); renderInventory(); renderSaleSearch(); renderCart(); renderReports(); renderActivity(); renderCloseDay(); loadSettingsForm(); renderStaffManagement(); }

/* ================= Manage Staff (Admin only) =================
   Two things a real business genuinely needs, both free since they're just
   localStorage writes: resetting a forgotten password (Admin sets a fresh
   temporary one, shown once, staff changes it isn't needed for a demo but
   would be a good next step for the real build), and deactivating an
   account the moment someone leaves — so access doesn't quietly linger. */
function renderStaffManagement(){
  if(role()!=='admin') return;
  const body = document.getElementById('staffMgmtBody');
  if(!body) return;
  body.innerHTML = users.map(u=>{
    const isSelf = currentUser && u.id===currentUser.id;
    const statusPill = u.active===false
      ? `<span class="pill low">${t('inactiveStatus')}</span>`
      : `<span class="pill ok">${t('activeStatus')}</span>`;
    const toggleBtn = isSelf
      ? `<span class="helptext">(you)</span>`
      : u.active===false
        ? `<button class="btn sm ghost" onclick="toggleUserActive('${u.id}')">${t('reactivateBtn')}</button>`
        : `<button class="btn sm ghost" onclick="toggleUserActive('${u.id}')">${t('deactivateBtn')}</button>`;
    return `<tr>
      <td class="mono">${esc(u.id)}</td>
      <td>${esc(u.name)}</td>
      <td><span class="rolebadge ${esc(u.role)}">${esc(u.role)}</span></td>
      <td>${statusPill}</td>
      <td style="white-space:nowrap;"><button class="btn sm ghost" onclick="resetUserPassword('${u.id}')">${t('resetPasswordBtn')}</button> ${toggleBtn}</td>
    </tr>`;
  }).join('') || `<tr><td colspan="5" style="color:var(--muted);">No accounts registered yet.</td></tr>`;
}
async function resetUserPassword(id){
  const user = users.find(u=>u.id===id);
  if(!user) return;
  if(!confirm(`Reset the password for ${user.name} (${user.id})? A new temporary password will be generated.`)) return;
  const tempPass = randomTempPassword();
  const salt = randomSaltHex();
  user.passSalt = salt;
  user.passHash = await hashSecret(tempPass, salt);
  persistUsers();
  logActivity(`Reset password for ${user.name} (${user.id})`);
  alert(`New temporary password for ${user.name} (${user.id}):\n\n${tempPass}\n\nShare this with them directly — it won't be shown again.`);
}
function toggleUserActive(id){
  const user = users.find(u=>u.id===id);
  if(!user) return;
  if(currentUser && user.id===currentUser.id){ alert("You can't deactivate your own account."); return; }
  const goingInactive = user.active!==false;
  if(!confirm(`${goingInactive ? 'Deactivate' : 'Reactivate'} ${user.name} (${user.id})?${goingInactive ? ' They will no longer be able to log in.' : ''}`)) return;
  user.active = !goingInactive;
  persistUsers();
  logActivity(`${goingInactive ? 'Deactivated' : 'Reactivated'} account ${user.name} (${user.id})`);
  renderStaffManagement();
}
function randomTempPassword(){
  // Avoids visually ambiguous characters (0/O, 1/l/I) since this gets read
  // aloud or typed from a screen, not copy-pasted.
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  const arr = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(arr).map(b=>chars[b % chars.length]).join('');
}
applyI18n();
if(currentUser){
  document.getElementById('authGate').style.display = 'none';
  document.getElementById('whoName').textContent = currentUser.name; document.getElementById('whoId').textContent = currentUser.id;
  const rb = document.getElementById('whoRole'); rb.textContent = currentUser.role; rb.className = 'rolebadge ' + currentUser.role;
  applyRoleLocks(); renderAll(); resetLockTimer();
} else { renderAuthGate(); }

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{ navigator.serviceWorker.register('service-worker.js').catch(()=>{}); });
}
