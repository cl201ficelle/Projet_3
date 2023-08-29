
function LogOut(){
    localStorage.removeItem("token")
    Log.innerText="login"
  }


console.log("hi")
// Vérifier si le token est présent dans le localStorage
if (localStorage.getItem('token')) {
    console.log('Le localStorage contient un token.');
    Log.innerHTML='logout'
} else {
    Log.innerHTML='login'

    console.log('Le localStorage ne contient pas de token.');
}



  Log.addEventListener('click', function(){
    if (localStorage.getItem("token")){
      LogOut()
      console.log("utilisateur deconnecté")
    }else{
        window.location.href = "connectionpage.html"
    }
  })