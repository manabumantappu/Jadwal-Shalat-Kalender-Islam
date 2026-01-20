document.addEventListener("DOMContentLoaded", function () {

  console.log("JS jalan");
 
  const today = new Date();
  let userLat = -6.2;
  let userLon = 106.8;

  /* =========================
     HIJRIAH
     ========================= */
function getHijri(date = new Date()) {
  // ambil angka hijriah (AMAN di Android)
  const parts = new Intl.DateTimeFormat(
    "en-US-u-ca-islamic-umalqura",
    {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric"
    }
  ).formatToParts(date);

  let day, month, year, weekday;

  parts.forEach(p => {
    if (p.type === "day") day = p.value;
    if (p.type === "month") month = parseInt(p.value);
    if (p.type === "year") year = p.value;
    if (p.type === "weekday") weekday = p.value;
  });

  // nama bulan hijriah MANUAL (FIX ANDROID)
  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabiul Awal",
    "Rabiul Akhir",
    "Jumadil Awal",
    "Jumadil Akhir",
    "Rajab",
    "Sya’ban",
    "Ramadhan",
    "Syawal",
    "Dzulqa’dah",
    "Dzulhijjah"
  ];

  // terjemahkan hari ke Indonesia
  const hariMap = {
    Sunday: "Minggu",
    Monday: "Senin",
    Tuesday: "Selasa",
    Wednesday: "Rabu",
    Thursday: "Kamis",
    Friday: "Jumat",
    Saturday: "Sabtu"
  };

  return `${hariMap[weekday]}, ${day} ${hijriMonths[month - 1]} ${year} H`;
}

 function isRamadhan(date) {
  const parts = new Intl.DateTimeFormat(
    "en-US-u-ca-islamic-umalqura",
    { month: "numeric" }
  ).formatToParts(date);

  let hijriMonth;

  parts.forEach(p => {
    if (p.type === "month") {
      hijriMonth = parseInt(p.value);
    }
  });

  // Ramadhan = bulan ke-9 Hijriah
  return hijriMonth === 9;
}


  function formatMasehi(date) {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  /* =========================
     KALENDER HARI INI
     ========================= */
  document.getElementById("masehi").textContent = formatMasehi(today);

  document.getElementById("hijriah").textContent = getHijri(today);

  document.getElementById("jepang").textContent = today.toLocaleDateString("ja-JP-u-ca-japanese", { year: "numeric" });

  document.getElementById("hijri-date").textContent = getHijri(today);

  /* =========================
     LOAD SEMUA KOTA OTOMATIS
     ========================= */
  async function loadAllCities() {
    const selectCity = document.getElementById("selectCity");
    if (!selectCity) return;

  try {
    const res = await fetch("./cities.json");
    const cities = await res.json();

    selectCity.innerHTML =
      '<option value="">-- Pilih Kota --</option>';

    cities.forEach(city => {
      const opt = document.createElement("option");
      opt.value = JSON.stringify(city);
      opt.textContent = city.name;
      selectCity.appendChild(opt);
    });

  } catch (e) {
    selectCity.innerHTML =
      '<option value="">❌ Gagal memuat kota</option>';
    console.error("Error load cities:", e);
  }
}
const selectCity = document.getElementById("selectCity");
if (selectCity) {
  selectCity.addEventListener("change", (e) => {
    if (!e.target.value) return;

    const city = JSON.parse(e.target.value);
    userLat = city.lat;
    userLon = city.lon;

    console.log("Kota aktif:", city.name);
  });
}
 loadAllCities(); // ← DIPANGGIL SETELAH FUNGSI ADA
  
      
  /* =========================
     JADWAL SHALAT
     ========================= */
  async function getJadwalShalat(date) {
    const timestamp = Math.floor(date.getTime() / 1000);
    const res = await fetch(
      `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${userLat}&longitude=${userLon}&method=11`
    );
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
     KALENDER MASEHI + POPUP
     ========================= */
  const calendarEl = document.getElementById("kalender-masehi");
  const monthTitle = document.getElementById("monthTitle");
  let currentDate = new Date();

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
if (isRamadhan(cellDate)) {
  cell.classList.add("ramadhan");
}

      if (
  d === today.getDate() &&
  month === today.getMonth() &&
  year === today.getFullYear()
) {
  cell.classList.add("today");
}
      cell.addEventListener("click", async () => {
        document.getElementById("popupDate").textContent =
          formatMasehi(cellDate);
        document.getElementById("popupHijri").textContent =
          "🌙 " + getHijri(cellDate);

        const box = document.getElementById("popupShalat");
        box.innerHTML = "⏳ Memuat...";

        const jadwal = await getJadwalShalat(cellDate);
        box.innerHTML = "";

        for (const s in jadwal) {
          box.innerHTML += `<p>🕌 ${s}: ${jadwal[s]}</p>`;
        }

        document.getElementById("popupTanggal")
          .classList.remove("hidden");
      });

      calendarEl.appendChild(cell);
    }
  }

  renderCalendar(currentDate);
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });
}
 
  
// ===== TEST & PILIH BUNYI ALARM (FINAL) =====
const alarmSelect = document.getElementById("alarmSound");
const alarmAudio  = document.getElementById("alarmAudio");
const testBtn     = document.getElementById("testAlarm");

  let isTestingAlarm = false;
  
// set audio awal (WAJIB)
if (alarmSelect && alarmAudio) {
  alarmAudio.src = `./public/audio/${alarmSelect.value}`;
}

// ganti bunyi
if (alarmSelect && alarmAudio) {
  alarmSelect.addEventListener("change", () => {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    alarmAudio.src = `./public/audio/${alarmSelect.value}`;
    localStorage.setItem("alarmSound", alarmSelect.value);
  });
}

// tombol test (PLAY / STOP)
if (testBtn && alarmAudio) {
  testBtn.addEventListener("click", () => {
    if (!isTestingAlarm) {
      alarmAudio.currentTime = 0;
      alarmAudio.play();
      testBtn.textContent = "⏹️ Stop Tes Alarm";
      isTestingAlarm = true;
    } else {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      testBtn.textContent = "🔊 Tes Bunyi Alarm";
      isTestingAlarm = false;
    }
  });
}
const closeBtn = document.getElementById("closePopup");

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    document.getElementById("popupTanggal").classList.add("hidden");

    if (isTestingAlarm && alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      testBtn.textContent = "🔊 Tes Bunyi Alarm";
      isTestingAlarm = false;
    }
  });
}
const selectSurah = document.getElementById("selectSurah");
const playBtn = document.getElementById("playMurottal");
const stopBtn = document.getElementById("stopMurottal");
const audioMurottal = document.getElementById("audio-murottal");

const autoNext = document.getElementById("autoNext");
const loopSurah = document.getElementById("loopSurah");

if (playBtn && stopBtn && selectSurah && audioMurottal) {

  function playSurahByIndex(index) {
    const options = selectSurah.options;
    if (index < 0 || index >= options.length) return;

    selectSurah.selectedIndex = index;
    const surah = options[index].value;

    audioMurottal.src = `./public/audio/juz30/${surah}.mp3`;
    audioMurottal.currentTime = 0;
    audioMurottal.play();
  }

  // ▶️ PUTAR
  playBtn.addEventListener("click", () => {
    if (!selectSurah.value) {
      alert("Pilih surat terlebih dahulu");
      return;
    }

    audioMurottal.src =
      `./public/audio/juz30/${selectSurah.value}.mp3`;

    audioMurottal.currentTime = 0;
    audioMurottal.play();
  });

  // ⏹ STOP
  stopBtn.addEventListener("click", () => {
    audioMurottal.pause();
    audioMurottal.currentTime = 0;
  });

  // 🎧 SELESAI AUDIO
  audioMurottal.addEventListener("ended", () => {

    // 🔁 LOOP SURAT
    if (loopSurah && loopSurah.checked) {
      audioMurottal.currentTime = 0;
      audioMurottal.play();
      return;
    }

    // ▶️ AUTO NEXT
    if (autoNext && autoNext.checked) {
      const nextIndex = selectSurah.selectedIndex + 1;
      playSurahByIndex(nextIndex);
    }

  });
}


 });
