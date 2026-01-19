document.addEventListener("DOMContentLoaded", function () {

  // === KALENDER MASEHI BERJALAN ===
const container = document.getElementById("kalender-masehi");

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const todayDate = now.getDate();

// Header hari
const days = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
days.forEach(d => {
  const el = document.createElement("div");
  el.textContent = d;
  el.className = "header";
  container.appendChild(el);
});

// Hari pertama bulan ini
const firstDay = new Date(year, month, 1).getDay();

// Kosong sebelum tanggal 1
for (let i = 0; i < firstDay; i++) {
  container.appendChild(document.createElement("div"));
}

// Jumlah hari bulan ini
const totalDays = new Date(year, month + 1, 0).getDate();

// Cek Ramadhan
function isRamadhan(date) {
  const hijri = date.toLocaleDateString("id-ID-u-ca-islamic", {
    month: "numeric"
  });
  return hijri === "9"; // bulan ke-9 = Ramadhan
}

// Isi tanggal
for (let d = 1; d <= totalDays; d++) {
  const date = new Date(year, month, d);
  const cell = document.createElement("div");
  cell.textContent = d;

  if (d === todayDate) cell.classList.add("today");
  if (isRamadhan(date)) cell.classList.add("ramadhan");

  container.appendChild(cell);
}

  console.log("JS jalan"); // DEBUG

  const today = new Date();

  const masehi = today.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const hijriah = today.toLocaleDateString(
    "id-ID-u-ca-islamic",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

  const jepang = today.toLocaleDateString(
    "ja-JP-u-ca-japanese",
    { year: "numeric" }
  );

  document.getElementById("masehi").textContent = masehi;
  document.getElementById("hijriah").textContent = hijriah;
  document.getElementById("jepang").textContent = jepang;

});
