document.addEventListener("DOMContentLoaded", function () {

  console.log("JS jalan");

  const today = new Date();

  /* =========================
     KALENDER MASEHI BERJALAN
     ========================= */
  const container = document.getElementById("kalender-masehi");
  if (container) {

    const year = today.getFullYear();
    const month = today.getMonth();
    const todayDate = today.getDate();

    const days = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
    days.forEach(d => {
      const el = document.createElement("div");
      el.textContent = d;
      el.className = "header";
      container.appendChild(el);
    });

    const firstDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDay; i++) {
      container.appendChild(document.createElement("div"));
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
      const date = new Date(year, month, d);
      const cell = document.createElement("div");
      cell.textContent = d;

      if (d === todayDate) cell.classList.add("today");
      if (isRamadhan(date)) cell.classList.add("ramadhan");

      container.appendChild(cell);
    }
  }

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
