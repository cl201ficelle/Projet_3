const portfolio = document.getElementById("portfolio")
const gallery = document.querySelector(".gallery")
const divFiltres = document.createElement("div")
divFiltres.setAttribute("class", "divFiltres")
portfolio.insertBefore(divFiltres, gallery)
let activeButton = null
let allCategories = null

initialisation2()

//  obtenir toutes les catégories variable globale
async function getAllCategories() {
    await fetch("http://localhost:5678/api/categories")
      .then(function(response) {
        return response.json()
      })
      .then(function(allCategories) {
        localStorage.setItem("categories", JSON.stringify(allCategories))
      })
      .catch(function(error) {
        console.error("Error fetching and storing data:", error)
      })
    }
    
async function initialisation2()
{
    await getAllCategories()
    allCategories = JSON.parse(localStorage.getItem("categories"))
    buttonFiltreTous()
    buttonFiltresAll(allCategories)
}
// création bouton Tous
function buttonFiltreTous() {
    let buttonFiltreTous = document.createElement("button")
    buttonFiltreTous.innerText = "Tous"
    divFiltres.appendChild(buttonFiltreTous)
    showTous(buttonFiltreTous)
}

// Filtre bouton
function showTous(buttonFiltreTous) {
    buttonFiltreTous.addEventListener("click", () => {
        // s'il y a un bouton actif on enleve le style au bouton précédemment actif
        if (activeButton) {
            removeButtonStyle(activeButton)
        }
        // on applique ce style au bouton maintenant actif
        setButtonStyle(buttonFiltreTous)
        // Mettre à jour le bouton actif
        activeButton = buttonFiltreTous;
        document.querySelector(".gallery").innerHTML = ""
        genererGallery(allWorks)
    })
}

// création autres boutons
function buttonFiltresAll(allCategories) {
    allCategories = JSON.parse(localStorage.getItem("categories"))
    for (let i = 0; i < allCategories.length; i++) {
        const buttonFiltre = document.createElement("button")
        buttonFiltre.innerText = allCategories[i].name
        divFiltres.appendChild(buttonFiltre)
        showFiltered(buttonFiltre)
    }
}

// filtre autres boutons
function showFiltered(buttonFiltre) {
    buttonFiltre.addEventListener("click", () => {
        if (activeButton) {
            removeButtonStyle(activeButton)
        }
        setButtonStyle(buttonFiltre)
        activeButton = buttonFiltre
        const worksByCategory = allWorks.filter(function(allWorks) {
            return allWorks.category.name === buttonFiltre.textContent
        })
        document.querySelector(".gallery").innerHTML = ""
        genererGallery(worksByCategory)
    })
}

// style du bouton actif  
function setButtonStyle(button) {
    button.style.backgroundColor = "#1D6154"
    button.style.color = "white"
}
// style bouton non actif
function removeButtonStyle(button) {
    button.style.backgroundColor = "#FFFEF8"
    button.style.color = "#1D6154"
}