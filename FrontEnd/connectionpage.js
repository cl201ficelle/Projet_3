const Log = document.getElementById("Log")

// récupération de ce que l'user va écrire dans input
function recupererInputValue() {
  const userEmailInput = document.getElementById("email")
  let userEmailValue = userEmailInput.value

  const userPasswordInput = document.getElementById("password")
  let userPasswordValue = userPasswordInput.value
  return {
      userEmailValue,
      userPasswordValue
  }
}

// fonction qui va POST les values des inputs
function submit(username, password) {
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
      .then(data => {
          if (data.token) {
              alert("Connexion réussie")
              localStorage.setItem("token", data.token)
              Log.innerText = "logout"
              window.location.href = 'index.html'
          } else {
              throw new Error("Une erreur s’est glissée dans votre adresse e-mail ou votre mot de passe, veuillez réessayer");
          }
      })
      .catch((error) => {
          alert(error.message)
      })
}

function login() {
  document.getElementById("login").addEventListener("submit", function(event) {
      event.preventDefault()
      verifierChamp(email)
      verifierChamp(password)
      let {
          userEmailValue,
          userPasswordValue
      } = recupererInputValue()
      submit(userEmailValue, userPasswordValue)
      if (localStorage.getItem("token") !== '') {
          console.log("utilisateur connecté")
      }
  })
}

// suppression token = deconnexion 
function LogOut() {
  localStorage.removeItem("token")
  Log.innerText = "login"
}

function isConnected() {
  Log.addEventListener('click', function() {
      // si token, la fonction logout se met en route
      if (localStorage.getItem("token")) {
          LogOut()
          console.log("utilisateur deconnecté")
          // si pas de token, redirection vers connectionpage
      } else {
          window.location.href = "connectionpage.html"
      }
  })
}

// si champ vide quand submit : boxshadow // regex deja présent par défaut
function verifierChamp(balise) {
  if (balise.value === "") {
      balise.style.boxShadow = "0px 0px 8px #9e1e1e"
  } else {
      balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
  }
}

login()
isConnected()