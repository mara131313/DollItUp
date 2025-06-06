window.onload = function(){
    let sliderMin = document.getElementById("inp-pret-min");
    let sliderMax = document.getElementById("inp-pret-max");
    let valMinAfisata = document.getElementById("val-min");
    let valMaxAfisata = document.getElementById("val-max");

    function actualizeazaAfisajPreturi() {
        let min = parseInt(sliderMin.value);
        let max = parseInt(sliderMax.value);
        valMinAfisata.textContent = min;
        valMaxAfisata.textContent = max;
    }
    
    sliderMin.addEventListener("input", actualizeazaAfisajPreturi);
    sliderMax.addEventListener("input", actualizeazaAfisajPreturi);
    actualizeazaAfisajPreturi();

    btn = document.getElementById("filtrare");
    btn.onclick=function(){

        if(!inpValidare()) return;

        let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase();
        let vectRadio = document.getElementsByName("gr_rad")
        let inpDimensiune = null
        let minDimensiune = null
        let maxDimensiune = null
        for(let rad of vectRadio){
            if(rad.checked){
                inpDimensiune = rad.value
                if (inpDimensiune != "toate") {
                    [minDimensiune, maxDimensiune] = inpDimensiune.split(":")
                    minDimensiune = parseInt(minDimensiune)
                    maxDimensiune = parseInt(maxDimensiune)
                }
                break
            }
        }
        let pretMin = parseInt(document.getElementById("inp-pret-min").value);
        let pretMax = parseInt(document.getElementById("inp-pret-max").value);
        if (pretMin > pretMax) [pretMin, pretMax] = [pretMax, pretMin];       
        let inpCategorie = document.getElementById("inp-categorie").value.trim().toLowerCase();
        let inpMaterial = document.getElementById("inp-material");
        let inpStil = document.getElementById("inp-stil").value.trim().toLowerCase();
        let materialeSelectate = Array.from(inpMaterial.selectedOptions).map(opt => opt.value).filter(val => val);
        let inpDescriere = document.getElementById("inp-descriere").value.trim().toLowerCase();
        let produse = document.getElementsByClassName("produs");

        for(let prod of produse){
            prod.style.display = "none";

            let nume = prod.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase();
            let cond1 = inpNume === "" || nume.startsWith(inpNume);

            let dimensiune = parseInt(prod.getElementsByClassName("val-dimensiune")[0].innerHTML.trim())
            let cond2 = (inpDimensiune == null || inpDimensiune == "toate" || (minDimensiune <= dimensiune && dimensiune < maxDimensiune));

            let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim())
            let cond3 =  (pretMin <= pret && pret <= pretMax)
            
            let categorie = prod.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase()
            let cond4 = (inpCategorie == "toate" || inpCategorie == categorie)
            
            let material = prod.getElementsByClassName("val-material")[0].innerHTML.trim().toLowerCase().split(",").map(s => s.trim());
            let cond5 = materialeSelectate.length == 0 || materialeSelectate.some(mat => material.includes(mat));            
            
            let stil = prod.getElementsByClassName("val-stil")[0].innerHTML.trim().toLowerCase();
            let cond6 = inpStil === "" || inpStil === stil;
            
            let vegan = prod.getElementsByClassName("val-vegan")[0].innerHTML.trim().toLowerCase();
            let cond7 = !document.getElementById("vegan-da").checked && !document.getElementById("vegan-nu").checked;
            if (vegan === "da" && document.getElementById("vegan-da").checked) cond7 = true;
            else if (vegan === "nu" && document.getElementById("vegan-nu").checked) cond7 = true;
       
            let descriere = prod.getElementsByClassName("val-descriere")[0].textContent.trim().toLowerCase();
            let cond8 = inpDescriere === "" || descriere.includes(inpDescriere);

            if(cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8) {
                prod.style.display = "block";
            }
        }
    }

    function inpValidare() {
        const textInput = document.querySelector("input[type='text'], textarea");
        const regex = /^[A-Za-zăîâșțĂÎÂȘȚ\s]+$/;
    
        if (textInput && !regex.test(textInput.value.trim()) && textInput.value.trim() !== "") {
            alert("Caractere invalide. Folosește doar litere și spații.");
            return false;
        }
    
        return true; 
    }

    document.getElementById("inp-nume").addEventListener("input", function () {
        const textarea = this;
        const val = textarea.value.trim();
    
        if (val.length < 3) {
            textarea.classList.add("is-invalid");
            textarea.classList.remove("is-valid");
        } else {
            textarea.classList.remove("is-invalid");
            textarea.classList.add("is-valid");
        }
    });    

    document.getElementById("inp-material").addEventListener("change", function(e) {
        if (e.target.value === "") {
            for (let opt of e.target.options) {
                opt.selected = false;
            }
        } else {
            e.target.querySelector('option[value=""]').selected = false;
        }
    });    

    document.getElementById("sortCresc").onclick = function() {
        sorteazaProduse(true);
    }
    document.getElementById("sortDesc").onclick = function() {
        sorteazaProduse(false);
    }

    function sorteazaProduse(ascendent) {
        let container = document.getElementsByClassName("grid-produse")[0];
        let produse = Array.from(container.getElementsByClassName("produs"));
    
        produse.sort((a, b) => {
            let numeA = a.querySelector(".val-nume").textContent.trim().toLowerCase();
            let numeB = b.querySelector(".val-nume").textContent.trim().toLowerCase();
    
            let pretA = parseFloat(a.querySelector(".val-pret").textContent.trim());
            let pretB = parseFloat(b.querySelector(".val-pret").textContent.trim());
    
            let dimA = parseFloat(a.querySelector(".val-dimensiune").textContent.trim());
            let dimB = parseFloat(b.querySelector(".val-dimensiune").textContent.trim());
    
            let raportA = dimA / pretA;
            let raportB = dimB / pretB;
    
            let cmpNume = numeA.localeCompare(numeB);
            if (cmpNume !== 0)
                return ascendent ? cmpNume : -cmpNume;
            
            return ascendent ? (raportA - raportB) : (raportB - raportA);
        });
    
        produse.forEach(p => container.appendChild(p));
    }

    document.getElementById("suma").onclick = function() {
        let selectate = document.querySelectorAll(".select-cos:checked");
        let total = 0;

        selectate.forEach(cb => {
            let produs = cb.closest(".produs");
            if (produs) {
                let pret = parseFloat(produs.querySelector(".val-pret").textContent.trim());
                if (!isNaN(pret)) total += pret;
            }
        });
        
        let div = document.createElement("div");
        div.style.position = "fixed";
        div.style.top = "20px";
        div.style.right = "20px";
        div.style.padding = "10px 15px";
        div.style.backgroundColor = "#d9edf7";
        div.style.border = "2px solid #31708f";
        div.style.color = "#31708f";
        div.style.fontWeight = "bold";
        div.style.borderRadius = "10px";
        div.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        div.style.zIndex = 1000;
        div.textContent = `Suma produselor selectate: ${total.toFixed(2)} lei`;
    
        document.body.appendChild(div);
    
        setTimeout(() => {
            div.remove();
        }, 2000);
    }
    
    document.getElementById("reset").onclick = function() {
        if (confirm("Sigur că vrei să resetezi filtrele?")) {
            document.getElementById("inp-nume").value = "";
            document.getElementById("inp-categorie").value = "toate";
            document.getElementById("inp-stil").value = "";
            document.getElementById("inp-descriere").value = "";
            document.getElementById("vegan-da").checked = false;
            document.getElementById("vegan-nu").checked = false;
            let minPret = document.getElementById("inp-pret-min");
            let maxPret = document.getElementById("inp-pret-max");
            minPret.value = minPret.min;
            maxPret.value = maxPret.max;
            let radio = document.getElementsByName("gr_rad");
            for (let rad of radio) {
                if (rad.value == "toate") {
                    rad.checked = true;
                } else {
                    rad.checked = false;
                }
            }
            let materiale = document.getElementById("inp-material");
            for (let opt of materiale.options) {
                opt.selected = false;
            }

            let produse = document.getElementsByClassName("produs");
            for (let prod of produse) {
                prod.style.display = "block";
            }
    
            document.getElementById("val-min").textContent = minPret.value;
            document.getElementById("val-max").textContent = maxPret.value;
        }
    }  
}
