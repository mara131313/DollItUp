window.onload = function(){
    btn = document.getElementById("filtrare");
    btn.onclick=function(){
        let inpNume = document.getElementById("inp-nume").value.trim().toLowerCase()
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

        let inpPret = document.getElementById("inp-pret").value
        let inpCategorie = document.getElementById("inp-categorie").value.trim().toLowerCase()
        let produse = document.getElementsByClassName("produs")
        for(let prod of produse){
            prod.style.display = "none"
            let nume = prod.getElementsByClassName("val-nume")[0].innerHTML.trim().toLowerCase()
            let cond1 = nume.startsWith(inpNume)
            let dimensiune = parseInt(prod.getElementsByClassName("val-dimensiune")[0].innerHTML.trim())
            let cond2 = (inpDimensiune == "toate" || (minDimensiune <= dimensiune && dimensiune < maxDimensiune) )
            let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML.trim())
            let cond3 =  (inpPret <= pret)
            let categorie = prod.getElementsByClassName("val-categorie")[0].innerHTML.trim().toLowerCase()
            let cond4 = (inpCategorie == "toate" || inpCategorie == categorie)

            if(cond1 && cond2 && cond3 && cond4) {
                prod.style.display = "block";
            }
        }
    }

}
