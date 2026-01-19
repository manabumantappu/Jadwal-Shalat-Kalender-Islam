document.addEventListener("DOMContentLoaded", function () {

  console.log("JS jalan");

  const today = new Date();

  /* =========================
     HIJRIAH VERSI INDONESIA
     ========================= */
 function getHijri(date = new Date()) {
  return date.toLocaleDateString(
    "id-ID-u-ca-islamic-umalqura",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );
}
// === TAMPILKAN KALENDER HIJRIYAH (BAGIAN ATAS) ===
const hijriDateEl = document.getElementById("hijri-date");
if (hijriDateEl) {
  hijriDateEl.textContent = getHijri(new Date(), {
    weekday: "long"
  });
}

// tampilkan
document.getElementById("hijriah").innerText =
  "Hijriah : " + getHijri();


  /* =========================
     NAVIGASI KALENDER MASEHI
     ========================= */
  const calendarEl = document.getElementById("kalender-masehi");
  const monthTitle = document.getElementById("monthTitle");
  const prevBtn = document.getElementById("prevMonth");
  const nextBtn = document.getElementById("nextMonth");

  let currentDate = new Date();

  function renderCalendar(date) {
    if (!calendarEl || !monthTitle) return;

    calendarEl.innerHTML = "";

    const ramadhanInfo = document.getElementById("ramadhanInfo");
    if (ramadhanInfo) ramadhanInfo.classList.add("hidden");

    const year = date.getFullYear();
    const month = date.getMonth();

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
         "id-ID-u-ca-islamic-umalqura",
        { month: "numeric" }
      );
      return hijriMonth === "9";
    }

    for (let d = 1; d <= totalDays; d++) {
      const cellDate = new Date(year, month, d);
      const cell = document.createElement("div");
      cell.textContent = d;

      const isToday =
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      if (isToday) {
        cell.classList.add("today");
      }

      if (isRamadhan(cellDate)) {
        cell.classList.add("ramadhan");

        if (isToday && ramadhanInfo) {
          const hijriDay = cellDate.toLocaleDateString(
            "id-ID-u-ca-islamic",
            { day: "numeric" }
          );

          ramadhanInfo.textContent = `🌙 Ramadhan hari ke-${hijriDay}`;
          ramadhanInfo.classList.remove("hidden");
        }
      }

      calendarEl.appendChild(cell);
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });

    nextBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });
  }

  renderCalendar(currentDate);

  /* =========================
     KALENDER HARI INI
     ========================= */
  const masehiEl = document.getElementById("masehi");
  const hijriahEl = document.getElementById("hijriah");
  const jepangEl = document.getElementById("jepang");

  if (masehiEl) {
    masehiEl.textContent = today.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

 function getHijri(date = new Date(), options = {}) {
  return date.toLocaleDateString(
    "id-ID-u-ca-islamic-umalqura",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...options
    }
  );
}

  if (jepangEl) {
    jepangEl.textContent = today.toLocaleDateString(
      "ja-JP-u-ca-japanese",
      { year: "numeric" }
    );
  }

});
