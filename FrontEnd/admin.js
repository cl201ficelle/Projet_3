
function LogOut(){
    localStorage.removeItem("token")
    Log.innerText="login"
  }


// si le token est présent, log affiche logout
function isConnected(){
if (localStorage.getItem('token')) {
    console.log('Le localStorage contient un token.');
    Log.innerHTML='logout'
}
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
  isConnected()
  deconnectionRedirection()
