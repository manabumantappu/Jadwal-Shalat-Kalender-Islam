export function getShalatTimes(lat, lng) {
const times = {
Subuh: '04:35',
Dzuhur: '12:00',
Ashar: '15:20',
Maghrib: '18:00',
Isya: '19:10'
};


const container = document.getElementById('shalat-times');
container.innerHTML = '';


Object.keys(times).forEach(name => {
const div = document.createElement('div');
div.innerHTML = `<strong>${name}</strong>: ${times[name]}`;
container.appendChild(div);
});
}
