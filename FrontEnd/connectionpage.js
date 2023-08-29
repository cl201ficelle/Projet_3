// pour ne pas que la page se rafraichit au submit
function recupererInputValue(){
  let userEmailInput = document.getElementById("email");
let userEmailValue = userEmailInput.value;
  
let userPasswordInput = document.getElementById("password");
let userPasswordValue = userPasswordInput.value;
return { userEmailValue, userPasswordValue }
}

function submit(username, password) {
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
          localStorage.setItem("token", data.token);

      //   redirection accueil
          // window.location.href = 'index.html'; 
          Log.innerText="logout"
    

      } else {
        throw new Error("Une erreur s’est glissée dans votre adresse e-mail ou votre mot de passe, veuillez réessayer"); 
      }
    })
    .catch((error)=> {
       alert(error.message); 
    })
}

function login(){
document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();

let {userEmailValue, userPasswordValue} = recupererInputValue()
    submit(userEmailValue, userPasswordValue);
})}



// if user click sur #Log quand il y a token dans local storage alors cette fonction est activée
function LogOut (){
  localStorage.removeItem("token")
}
function getToken(){
    return localStorage.getItem("token")
}
// si le token est différent de null alors le text de #log est logout
function isConnected(){
    return getToken() !== '';
   
}
isConnected()

if (localStorage.getItem('token')) {
  console.log('Le localStorage contient un token.');
} else {
  console.log('Le localStorage ne contient pas de token.');
} 

let Log = document.getElementById("Log")
console.log(Log.textContent)



login()