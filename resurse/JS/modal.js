document.querySelectorAll("article.produs .col1").forEach(col1 => {
  col1.addEventListener("click", function (event) {
    event.stopPropagation(); // oprește propagarea clickului la articole, în caz că sunt alte evenimente

    const articol = this.closest("article.produs");

    const nume = articol.querySelector(".val-nume").textContent.trim();
    const pret = articol.querySelector(".val-pret").textContent.trim();
    const dimensiune = articol.querySelector(".val-dimensiune").textContent.trim();
    const stil = articol.querySelector(".val-stil").textContent.trim();
    const material = articol.querySelector(".val-material").textContent.trim();
    const data = articol.querySelector(".val-data_adaugare").textContent.trim();
    const vegan = articol.querySelector(".val-vegan").textContent.trim();
    const categorie = articol.querySelector(".val-categorie").textContent.trim();
    const descriere = articol.querySelector(".val-descriere").textContent.trim();
    const imagine = articol.querySelector("img").src;

    document.getElementById("modal-body").innerHTML = `
      <h2>${nume}</h2>
      <img src="${imagine}" alt="${nume}">
      <p><strong>Preț:</strong> ${pret} lei</p>
      <p><strong>Dimensiune:</strong> ${dimensiune} cm</p>
      <p><strong>Stil:</strong> ${stil}</p>
      <p><strong>Material:</strong> ${material}</p>
      <p><strong>Data adăugării:</strong> ${data}</p>
      <p><strong>Vegan:</strong> ${vegan}</p>
      <p><strong>Categorie:</strong> ${categorie}</p>
      <p><strong>Descriere:</strong> ${descriere}</p>
    `;

    document.getElementById("modal").style.display = "block";
  });
});


document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});

window.addEventListener("click", function (e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
