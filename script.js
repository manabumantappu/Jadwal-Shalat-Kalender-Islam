document.addEventListener("DOMContentLoaded", function () {

  console.log("JS jalan");

  const today = new Date();

  /* =========================
     HIJRIAH (UMM AL-QURA)
     ========================= */
  function getHijri(date = new Date(), options = {}) {
    return date.toLocaleDateString(
      "id-ID-u-ca-islamic-umalqura",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        ...options
      }
    );
  }

  function formatMasehi(date) {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function getJadwalShalatDummy() {
    return {
      Subuh: "04:35",
      Dzuhur: "12:05",
      Ashar: "15:25",
      Maghrib: "18:10",
      Isya: "19:20"
    };
  }

  /* =========================
     TAMPIL HIJRIAH ATAS
     ========================= */
  const hijriDateEl = document.getElementById("hijri-date");
  if (hijriDateEl) {
    hijriDateEl.textContent = getHijri(today);
  }
const masehiEl = document.getElementById("masehi");
if (masehiEl) {
  masehiEl.textContent = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

const jepangEl = document.getElementById("jepang");
if (jepangEl) {
  jepangEl.textContent = today.toLocaleDateString(
    "ja-JP-u-ca-japanese",
    { year: "numeric" }
  );
}

  const hijriahEl = document.getElementById("hijriah");
  if (hijriahEl) {
    hijriahEl.textContent = getHijri(today);
  }

  /* =========================
     KALENDER MASEHI
     ========================= */
  const calendarEl = document.getElementById("kalender-masehi");
  const monthTitle = document.getElementById("monthTitle");
  const prevBtn = document.getElementById("prevMonth");
  const nextBtn = document.getElementById("nextMonth");

  let currentDate = new Date();

  function isRamadhan(date) {
    const month = date.toLocaleDateString(
      "id-ID-u-ca-islamic-umalqura",
      { month: "numeric" }
    );
    return month === "9";
  }

  function renderCalendar(date) {
    calendarEl.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    monthTitle.textContent =
      date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendarEl.appendChild(document.createElement("div"));
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

      // 👉 KLIK TANGGAL → POPUP
      cell.addEventListener("click", () => {
        const popup = document.getElementById("popupTanggal");

        document.getElementById("popupDate").textContent =
          formatMasehi(cellDate);

        document.getElementById("popupHijri").textContent =
          "🌙 " + getHijri(cellDate);

        const jadwal = getJadwalShalatDummy();
        const popupShalat = document.getElementById("popupShalat");
        popupShalat.innerHTML = "";

        for (const s in jadwal) {
          popupShalat.innerHTML += `<p>🕌 ${s}: ${jadwal[s]}</p>`;
        }

        popup.classList.remove("hidden");
      });

      calendarEl.appendChild(cell);
    }
  }

  prevBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  };

  nextBtn.onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  };

  renderCalendar(currentDate);

  /* =========================
     TUTUP POPUP
     ========================= */
  document.getElementById("closePopup").onclick = () => {
    document.getElementById("popupTanggal").classList.add("hidden");
  };

});
