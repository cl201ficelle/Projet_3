const portfolio = document.getElementById("portfolio")
let gallery = document.querySelector(".gallery")
const divFiltres = document.createElement("div")
divFiltres.setAttribute("class", "divFiltres");
portfolio.insertBefore(divFiltres, gallery)
let activeButton = null

//  obtenir toutes les catégories variable globale
function getAllCategories() {
    fetch("http://localhost:5678/api/categories")
      .then(function(response) {
        return response.json()
      })
      .then(function(allCategories) {
        localStorage.setItem("mydata2", JSON.stringify(allCategories))
      })
      .catch(function(error) {
        console.error("Error fetching and storing data:", error)
      })
  }
getAllCategories()
let allCategories = JSON.parse(localStorage.getItem("mydata2"))

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
        const tousTravaux = allWorks.filter(function(tousTravaux) {
            return tousTravaux
        })
        document.querySelector(".gallery").innerHTML = ""
        genererGallery(tousTravaux)
        console.log(tousTravaux)
    })
}


buttonFiltreTous()

// création autres boutons
function buttonFiltresAll() {
    for (let i = 0; i < allCategories.length; i++) {
        const buttonFiltre = document.createElement("button")
        buttonFiltre.innerText = allCategories[i].name
        divFiltres.appendChild(buttonFiltre)
        showFiltered(buttonFiltre)
    }
}

// filtre autres boutons
function showFiltered(buttonFiltre) {
    // j'ajoute les changements de style au moment du click
    buttonFiltre.addEventListener("click", () => {
        // s'il y a un bouton actif on enleve le style au bouton précédemment actif
        if (activeButton) {
            removeButtonStyle(activeButton)
        }
        // on applique ce style au bouton maintenant actif
        setButtonStyle(buttonFiltre)
        // Mettre à jour le bouton actif
        activeButton = buttonFiltre
        const worksByCategory = allWorks.filter(function(allWorks) {
            return allWorks.category.name === buttonFiltre.textContent
        })
        document.querySelector(".gallery").innerHTML = ""
        genererGallery(worksByCategory)
    })
}
buttonFiltresAll()

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


