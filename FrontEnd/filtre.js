

// Récupération section portfolio
const portfolio = document.getElementById("portfolio")
// console.log(portfolio)
// création div pour accueillir les filtres
const divFiltres = document.createElement("div")
// on met cette div dans section portfolio, j'utilise insertBefore pour que la div se mette au dessus de gallery
portfolio.insertBefore(divFiltres,gallery)







// for (i=0; i<filtreCategory.length; i++){
//






promise2 = fetch("http://localhost:5678/api/categories")
// deux then car promise
promise2
.then((response) => {
   
    const promise3 =  response.json();

    promise3.then((categories) => {
        console.log(categories)
        let buttonFiltreTous = document.createElement("button")
            buttonFiltreTous.innerText = "Tous"
            divFiltres.appendChild(buttonFiltreTous)
    //    boucle for pour récupérer toutes les catégories i
    // mise en place du compteur : initialisation de i, pour i < longueur catégories, on incrémente i
        for (let i= 0; i<categories.length; i++){
            const buttonFiltre = document.createElement("button")
            buttonFiltre.innerText = categories[i].name;
            divFiltres.appendChild(buttonFiltre)
            
             }      
                   

            
    })
        

    });