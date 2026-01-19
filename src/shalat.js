export function getShalatTimes() {
  const times = {
    Subuh: '04:35',
    Dzuhur: '12:00',
    Ashar: '15:20',
    Maghrib: '18:00',
    Isya: '19:10'
  };

  const box = document.getElementById('shalat-times');
  box.innerHTML = '';

  Object.entries(times).forEach(([name, time]) => {
    box.innerHTML += `
      <div class="bg-white p-3 rounded shadow text-center">
        <div class="font-bold">${name}</div>
        <div class="text-lg">${time}</div>
      </div>
    `;
  });
}
