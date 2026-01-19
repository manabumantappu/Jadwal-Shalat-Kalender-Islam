document.addEventListener("DOMContentLoaded", function () {

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
