document.addEventListener("DOMContentLoaded", function () {

  console.log("JS jalan");

  const today = new Date();
  let userLat = -6.2;
  let userLon = 106.8;

  /* =========================
     HIJRIAH
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

  /* =========================
     KALENDER HARI INI
     ========================= */
  document.getElementById("masehi").textContent =
    formatMasehi(today);

  document.getElementById("hijriah").textContent =
    getHijri(today);

  document.getElementById("jepang").textContent =
    today.toLocaleDateString("ja-JP-u-ca-japanese", { year: "numeric" });

  document.getElementById("hijri-date").textContent =
    getHijri(today);

  /* =========================
     LOAD SEMUA KOTA OTOMATIS
     ========================= */
  async function loadAllCities() {
    const selectCity = document.getElementById("selectCity");
    if (!selectCity) return;

    try {
      const res = await fetch(
        "https://api.aladhan.com/v1/cities?country=Indonesia"
      );
      const data = await res.json();

      selectCity.innerHTML =
        '<option value="">-- Pilih Kota --</option>';

      data.data.forEach(city => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        selectCity.appendChild(opt);
      });

      const saved = localStorage.getItem("cityName");
      if (saved) {
        selectCity.value = saved;
        await setCityCoordinate(saved);
      }

    } catch (e) {
      selectCity.innerHTML =
        '<option value="">❌ Gagal memuat kota</option>';
    }
  }

  async function setCityCoordinate(city) {
    const res = await fetch(
      `https://api.aladhan.com/v1/geocodeByCity?city=${city}&country=Indonesia`
    );
    const data = await res.json();

    userLat = data.data.latitude;
    userLon = data.data.longitude;

    localStorage.setItem("cityName", city);
  }

  document.getElementById("selectCity")
    .addEventListener("change", async (e) => {
      if (e.target.value) {
        await setCityCoordinate(e.target.value);
      }
    });

  loadAllCities();

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

  document.getElementById("closePopup").onclick = () => {
    document.getElementById("popupTanggal").classList.add("hidden");
  };

});
