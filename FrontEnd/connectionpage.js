let baliseEmail = document.getElementById("email")
let email = baliseEmail.value
// console.log(email); // affiche ce qui est contenu dans la balise name

// erreur quand j'essaye de récupérer login de API
const res = await fetch("http://localhost:5678/api/works")
console.log(res)
