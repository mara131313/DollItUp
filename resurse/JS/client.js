function startCountdown(dataFinal) {
    const timerEl = document.getElementById("timer");
    const ofertaSectiune = document.getElementById("sectiune-oferta");

    function updateTimer() {
        const now = new Date();
        const end = new Date(dataFinal);
        const diff = end - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            ofertaSectiune.innerHTML = "<p class='text-danger'><strong>Oferta a expirat.</strong></p>";
            location.reload()
            return;
        }

        const secunde = Math.floor(diff / 1000) % 60;
        const minute = Math.floor(diff / 1000 / 60) % 60;
        const ore = Math.floor(diff / 1000 / 60 / 60);

        timerEl.textContent = `${String(ore).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(secunde).padStart(2, '0')}`;

        // Schimba stilul in ultimele 10 secunde
        if (diff <= 10 * 1000) {
            timerEl.style.color = "red";
            timerEl.style.fontWeight = "bold";
            ofertaSectiune.classList.add("pulse");
        }
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    const dataFinalSpan = document.getElementById("data-finalizare");
    const msFinalizare = parseInt(dataFinalSpan?.dataset.finalizare);
    if (msFinalizare) {
        startCountdown(new Date(msFinalizare));
    }
});