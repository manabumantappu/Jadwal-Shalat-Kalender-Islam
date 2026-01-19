export function getHijriDate() {
  const today = new Date();
  const hijri = new Intl.DateTimeFormat('id-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(today);

  document.getElementById('hijri-date').innerText = hijri;
}
