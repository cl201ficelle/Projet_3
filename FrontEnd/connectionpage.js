// pour ne pas que la page se rafraichit au submit
document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();
  
// récupération des values que l'utilisateur entre dans les input
let userEmailInput = document.getElementById("email");
let userEmailValue = userEmailInput.value;
  
let userPasswordInput = document.getElementById("password");
let userPasswordValue = userPasswordInput.value;

let Log = document.getElementById("Log")
console.log(Log.textContent)
    login(userEmailValue, userPasswordValue);
  
  
  function login(username, password) {
    // charge utile body
    let params = {
    email: username,
    password: password
    }
    
    fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
      },
        body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data=> {
  
        if (data.token) {
            alert("Connexion réussie");
            sessionStorage.setItem("token", data.token);
        //   redirection accueil
            window.location.href = 'index.html'; 
        } else {
          throw new Error("Une erreur s’est glissée dans votre adresse e-mail ou votre mot de passe"); 
        }
      })
      .catch((error)=> {
         alert(error.message); 
      })
  }
})
  
// if user click sur #Log quand il y a token dans local storage alors cette fonction est activée
function LogOut (){
    localStorage.removeItem("token")
}
function getToken(){
    return localStorage.getItem("token")
}
// si le token est différent de null alors le text de #log est logout
function isConnected(){
    return getToken() !== '',
    Log.innerText="logout"
}
