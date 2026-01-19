document.addEventListener("DOMContentLoaded", () => {
  // semua kode kalender di sini
// === KALENDER HARI INI ===
const today = new Date();

// MASEHI
const masehi = today.toLocaleDateString("id-ID", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

// HIJRIAH
const hijriah = today.toLocaleDateString(
  "id-ID-u-ca-islamic",
  {
    day: "numeric",
    month: "long",
    year: "numeric"
  }
);

// JEPANG (WAREKI)
const jepang = today.toLocaleDateString(
  "ja-JP-u-ca-japanese",
  { year: "numeric" }
);

// TAMPILKAN KE HTML
document.getElementById("masehi").innerText = masehi;
document.getElementById("hijriah").innerText = hijriah;
document.getElementById("jepang").innerText = jepang;

});

