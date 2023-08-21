// effacer contenu gallery
let gallery = document.querySelector(".gallery")
gallery.innerHTML = ''


// récupérer works de l'api
const promise = fetch("http://localhost:5678/api/works")
// deux then car promise
promise
.then((response) => {
   
    const promise2 =  response.json();

    promise2.then((allWorks) => {
    //    boucle for pour récupérer toutes les images i
    // mise en place du compteur : initialisation de i, pour i < longueur work, on incrémente i
        for (let i= 0; i<allWorks.length; i++){
            // on récupère la balise div avec classe gallery déjà présente dans html
            let gallery = document.querySelector(".gallery");
            // on crée une balise div qui contiendra chaque élément work
            const workElement = document.createElement("div");
            // on crée une balise image
            const imgElement = document.createElement("img");
            // on met la source des images, que je connais grâce console.log(allWorks). on utilise l'indice i, comme ca on va obtenir chaque élémént de la liste de l'api.
            imgElement.src = allWorks[i].imageUrl;
            // on crée balise ficaption qui contiendra le titre de l'image
            const figCaption = document.createElement("figcaption");
            // on met le texte de title dans la balise figcaption
            figCaption.innerText = allWorks[i].title;
            // on met les div workElement dans gallery
            gallery.appendChild(workElement)
            // on met les images dans chaque div workElement
            workElement.appendChild(imgElement)
            // on met chaque gigcaption dans chaque div workElement
            workElement.appendChild(figCaption)

            
        }
        

    });
})

