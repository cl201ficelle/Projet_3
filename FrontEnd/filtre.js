// Récupération section portfolio
const portfolio = document.getElementById("portfolio")
let gallery = document.querySelector(".gallery")
// console.log(portfolio)
// création div pour accueillir les filtres
const divFiltres = document.createElement("div")
// ajout class à ma div
divFiltres.setAttribute("class", "divFiltres");
// on met cette div dans section portfolio, j'utilise insertBefore pour que la div se mette au dessus de gallery
portfolio.insertBefore(divFiltres,gallery)
let activeButton = null

//  obtenir toutes les catégories variable globale
async function getAllCategories (){
    let response = await fetch ("http://localhost:5678/api/categories")
    let allCategories = await response.json()
    // mettre dans local storage 
    localStorage.setItem("mydata2", JSON.stringify(allCategories))  
}


getAllCategories()
let allCategories = JSON.parse(localStorage.getItem("mydata2"))


function buttonFiltreTous(){ 
     // creation bouton Tous car pas dans Api
    let buttonFiltreTous = document.createElement("button")
    // je met dans le bouton le texte qu'il doit contenir
    buttonFiltreTous.innerText = "Tous"
    divFiltres.appendChild(buttonFiltreTous)
    showTous(buttonFiltreTous)
    // ajout event listener pour changer couleur au click
    }

function showTous(buttonFiltreTous){
    buttonFiltreTous.addEventListener("click", () => {
        // s'il y a un bouton actif on enleve le style au bouton précédemment actif
        if (activeButton) {
            removeButtonStyle(activeButton)
        }
        // on applique ce style au bouton maintenant actif
        setButtonStyle(buttonFiltreTous)
        // Mettez à jour le bouton actif
        activeButton = buttonFiltreTous;
    const tousTravaux = allWorks.filter(function(tousTravaux){
    return tousTravaux   
    })
    document.querySelector(".gallery").innerHTML = ""
    genererGallery(tousTravaux)
    console.log(tousTravaux) 
    })}


buttonFiltreTous(buttonFiltreTous)
   

function buttonFiltresAll (){
    // //    boucle for pour récupérer toutes les catégories i
    // // mise en place du compteur : initialisation de i, pour i < longueur catégories, on incrémente i
    for (let i=0; i<allCategories.length; i++){
        // création bouton autant de bouton qu'il y a de catégorie dans la section catégories de l'api
        const buttonFiltre = document.createElement("button") 
        // je donne au bouton le nom des catégories
        buttonFiltre.innerText = allCategories[i].name
        // je mets ces boutons dans la div que je veux
        divFiltres.appendChild(buttonFiltre)
        // console.log(buttonFiltre.textContent)
        showFiltered(buttonFiltre)
    }}

 function showFiltered (buttonFiltre){      
         // j'ajoute les changements de style au moment du click
        buttonFiltre.addEventListener("click", () => {
            // s'il y a un bouton actif on enleve le style au bouton précédemment actif
            if (activeButton) {
                removeButtonStyle(activeButton)
            }
            // on applique ce style au bouton maintenant actif
            setButtonStyle(buttonFiltre)
            // Mettez à jour le bouton actif
            activeButton = buttonFiltre
        const worksByCategory = allWorks.filter(function(allWorks){
        return allWorks.category.name === buttonFiltre.textContent
             
        })
        document.querySelector(".gallery").innerHTML = ""
        genererGallery(worksByCategory)
        // console.log(worksByCategory)
        })
    }


buttonFiltresAll()
// style du bouton actif  
function setButtonStyle(button){
    button.style.backgroundColor = "#1D6154"
    button.style.color = "white" 
}
// style bouton non actif
function removeButtonStyle(button){
    button.style.backgroundColor = "#FFFEF8"
    button.style.color = "black" 
}


// console.table(allCategories)
// console.table(allWorks)



