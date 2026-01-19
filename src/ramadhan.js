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
