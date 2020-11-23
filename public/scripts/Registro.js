
const boton1 = document.getElementById("registrar");
boton1.onclick = function (){
    registrar();
    return false;
}

function registrar(){

    let user = document.getElementById("mail").value;
    let pass = document.getElementById("password").value;
    
    firebase.auth().createUserWithEmailAndPassword(user, pass)
    // .then((user) => {
    //     // Signed in 
    //     // ...
    // })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..


        console.log(errorCode);
        console.log(errorMessage);
    });
}