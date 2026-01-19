import { getShalatTimes } from './shalat.js';
import { getHijriDate } from './hijri.js';
import { checkRamadhan, initRamadhanAlarm } from './ramadhan.js';

document.addEventListener('DOMContentLoaded', () => {
  getShalatTimes();
  getHijriDate();
  checkRamadhan();
  initRamadhanAlarm();
});

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../public/service-worker.js');
}
