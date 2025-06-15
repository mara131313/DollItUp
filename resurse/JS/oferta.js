const fs = require("fs");
const path = require("path");
const { client } = require("../../index");

const caleOferte = path.join(__dirname, "..", "JSON", "oferte.json");
const INTERVAL_MS = 2 * 60 * 1000;

function citesteCategorii() {
    return new Promise((resolve, reject) => {
        client.query("select * from unnest(enum_range(null::categ_papusi))", (err, rez) => {
            if (err) reject(err);
            else resolve(rez.rows.map(r => Object.values(r)[0]));
        });
    });
}

function citesteOferte() {
    if (!fs.existsSync(caleOferte)) {
        return { oferte: [] };
    }
    return JSON.parse(fs.readFileSync(caleOferte));
}

function scrieOferte(oferte) {
    fs.writeFileSync(caleOferte, JSON.stringify(oferte, null, 2));
}

async function genereazaOfertaNoua() {
    try {
        const categorii = await citesteCategorii();
        if (!categorii.length) return;

        const oferteJSON = citesteOferte();

        const reduceri = [5,10,15,20,25,30,35,40,45,50];

        let categorieNoua;
        do {
            categorieNoua = categorii[Math.floor(Math.random() * categorii.length)];
        } while (
            oferteJSON.oferte.length > 0 &&
            oferteJSON.oferte[0].categorie === categorieNoua
        );

        const reducereAleasa = reduceri[Math.floor(Math.random() * reduceri.length)];

        const acum = new Date();
        const dataFinal = new Date(acum.getTime() + INTERVAL_MS);

        const ofertaNoua = {
            categorie: categorieNoua,
            "data-incepere": acum.toISOString(),
            "data-finalizare": dataFinal.toISOString(),
            reducere: reducereAleasa
        };

        oferteJSON.oferte.unshift(ofertaNoua);

        if (oferteJSON.oferte.length > 10) {
            oferteJSON.oferte = oferteJSON.oferte.slice(0, 10);
        }

        scrieOferte(oferteJSON);

        console.log("Ofertă nouă generată:", ofertaNoua);

    } catch (e) {
        console.error("Eroare la generarea ofertei:", e);
    }
}

setTimeout(genereazaOfertaNoua, 500);
setInterval(genereazaOfertaNoua, INTERVAL_MS);