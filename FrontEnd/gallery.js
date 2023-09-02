// effacer contenu gallery
function deleteGalleryWorks() {
    let gallery = document.querySelector(".gallery")
    gallery.innerHTML = ''
}
deleteGalleryWorks()

async function getAllWorks() {
    let response = await fetch("http://localhost:5678/api/works")
    let allWorks = await response.json()
    // mettre dans local storage 
    localStorage.setItem("mydata", JSON.stringify(allWorks))
}

getAllWorks()

let allWorks = JSON.parse(localStorage.getItem("mydata"))


function genererGallery(Works) {

    // mise en place du compteur : initialisation de i, pour i < longueur work, on incrémente i
    for (let i = 0; i < Works.length; i++) {
        // on récupère la balise div avec classe gallery déjà présente dans html
        let gallery = document.querySelector(".gallery")
        // on crée une balise figure qui contiendra chaque élément work
        const workElement = document.createElement("figure")
        // on crée une balise image
        const imgElement = document.createElement("img")
        // on met la source des images, que je connais grâce console.log(allWorks). on utilise l'indice i, comme ca on va obtenir chaque élémént de la liste de l'api.
        imgElement.src = Works[i].imageUrl
        // on crée balise ficaption qui contiendra le titre de l'image
        const figCaption = document.createElement("figcaption")
        // on met le texte de title dans la balise figcaption
        figCaption.innerText = Works[i].title
        // on met les div workElement dans gallery
        gallery.appendChild(workElement)
        // on met les images dans chaque div workElement
        workElement.appendChild(imgElement)
        // on met chaque figcaption dans chaque div workElement
        workElement.appendChild(figCaption)
    }
}

genererGallery(allWorks)

console.table(allWorks)