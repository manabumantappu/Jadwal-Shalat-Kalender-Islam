// ================= MODE RAMADHAN =================
export function checkRamadhan() {
  const isRamadhan = true;

  if (isRamadhan) {
    const box = document.getElementById('ramadhan');
    box.classList.remove('hidden');
    box.innerHTML = `
      <h2 class="font-bold text-lg mb-2">🌙 Mode Ramadhan</h2>
      <p>Imsak: 04:25</p>
      <p>Buka Puasa: 18:00</p>
    `;
  }
}

// ================= AUDIO =================
function playSound(type) {
  if (type === 'sahur') {
    document.getElementById('audio-sahur')?.play();
  }
  if (type === 'adzan') {
    document.getElementById('audio-adzan')?.play();
  }
}

// ================= ALARM =================
function scheduleAlarm(time, title, body, soundType) {
  const delay = new Date(time).getTime() - Date.now();
  if (delay <= 0) return;

  setTimeout(() => {
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification(title, {
        body,
        icon: '../public/icons/icon-192.png',
        vibrate: [300, 200, 300]
      });
      playSound(soundType);
    });
  }, delay);
}

export function initRamadhanAlarm() {
  if (!('Notification' in window)) return;

  Notification.requestPermission();

  const today = new Date().toISOString().split('T')[0];
  const imsak = '04:25';

  document.getElementById('alarm-sahur')?.addEventListener('change', e => {
    if (e.target.checked) {
      scheduleAlarm(`${today}T03:55`, '🌙 Sahur', 'Waktunya Sahur', 'sahur');
    }
  });

  document.getElementById('alarm-imsak')?.addEventListener('change', e => {
    if (e.target.checked) {
      scheduleAlarm(`${today}T${imsak}`, '🕌 Imsak', 'Waktu Imsak Telah Tiba', 'adzan');
    }
  });
}
