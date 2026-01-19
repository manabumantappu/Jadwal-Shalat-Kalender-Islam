export function checkRamadhan() {
const isRamadhan = true;
if (isRamadhan) {
const box = document.getElementById('ramadhan');
box.classList.remove('hidden');
box.innerHTML = `
<h2>🌙 Mode Ramadhan</h2>
<p>Imsak: 04:25</p>
<p>Buka Puasa: 18:00</p>
`;
}
}
function scheduleAlarm(time, title, body) {
const alarmTime = new Date(time).getTime();
const now = Date.now();


const timeout = alarmTime - now;
if (timeout <= 0) return;


setTimeout(() => {
navigator.serviceWorker.ready.then(reg => {
reg.showNotification(title, {
body,
icon: '/public/icons/icon-192.png',
vibrate: [200, 100, 200]
});
});
}, timeout);
}


export function initRamadhanAlarm() {
Notification.requestPermission();


const imsak = '04:25';
const today = new Date().toISOString().split('T')[0];


document.getElementById('alarm-sahur').onchange = e => {
if (e.target.checked) {
scheduleAlarm(`${today}T03:55`, '🌙 Sahur', 'Waktunya Sahur');
}
};


document.getElementById('alarm-imsak').onchange = e => {
if (e.target.checked) {
scheduleAlarm(`${today}T${imsak}`, '⏰ Imsak', 'Waktu Imsak telah tiba');
}
};
}
