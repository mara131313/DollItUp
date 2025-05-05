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

    document.getElementById("inp-material").addEventListener("change", function(e) {
        if (e.target.value === "") {
            for (let opt of e.target.options) {
                opt.selected = false;
            }
        } else {
            e.target.querySelector('option[value=""]').selected = false;
        }
    });    
}
