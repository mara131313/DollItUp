const imaginiBackground = [
    "/resurse/imagini/background/poza1.jpg",
    "/resurse/imagini/background/poza2.jpg",
    "/resurse/imagini/background/poza3.jpg"
];

let indexCurent = 0;

function schimbaBackground() {
    document.body.style.backgroundImage = `url("${imaginiBackground[indexCurent]}")`;
    indexCurent = (indexCurent + 1) % imaginiBackground.length;
}

function initSchimbareBackground() {
    schimbaBackground();
    setInterval(schimbaBackground, 10000);
}

window.addEventListener("load", initSchimbareBackground);