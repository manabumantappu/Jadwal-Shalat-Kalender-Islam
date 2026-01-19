document.addEventListener("DOMContentLoaded", function () {

  console.log("JS jalan");

  const today = new Date();

  /* =========================
     KALENDER MASEHI BERJALAN
     ========================= */
 /* =========================
   NAVIGASI KALENDER MASEHI
   ========================= */

const calendarEl = document.getElementById("kalender-masehi");
const monthTitle = document.getElementById("monthTitle");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();

function renderCalendar(date) {
  if (!calendarEl) return;

  calendarEl.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  const monthNames = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];

  monthTitle.textContent = `${monthNames[month]} ${year}`;

  const days = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
  days.forEach(d => {
    const el = document.createElement("div");
    el.textContent = d;
    el.className = "header";
    calendarEl.appendChild(el);
  });

  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    calendarEl.appendChild(document.createElement("div"));
  }

  const totalDays = new Date(year, month + 1, 0).getDate();

  function isRamadhan(date) {
    const hijriMonth = date.toLocaleDateString(
      "id-ID-u-ca-islamic",
      { month: "numeric" }
    );
    return hijriMonth === "9";
  }

  for (let d = 1; d <= totalDays; d++) {
    const cellDate = new Date(year, month, d);
    const cell = document.createElement("div");
    cell.textContent = d;

    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    if (isRamadhan(cellDate)) {
      cell.classList.add("ramadhan");
    }

    calendarEl.appendChild(cell);
  }
}

// tombol navigasi
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// render awal
renderCalendar(currentDate);


  /* =========================
     KALENDER HARI INI
     ========================= */
  const masehiEl = document.getElementById("masehi");
  const hijriahEl = document.getElementById("hijriah");
  const jepangEl = document.getElementById("jepang");

  if (masehiEl)
    masehiEl.textContent = today.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  if (hijriahEl)
    hijriahEl.textContent = today.toLocaleDateString(
      "id-ID-u-ca-islamic",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

  if (jepangEl)
    jepangEl.textContent = today.toLocaleDateString(
      "ja-JP-u-ca-japanese",
      { year: "numeric" }
    );

});
