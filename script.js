document.addEventListener("DOMContentLoaded", function () {

  console.log("JS jalan");

  const today = new Date();
  
 // ⬇️⬇️⬇️ TEMPATKAN DI SINI ⬇️⬇️⬇️
  let userLat = -6.2;   // default Jakarta
  let userLon = 106.8;
  const cities = {
  jakarta:   { lat: -6.2,  lon: 106.8 },
  bandung:   { lat: -6.91, lon: 107.61 },
  surabaya:  { lat: -7.25, lon: 112.75 },
  semarang:  { lat: -6.97, lon: 110.42 },
  yogyakarta:{ lat: -7.80, lon: 110.37 },
  medan:     { lat:  3.59, lon: 98.67 },
  makassar:  { lat: -5.15, lon: 119.43 }
};

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

async function getJadwalShalat(date) {
  // default: Jakarta
  const lat = -6.2;
  const lon = 106.8;

  const timestamp = Math.floor(date.getTime() / 1000);

  const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=11`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    Subuh: data.data.timings.Fajr,
    Dzuhur: data.data.timings.Dhuhr,
    Ashar: data.data.timings.Asr,
    Maghrib: data.data.timings.Maghrib,
    Isya: data.data.timings.Isha
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

       cell.addEventListener("click", async () => {
  const popup = document.getElementById("popupTanggal");

  document.getElementById("popupDate").textContent =
    formatMasehi(cellDate);

  document.getElementById("popupHijri").textContent =
    "🌙 " + getHijri(cellDate);

  const popupShalat = document.getElementById("popupShalat");
  popupShalat.innerHTML = "<p>⏳ Memuat jadwal shalat...</p>";

  try {
    const jadwal = await getJadwalShalat(cellDate);
    popupShalat.innerHTML = "";

    for (const s in jadwal) {
      popupShalat.innerHTML += `<p>🕌 ${s}: ${jadwal[s]}</p>`;
    }
  } catch (e) {
    popupShalat.innerHTML = "<p>❌ Gagal memuat jadwal shalat</p>";
  }

  popup.classList.remove("hidden");
});

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
