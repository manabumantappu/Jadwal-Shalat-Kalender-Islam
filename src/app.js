import { getShalatTimes } from './shalat.js';
import { getHijriDate } from './hijri.js';
import { checkRamadhan } from './ramadhan.js';


if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/public/service-worker.js');
}


navigator.geolocation.getCurrentPosition(pos => {
const { latitude, longitude } = pos.coords;
document.getElementById('location').innerText = 'Lokasi terdeteksi';


getShalatTimes(latitude, longitude);
getHijriDate();
checkRamadhan();
});
