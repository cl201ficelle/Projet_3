
// récupération des éléments entré par utilisateur
let baliseEmail = document.getElementById("email")
let email = baliseEmail.value

let balisePassword = document.getElementById("password")
let password = balisePassword.value
// console.log(email); // affiche ce qui est contenu dans la balise 

async function connect (){
    params ={
        "email": "sophie.bluel@test.tld",
        "password": "S0phie"
    }
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body:JSON.stringify(params)
    })
    console.table(response)
    

}
