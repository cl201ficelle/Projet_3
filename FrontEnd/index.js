let token = localStorage.getItem("token")
let allWorks = JSON.parse(localStorage.getItem("works"))
const photoGalleryModal = document.querySelector('.photoGalleryModal')
allCategories = JSON.parse(localStorage.getItem("categories"))

// effacer contenu gallery html
function deleteGalleryWorks() {
    let gallery = document.querySelector(".gallery")
    gallery.innerHTML = ''
}
deleteGalleryWorks()

// attendre d'avoir les travaux avant de les récupérer du local storage
async function initialisation() {
    await getAllWorks()
    allWorks = JSON.parse(localStorage.getItem("works"))
    genererGallery(allWorks)
}
initialisation()

// récupération travaux 
async function getAllWorks() {
    return fetch("http://localhost:5678/api/works")
        .then((response) => {
            if (!response.ok) {
                throw new Error('La requête a échoué.')
            }
            return response.json()
        })
        .then((allWorks) => {
            // mettre les données dans le local storage
            localStorage.setItem("works", JSON.stringify(allWorks))
            return allWorks
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des données :", error)
            throw error
        });
}

// générer galerie avec les travaux récupérés
function genererGallery(Works) {
    for (let i = 0; i < Works.length; i++) {
        const gallery = document.querySelector(".gallery")
        const workElement = document.createElement("figure")
        const imgElement = document.createElement("img")
        imgElement.src = Works[i].imageUrl
        const figCaption = document.createElement("figcaption")
        figCaption.innerText = Works[i].title
        gallery.appendChild(workElement)
        workElement.appendChild(imgElement)
        workElement.appendChild(figCaption)
    }
}

// fonction de deconnexion : supprime token, cache barre noire, écrit login, supprime lien modifiation, recrée les filtres
function LogOut() {
    localStorage.removeItem("token")
    const barreNoire = document.getElementById("BarreNoir")
    barreNoire.style.display = "none"
    Log.innerText = "login"
    h2modif.innerHTML = '<h2 class="titreMesProjets">Mes Projets</h2>'
    divFiltres.style.display=null
    deleteGalleryWorks()
    initialisation()
}

// si on clique sur log alors que le token est présent, le token se supprime, si le token est absent alors on est redirigé vers la page de connection
function deconnectionRedirection() {
    Log.addEventListener('click', function() {
        if (localStorage.getItem("token")) {
            LogOut()
            console.log("utilisateur deconnecté")
        } else {
            Log.innerHTML = 'login'
            window.location.href = "connectionpage.html"
        }
    })
}

// si le token est présent, log affiche logout, le lien de modif apparaît, divFiltre disparaît, barre noire apparaît
function isConnected() {
    if (localStorage.getItem('token')) {
        console.log('Le localStorage contient un token.');
        Log.innerHTML = 'logout'
        creationLienModif()
        divFiltres.style.display="none"
        const barreNoire = document.getElementById("BarreNoir")
        barreNoire.style.display = null

    }
}

// fonction qui créé icone et lien de modif
function creationLienModif() {
    const h2modif = document.getElementById("h2modif")
    const logoModif = document.createElement("i")
    logoModif.classList = "fa-regular fa-pen-to-square"
    logoModif.style = "color: black"
    h2modif.appendChild(logoModif)
    const modifier = document.createElement("a")
    modifier.innerText = "modifier"
    modifier.id = "modifier"
    modifier.href = "#modal"
    modifier.classList = "lienModal"
    h2modif.appendChild(modifier)
}

isConnected()
deconnectionRedirection()

// attendre d'avoir les travaux avant de les récupérer du local storage
async function initialisationModal() {
    allWorks = JSON.parse(localStorage.getItem("works"))
    genererGalleryModal(allWorks)
}
initialisationModal()

let modal = null
const flecheRetour = document.querySelector(".fa-arrow-left")
const modal1 = document.querySelector(".modal1")
const modal2 = document.querySelector(".modal2")
const formulaireAjout = document.getElementById("formulaireAjout")


const openModal = function(e) {
    e.preventDefault()
    modal1.style.display = null
    flecheRetour.style.color = "white"
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    modal = target
    modal2.style.display = "none"
    modal.addEventListener("click", closeModal)
    modal.querySelector('.Modalclose').addEventListener("click", closeModal)
    modal.querySelector('.modalConteneur').addEventListener("click", stopPropagation)
}
const fileInput = document.getElementById("ajout_photo");

const closeModal = function(e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.querySelector('.Modalclose').removeEventListener("click", closeModal)
    modal.querySelector('.modalConteneur').removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function(e) {
    e.stopPropagation()
}


document.querySelectorAll(".lienModal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeModal(e)
    }
})

// fonction qui génère la galerie de la modale
function genererGalleryModal(Works) {
    photoGalleryModal.innerHTML = ""
    for (let i = 0; i < Works.length; i++) {
        // on crée une balise figure qui contiendra chaque élément work
        const workElement = document.createElement("figure")
        // on crée une balise image
        const imgElement = document.createElement("img")
        workElement.id = (i + 1)
        //  creation lien editer
        const editer = document.createElement("a")
        //  creation logo trash
        const trash = document.createElement('i')
        //  on donne le logo a i
        trash.classList = "fa-solid fa-trash-can"
        //  on créé bouton    
        const buttonTrash = document.createElement("button")
        buttonTrash.classList = ("buttonTrash")
        //  donner numéro id au trash qui corresponde au id travaux
        buttonTrash.setAttribute("id", Works[i].id);
        //  on met le button trash pour chaque élément work
        workElement.appendChild(buttonTrash)
        //on met le logo trash pour chaque élément button 
        buttonTrash.appendChild(trash)
        //  on donne contenu a "éditer"
        editer.innerText = "éditer"
        //  on donne lien a "éditer"
        editer.href = "#"
        // on met la source des images, que je connais grâce console.log(allWorks). on utilise l'indice i, comme ca on va obtenir chaque élémént de la liste de l'api.
        imgElement.src = Works[i].imageUrl
        // on met les div workElement dans gallery
        photoGalleryModal.appendChild(workElement)
        // on met les images dans chaque div workElement
        workElement.appendChild(imgElement)
        workElement.appendChild(editer)
    }
    deleteWorkTrash()
}

//fonction qui supprime les éléments au clique du trash correspondant 
function deleteWorkTrash() {
    // recupère les boutons trash
    let buttonTrashList = document.querySelectorAll(".buttonTrash");
    // pour chaque bouton trash un eventlistener
    buttonTrashList.forEach(buttonTrash => {
        buttonTrash.addEventListener("click", function() {
            // id du work a supprimer = a id bouton trash cliqué
            const idWorkToDelete = buttonTrash.getAttribute("id");
            // supprimer le work selon quel bouton trash cliqué
            deleteWork(idWorkToDelete);
        });
    });
}

// suppression work selon clique sur trash
function deleteWork(idWork) {
    fetch(`http://localhost:5678/api/works/${idWork}`, {
            method: "DELETE",
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('erreur');
            }
            alert("Élément supprimé")
            getNewWorks()
        })
        .catch(error => {
            console.error('problème requête DELETE :', error)
        });
}

// faire la galerie sans le work supprimé
function getNewWorks(idWork) {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
            deleteGalleryWorks()
            const filteredData = data.filter(item => item.id !== idWork)
            localStorage.setItem("works", JSON.stringify(filteredData))
            let getnewWorks = JSON.parse(localStorage.getItem("works"))
            genererGallery(getnewWorks)
            genererGalleryModal(getnewWorks)
        })
        .catch(error => {
            console.error('problème requête GET :', error)
        });
}

// création bouton ajout photo
function createButtonAjout() {
    const buttonAjoutPhoto = document.createElement("button")
    buttonAjoutPhoto.classList = ("buttonAjoutPhoto")
    buttonAjoutPhoto.innerText = "Ajouter une photo"
    const conteneurButtonAjout = document.querySelector(".conteneurButtonAjout")
    conteneurButtonAjout.appendChild(buttonAjoutPhoto)
}

// affichage modal 2 : ajout photo 
function ajoutPhoto() {
    createButtonAjout()
    const buttonAjoutPhoto = document.querySelector(".buttonAjoutPhoto").addEventListener("click", function() {
        modal1.style.display = "none"
        modal2.style.display = null
        flecheRetour.style.color = "black"
    })
}

// si on clique sur flèche alors retour à modal1
function retourModal1() {
    flecheRetour.addEventListener("click", function() {
        modal1.style.display = null
        modal2.style.display = "none"
        flecheRetour.style.color = "white"
    })
}
retourModal1()
ajoutPhoto()

// création bouton valider pour modal2
function createButtonValider() {
    const buttonValider = document.createElement("button")
    buttonValider.classList = ("buttonValider")
    buttonValider.innerText = "Valider"
    buttonValider.type = ("submit")
    buttonValider.style.backgroundColor = "#A7A7A7"
    buttonValider.style.border = "#A7A7A7"
    const conteneurButtonValider = document.querySelector(".conteneurButtonValider")
    conteneurButtonValider.appendChild(buttonValider)
}

createButtonValider()

allCategories = JSON.parse(localStorage.getItem("categories"))
const categorie_select = document.getElementById("categorie_select")
// création menu déroulant avec option par défaut puis 3 catégories
function createOptionSelected() {
    const defaultOption = document.createElement("option")
    defaultOption.innerText = "Choisir une catégorie"
    defaultOption.value = ""
    defaultOption.selected = true
    // selectionne automatiquement cette option par défaut
    categorie_select.appendChild(defaultOption);
    for (let i = 0; i < allCategories.length; i++) {
        const optionCategorie = document.createElement("option")
        optionCategorie.innerText = allCategories[i].name
        categorie_select.appendChild(optionCategorie)
        optionCategorie.id = (i + 1)
    }
}

createOptionSelected()

// selectionne élement dont on veut avoir l'aperçu  
const preview = document.getElementById("apercu")
let reader = new FileReader()

// Écoutez les changements dans le champ de fichier
function showpreview() {
    fileInput.addEventListener("change", function() {
        // Vérifiez s'il y a un fichier sélectionné
        if (fileInput.files && fileInput.files[0]) {
            // supprimer les éléments qui vont être remplacés par l'aperçu
            const logoimage = document.querySelector(".fa-image")
            logoimage.style.display = "none"
            const pAjout = document.querySelector(".pAjout")
            pAjout.style.display = "none"
            const ajout_photos = document.getElementById("ajout_photos")
            ajout_photos.style.display = "none"
            //  objet filereader pour lire contenu fichier
            reader = new FileReader()
            // fonction de rappel pour exécuter lorsque lecture terminée
            reader.onload = function(e) {
                // creation element img pour afficher l'aperçu
                const image = document.createElement("img")
                // source de img données lues depuis le fichier
                image.src = e.target.result
                image.classList.add("aperçu-image")
                preview.innerHTML = ""
                // Ajoute élément img à élément d'aperçu
                preview.appendChild(image)
            }
            // Lire contenu fichier en tant que données URL (base64)
            reader.readAsDataURL(fileInput.files[0])
        }
    })
};

showpreview()

const buttonValider = document.querySelector(".buttonValider")


// verifier champ non vide, sinon boxshadow rouge
function verifierChamp(balise) {
    if (balise.value === "") {
        balise.style.boxShadow = "0px 0px 8px #9e1e1e"
    } else {
        balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
    }
}

// vérifier champ fichier non vide, sinon message alerte
function verifierChampFichier(balise) {
    const fichierSelectionne = balise.files[0]
    if (!fichierSelectionne) {
        alert("Veuillez sélectionner un fichier.")
    }
}

let userTitleInput = document.getElementById("TitreForm")
let userCategorieInput = document.getElementById("categorie_select")
let userImageInput = document.getElementById("ajout_photo")

// récupère valeur utilisateur
function recupererInputValueAjout() {
    let title = userTitleInput.value;
    const selectedOption = userCategorieInput.options[userCategorieInput.selectedIndex];
    let category = parseInt(selectedOption.id, 10)
    let image = userImageInput.files[0]
    return {
        title,
        category,
        image
    }
}

// submit le formData
function submitForm() {
    formulaireAjout.addEventListener("submit", function(event) {
        let formData = new FormData()
        let {
            title,
            category,
            image
        } = recupererInputValueAjout()
        event.preventDefault();
        verifierChamp(TitreForm)
        verifierChamp(categorie_select)
        verifierChampFichier(document.getElementById("ajout_photo"))
        formData.append("image", image)
        formData.append("title", title)
        formData.append("category", category)
        fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            })
            .then((res) => {
                if (res.ok) {
                    alert("Nouvel élement ajouté avec succès")
                    // modal.style.display = "none"
                    resetForm()
                    deleteGalleryWorks()
                    getNewWorks()
                    return res.json()
                } else {
                    console.error("Erreur lors de l'ajout de l'élément.")
                }
            })
            .catch((error) => {
                console.error("Une erreur s'est produite : ", error)
            })
    })
}
submitForm()


// bouton valider devient vert seulement si champs input remplie et fichier aussi
function buttonValiderColor() {
    const TitreForm = document.getElementById("TitreForm")
    const categorie_select = document.getElementById("categorie_select")
    const ajout_photo = document.getElementById("ajout_photo")
    const buttonValider = document.querySelector(".buttonValider")
    TitreForm.addEventListener("input", updateButtonColor)
    categorie_select.addEventListener("input", updateButtonColor)
    ajout_photo.addEventListener("input", updateButtonColor)

    function updateButtonColor() {
        if (TitreForm.value !== "" && categorie_select.value !== "" && ajout_photo.files.length > 0) {
            buttonValider.style.backgroundColor = "#1D6154"
            buttonValider.style.border = "#1D6154"
        } else {
            buttonValider.style.backgroundColor = "#A7A7A7"
            buttonValider.style.border = "#A7A7A7"
        }
    }
}

buttonValiderColor()

// reset le formulaire quand une photo a été ajoutée
function resetForm() {
    buttonValider.style.backgroundColor = "#A7A7A7"
    buttonValider.style.border = "#A7A7A7"
    formulaireAjout.reset()
    const logoimage = document.querySelector(".fa-image")
    logoimage.style.display = null
    const pAjout = document.querySelector(".pAjout")
    pAjout.style.display = null
    const ajout_photos = document.getElementById("ajout_photos")
    ajout_photos.style.display = null
    const apercu = document.querySelector(".aperçu-image")
    apercu.style.display = "none"
}