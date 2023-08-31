
function LogOut(){
    localStorage.removeItem("token")
    Log.innerText="login"
    // supprime le lien modif
    h2modif.innerHTML='<h2 class="titreMesProjets">Mes Projets</h2>'
    buttonFiltreTous()
    buttonFiltresAll()
    
  }





// si on clique sur log alors que le token est présent, le token se supprime, si le token est absent alors on est redirigé vers la page de connection
function deconnectionRedirection(){
Log.addEventListener('click', function(){
    if (localStorage.getItem("token")){
        LogOut()

      console.log("utilisateur deconnecté")
    }else{
        Log.innerHTML='login'
        window.location.href = "connectionpage.html"
    }
  })
}
// si le token est présent, log affiche logout
function isConnected(){
if (localStorage.getItem('token')) {
    console.log('Le localStorage contient un token.');
    Log.innerHTML='logout'
    creationLienModif()
    divFiltres.innerHTML=''
    
}
}
  

// fonction qui créé icone et lien de modif
function creationLienModif(){
const h2modif = document.getElementById("h2modif")
const logoModif = document.createElement("i")
logoModif.classList="fa-regular fa-pen-to-square"
logoModif.style="color: black"
h2modif.appendChild(logoModif)
const modifier = document.createElement("a")
modifier.innerText = "modifier"
modifier.id="modifier"
modifier.href="#modal"
modifier.classList="lienModal"
h2modif.appendChild(modifier)
}
  
  isConnected()
  deconnectionRedirection()








let modal = null


const openModal = function(e){
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display=null
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector('.Modalclose').addEventListener("click",closeModal)
    modal.querySelector('.modalConteneur').addEventListener("click",stopPropagation)
}

const closeModal = function (e){
  if (modal === null) return
  e.preventDefault()
  modal.style.display= "none"
  modal.querySelector('.Modalclose').removeEventListener("click", closeModal)
  modal.querySelector('.modalConteneur').removeEventListener("click", stopPropagation)
  modal=null
}

const stopPropagation = function(e){
  e.stopPropagation()
}


document.querySelectorAll(".lienModal").forEach(a=>{
  a.addEventListener("click", openModal)
  
})

window.addEventListener("keydown", function (e){
  if (e.key === "Escape"){
    closeModal(e)
  }
})
  
let photoGalleryModal = document.querySelector('.photoGalleryModal')  

function genererGalleryModal(Works){
             
  // mise en place du compteur : initialisation de i, pour i < longueur work, on incrémente i
 for (let i= 0; i<Works.length; i++){
     // on récupère la balise div avec classe gallery déjà présente dans html
    
     // on crée une balise figure qui contiendra chaque élément work
     const workElement = document.createElement("figure")
     // on crée une balise image
     const imgElement = document.createElement("img")
     workElement.id=(i+1)
    //  creation lien editer
     const editer = document.createElement("a")
    //  creation logo trash
     const trash = document.createElement('i')
    //  on donne le logo a i
     trash.classList="fa-solid fa-trash"
    //  on créé bouton    
     const buttonTrash = document.createElement("button")
     buttonTrash.classList=("buttonTrash")
    //  donner numéro id au trash qui corresponde au id travaux
     buttonTrash.id=(i+1)
    //  on met le button trash pour chaque élément work
     workElement.appendChild(buttonTrash) 
      //on met le logo trash pour chaque élément button 
     buttonTrash.appendChild(trash)
    //  on donne contenu a "éditer"
     editer.innerText="éditer"
    //  on donne lien a "éditer"
     editer.href="#"
     // on met la source des images, que je connais grâce console.log(allWorks). on utilise l'indice i, comme ca on va obtenir chaque élémént de la liste de l'api.
     imgElement.src = Works[i].imageUrl
     // on met les div workElement dans gallery
     photoGalleryModal.appendChild(workElement)
     // on met les images dans chaque div workElement
     workElement.appendChild(imgElement)
     workElement.appendChild(editer) 
                 
 } deleteWorkTrash()
}

genererGalleryModal(allWorks)

function createButtonAjout(){
const buttonAjoutPhoto = document.createElement("button")
buttonAjoutPhoto.classList=("buttonAjoutPhoto")
buttonAjoutPhoto.innerText="Ajouter une photo"
const conteneurButtonAjout = document.querySelector(".conteneurButtonAjout")
conteneurButtonAjout.appendChild(buttonAjoutPhoto)
}

createButtonAjout()



function deleteWorkTrash(){
  let buttonTrashList = document.querySelectorAll(".buttonTrash");
  buttonTrashList.forEach(buttonTrash => {
    buttonTrash.addEventListener("click", function(){ 
      const idWorkToDelete = buttonTrash.id; // Utilisez le bouton actuel
      console.log(idWorkToDelete);
      deleteWork(idWorkToDelete);
    });
  });
}

function deleteWork (idWork){
  
let bearerToken = localStorage.getItem("token")
fetch(`http://localhost:5678/api/works/${idWork}`,{
  method :"DELETE",
  headers: {
    accept: "*/*",
    Authorization: `Bearer ${bearerToken}`
}
})  
.then(response => {
  if (!response.ok) {
      throw new Error('erreur');
  }
  console.log('supression ok');
})
.catch(error => {
  console.error('problème requête DELETE :', error);
});

}

