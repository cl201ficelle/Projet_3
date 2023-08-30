
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
  
  
  
// let contenuModal = document.querySelector(".modalConteneur") 
// contenuModal.innerHTML = genererGallery(allWorks)
  
  
  
  
  
