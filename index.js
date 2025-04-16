const express= require("express");
const path= require("path");
const fs = require("fs");
const sharp = require("sharp");
const sass = require("sass");

app= express();

app.set("view engine", "ejs");

console.log("Folderul proiectului: ", __dirname)
console.log("Calea fisier index.js: ", __filename)
console.log("Folderul curent de lucru: ", process.cwd())

obGlobal = {
    obErori:null,
    obImagini:null,
    folderBackup: path.join(__dirname,"backup")
}

vect_foldere=["temp", "backup", "temp1"]
for (let folder of vect_foldere ){
    let caleFolder=path.join(__dirname,folder)
    if (! fs.existsSync(caleFolder)){
        fs.mkdirSync(caleFolder);
    }
}

function initErori(){
    let continut = fs.readFileSync(path.join(__dirname,"resurse/json/erori.json")).toString("utf-8");
    console.log(continut)
    obGlobal.obErori=JSON.parse(continut)
    console.log(obGlobal.obErori)
    
    obGlobal.obErori.eroare_default.imagine=path.join(obGlobal.obErori.cale_baza, obGlobal.obErori.eroare_default.imagine)
    for (let eroare of obGlobal.obErori.info_erori){
        eroare.imagine=path.join(obGlobal.obErori.cale_baza, eroare.imagine)
    }
    console.log(obGlobal.obErori)
}

initErori()

function afisareEroare(res, identificator, titlu, text, imagine){
    let eroare= obGlobal.obErori.info_erori.find(function(elem){ 
                        return elem.identificator==identificator
                    });
    if(eroare){
        if(eroare.status)
            res.status(identificator)
        var titluCustom=titlu || eroare.titlu;
        var textCustom=text || eroare.text;
        var imagineCustom=imagine || eroare.imagine;
    }
    else{
        var err=obGlobal.obErori.eroare_default
        var titluCustom=titlu || err.titlu;
        var textCustom=text || err.text;
        var imagineCustom=imagine || err.imagine;
    }
    res.render("pagini/eroare", {
        titlu: titluCustom,
        text: textCustom,
        imagine: imagineCustom
    }
)}

app.use("/resurse", express.static(path.join(__dirname, 'resurse')))
app.use("/node_modules", express.static(path.join(__dirname,"node_modules")))

app.use(function(req, res, next) {
    let ip = req.ip;
    res.locals.ip_utilizator = req.ip;
    next();
});

app.get("/favicon.ico", function(req, res){
    res.sendFile(path.join(__dirname, "resurse/imagini/favicon/favicon.ico"))
})

app.get(["/", "/home", "/index"], function(req,res){
    res.render("pagini/index")
})

app.get("/index/a", function(req, res){
    res.render("pagini/sfaturi");
})

app.get("/index/a", function(req, res){
    res.render("pagini/index");
})

app.get("/cerere", function(req, res){
    res.send("<p style='color:magenta;'> Bunaa ZIUA!</p>")
})

app.get("/fisier", function(req, res){
    res.sendfile(path.join(__dirname,"package.json"))
})

app.get("/abc", function(req, res, next){
    res.write("Data curenta: ");
    next();
})


app.get("/abc", function(req, res, next){
    res.write((new Date())+"");
    res.end();
    next();
})

app.get("/abc", function(req, res, next){
    console.log("---------")
})

app.get(/^\/resurse\/[a-zA-Z0-9_\/]*$/, function(req, res, next){
    afisareEroare(res,403);
})

app.get("/*.ejs", function(req, res, next){
    afisareEroare(res,400);
})

app.get("/*", function(req, res, next){
    try{
        res.render("pagini"+req.url,function (err, rezultatRandare){
            if (err){
                if(err.message.startsWith("Failed to lookup view")){
                    afisareEroare(res,404);
                }
                else{
                    afisareEroare(res);
                }
            }
            else{
                console.log(rezultatRandare);
                res.send(rezultatRandare)
            }
        });
    }
    catch(errRandare){
        if(errRandare.message.startsWith("Cannot find module")){
            afisareEroare(res,404);
        }
        else{
            afisareEroare(res);
        }
    }
})

app.listen(8080);
console.log("Serverul a pornit")