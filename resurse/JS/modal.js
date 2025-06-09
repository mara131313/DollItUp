// Selectăm toate produsele
document.querySelectorAll("article.produs").forEach(articol => {
  articol.addEventListener("click", function () {
    // Preluăm toate informațiile
    const nume = this.querySelector(".val-nume").textContent.trim();
    const pret = this.querySelector(".val-pret").textContent.trim();
    const dimensiune = this.querySelector(".val-dimensiune").textContent.trim();
    const stil = this.querySelector(".val-stil").textContent.trim();
    const material = this.querySelector(".val-material").textContent.trim();
    const data = this.querySelector(".val-data_adaugare").textContent.trim();
    const vegan = this.querySelector(".val-vegan").textContent.trim();
    const categorie = this.querySelector(".val-categorie").textContent.trim();
    const descriere = this.querySelector(".val-descriere").textContent.trim();
    const imagine = this.querySelector("img").src;

    // Inserăm conținutul în modal
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

    // Afișăm modalul
    document.getElementById("modal").style.display = "block";
  });
});

// Închidere cu butonul „x”
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});

// Închidere dacă se dă click în afara modalului
window.addEventListener("click", function (e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
