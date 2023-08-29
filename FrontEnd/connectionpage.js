// récupération de ce que l'user va écrire dans input
function recupererInputValue(){
  let userEmailInput = document.getElementById("email");
  let userEmailValue = userEmailInput.value;
    
  let userPasswordInput = document.getElementById("password");
  let userPasswordValue = userPasswordInput.value;
  return { userEmailValue, userPasswordValue }
  }
  
  // fonction qui va POST les values des inputs
  function submit(username, password) {
    // charge utile body swagger
    let params = {
    email: username,
    password: password
    }
    
    fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    // header swagger
    headers: {
        "Content-Type": "application/json"
      },
        body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(data=> {
  // s'il y a un token : c'est que la combinaison mdp email est bonne, donc connexion réussi et on stock le token dans le local storage
        if (data.token) {
            alert("Connexion réussie");
            localStorage.setItem("token", data.token);
            // et login devient logout
            Log.innerText="logout"
        //   redirection accueil
            // window.location.href = 'index.html'; 
        } else {
          throw new Error("Une erreur s’est glissée dans votre adresse e-mail ou votre mot de passe, veuillez réessayer"); 
        }
      })
      .catch((error)=> {
         alert(error.message); 
      })
  }
  
  function login(){
    // pour ne pas que la page se rafraichit au submit
  document.getElementById("login").addEventListener("submit", function (event) {
      event.preventDefault();
  
  let {userEmailValue, userPasswordValue} = recupererInputValue()
      submit(userEmailValue, userPasswordValue)
      if (localStorage.getItem("token") !==''){
    console.log("utilisateur connecté")
  }
  })}
  
  let Log = document.getElementById("Log")
  // quand on clique sur l'élément log (écrit logout quand on est connecté), le token se supprime donc on obtient une déconnection
  function LogOut(){
    localStorage.removeItem("token")
    Log.innerText="login"
  }
  Log.addEventListener('click', function(){
    if (localStorage.getItem("token") !==''){
      LogOut()
      console.log("utilisateur deconnecté")
    }
  })
  
  login()