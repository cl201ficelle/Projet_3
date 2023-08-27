// // import {getAllWorks} from "gallery.js";
// // getAllWorks()
// // let allWorks = JSON.parse(localStorage.getItem("mydata"))

// //  console.log(allWorks.length)



// // Récupération section portfolio
// const portfolio = document.getElementById("portfolio")
// let gallery = document.querySelector(".gallery")
// // console.log(portfolio)
// // création div pour accueillir les filtres
// const divFiltres = document.createElement("div")
// // ajout class à ma div
// divFiltres.setAttribute("class", "divFiltres");
// // on met cette div dans section portfolio, j'utilise insertBefore pour que la div se mette au dessus de gallery
// portfolio.insertBefore(divFiltres,gallery)

// // recuperation categorieID de chaque travaux
// // function getAllWorksCategoryID {
// // const categoryID = allWorks.categoryID
// // console.log(categoryID)}

// //  obtenir toutes les catégories variable globale
// async function getAllCategories (){
//     let response = await fetch ("http://localhost:5678/api/categories")
//     let allCategories = await response.json()
//     // mettre dans local storage 
//     localStorage.setItem("mydata2", JSON.stringify(allCategories))  
// }


// getAllCategories()
// let allCategories = JSON.parse(localStorage.getItem("mydata2"))

// // export/import ne fonctionne pas mais mes données de la fonction getAllWorks sont bien la donc pour l'instant je continue

// function buttonFiltreTous(){ 
//      // creation bouton Tous car pas dans Api
//     let buttonFiltreTous = document.createElement("button")
//     // je met dans le bouton le texte qu'il doit contenir
//     buttonFiltreTous.innerText = "Tous"
//     divFiltres.appendChild(buttonFiltreTous)
//     // ajout event listener pour changer couleur au click
//     buttonFiltreTous.addEventListener("click", () => {
//     //background vert/écriture blanc
//     buttonFiltreTous.style.backgroundColor = "#1D6154"
//     buttonFiltreTous.style.color = "white"
//     const tousTravaux = allWorks.filter(function(tousTravaux){
//       return tousTravaux
       
//     })
//     document.querySelector(".gallery").innerHTML = ""
//     genererGallery(tousTravaux)
//     console.log(tousTravaux) 
//     })}

// buttonFiltreTous()
   

















// function buttonFiltresAll (){
//     // //    boucle for pour récupérer toutes les catégories i
//     // // mise en place du compteur : initialisation de i, pour i < longueur catégories, on incrémente i
//     for (let i=0; i<allCategories.length; i++){
//         // création bouton autant de bouton qu'il y a de catégorie dans la section catégories de l'api
//         const buttonFiltre = document.createElement("button") 
//         // je donne au bouton le nom des catégories
//         buttonFiltre.innerText = allCategories[i].name;
//         // je mets ces boutons dans la div que je veux
//         divFiltres.appendChild(buttonFiltre)
//         console.log(buttonFiltre.textContent)
//          // j'ajoute les changements de style au moment du click
//          buttonFiltre.addEventListener("click", () => {
//         //background vert
//         buttonFiltre.style.backgroundColor = "#1D6154"
//         buttonFiltre.style.color = "white"
//         const worksByCategory = allWorks.filter(function(allWorks){
//         return allWorks.category.name === buttonFiltre.textContent
             
//           })
//         document.querySelector(".gallery").innerHTML = ""
//         genererGallery(worksByCategory)
//         console.log(worksByCategory)
//         })
//     }
// }

// buttonFiltresAll()
    

// console.table(allCategories)
// console.log(allWorks)