document.addEventListener("DOMContentLoaded", function () {

  console.log("JS jalan");

  const today = new Date();
  
 // ⬇️⬇️⬇️ TEMPATKAN DI SINI ⬇️⬇️⬇️
  let userLat = -6.2;   // default Jakarta
  let userLon = 106.8;
  const cities = {
 // Jawa Barat
  jakarta:    { lat: -6.2,  lon: 106.8 },
  bekasi:     { lat: -6.24, lon: 106.99 },
  bandung:    { lat: -6.91, lon: 107.61 },
  cirebon:    { lat: -6.73, lon: 108.55 },
  bogor:      { lat: -6.60, lon: 106.80 },
  depok:      { lat: -6.40, lon: 106.82 },
  sukabumi:   { lat: -6.92, lon: 106.93 },
  tasikmalaya:{ lat: -7.33, lon: 108.22 },

  // Jawa Tengah
  semarang:   { lat: -6.97, lon: 110.42 },
  solo:       { lat: -7.57, lon: 110.83 },
  magelang:   { lat: -7.48, lon: 110.22 },
  tegal:      { lat: -6.87, lon: 109.14 },
  pekalongan: { lat: -6.89, lon: 109.67 },

  // DIY
  yogyakarta: { lat: -7.80, lon: 110.37 },

  // Jawa Timur
  surabaya:   { lat: -7.25, lon: 112.75 },
  malang:     { lat: -7.98, lon: 112.63 },
  kediri:     { lat: -7.82, lon: 112.01 },
  jember:     { lat: -8.17, lon: 113.70 },
  banyuwangi: { lat: -8.22, lon: 114.37 },

  // Sumatra
  medan:      { lat:  3.59, lon: 98.67 },
  palembang:  { lat: -2.99, lon: 104.76 },
  padang:     { lat: -0.95, lon: 100.35 },
  pekanbaru:  { lat:  0.51, lon: 101.45 },
  bandar_lampung:{ lat: -5.45, lon: 105.26 },

  // Kalimantan
  pontianak:  { lat: -0.02, lon: 109.34 },
  banjarmasin:{ lat: -3.32, lon: 114.59 },
  samarinda:  { lat: -0.50, lon: 117.15 },
  balikpapan: { lat: -1.27, lon: 116.83 },

  // Sulawesi
  makassar:   { lat: -5.15, lon: 119.43 },
  manado:     { lat:  1.49, lon: 124.84 },
  palu:       { lat: -0.90, lon: 119.87 },

  // Bali & Nusa Tenggara
  denpasar:   { lat: -8.65, lon: 115.22 },
  mataram:    { lat: -8.58, lon: 116.10 },

  // Papua
  jayapura:   { lat: -2.54, lon: 140.71 }
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
 async function getJadwalShalat(date) {
  const timestamp = Math.floor(date.getTime() / 1000);

  const url =
    `https://api.aladhan.com/v1/timings/${timestamp}` +
    `?latitude=${userLat}&longitude=${userLon}&method=11`;

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
// === KALENDER HARI INI ===
const masehiEl = document.getElementById("masehi");
if (masehiEl) {
  masehiEl.textContent = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

const hijriahEl = document.getElementById("hijriah");
if (hijriahEl) {
  hijriahEl.textContent = getHijri(today);
}

const jepangEl = document.getElementById("jepang");
if (jepangEl) {
  jepangEl.textContent = today.toLocaleDateString(
    "ja-JP-u-ca-japanese",
    { year: "numeric" }
  );
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

  const selectCity = document.getElementById("selectCity");

if (selectCity) {
  // load kota terakhir
  const savedCity = localStorage.getItem("city");
  if (savedCity && cities[savedCity]) {
    selectCity.value = savedCity;
    userLat = cities[savedCity].lat;
    userLon = cities[savedCity].lon;
  }

  selectCity.addEventListener("change", () => {
    const city = selectCity.value;

    if (cities[city]) {
      userLat = cities[city].lat;
      userLon = cities[city].lon;

      localStorage.setItem("city", city);
      console.log("Kota dipilih:", city);
    }
  });
}

  /* =========================
     TUTUP POPUP
     ========================= */
  document.getElementById("closePopup").onclick = () => {
    document.getElementById("popupTanggal").classList.add("hidden");
  };

});
