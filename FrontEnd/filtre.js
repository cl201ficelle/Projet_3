

// Récupération section portfolio
const portfolio = document.getElementById("portfolio")
// console.log(portfolio)
// création div pour accueillir les filtres
const divFiltres = document.createElement("div")
// ajout class à ma div
divFiltres.setAttribute("class", "divFiltres");
// on met cette div dans section portfolio, j'utilise insertBefore pour que la div se mette au dessus de gallery
portfolio.insertBefore(divFiltres,gallery)

//  obtenir toutes les catégories variable globale
async function getAllCategories (){
    const response = await fetch ("http://localhost:5678/api/categories")
    const allCategories = await response.json()
    console.log(allCategories)
}

getAllCategories()

// obtenir tous les travaux
async function getAllWorks()



promise2 = fetch("http://localhost:5678/api/categories")
// deux then car promise
promise2
.then((response) => {
   
    const promise3 =  response.json();

    promise3.then((categories) => {
        
        // creation bouton Tous car pas dans Api
        let buttonFiltreTous = document.createElement("button")
        // je met dans le bouton le texte qu'il doit contenir
            buttonFiltreTous.innerText = "Tous"
            divFiltres.appendChild(buttonFiltreTous)
            // ajout event listener pour changer couleur au click
            buttonFiltreTous.addEventListener("click", () => {
            //background vert/écriture blanc
            buttonFiltreTous.style.backgroundColor = "#1D6154"
            buttonFiltreTous.style.color = "white"
            
        });
                


            
    //    boucle for pour récupérer toutes les catégories i
    // mise en place du compteur : initialisation de i, pour i < longueur catégories, on incrémente i
        for (let i= 0; i<categories.length; i++){
            // création bouton autant de bouton qu'il y a de catégorie dans la section catégories de l'api
            const buttonFiltre = document.createElement("button")
            // je donne au bouton le nom des catégories
            buttonFiltre.innerText = categories[i].name;
            // je mets ces boutons dans la div que je veux
            divFiltres.appendChild(buttonFiltre)
            // j'ajoute les changements de style au moment du click
            buttonFiltre.addEventListener("click", () => {
                //background vert 
                buttonFiltre.style.backgroundColor = "#1D6154"
                buttonFiltre.style.color = "white"
                 // admettons que j'ai réussi à récupérer les deux fetch categories et allWorks : ajout fonction filtre
            // const elementFiltres = allWorks.filter(function(allWorks, categories){
                // return allWorks.name === categories.name
            // })   
                });

            
             }
              
              

            
    })
        

    });

   