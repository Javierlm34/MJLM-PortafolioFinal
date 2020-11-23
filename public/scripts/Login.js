
let taskForm = document.getElementById("task-form");
let logContainer = document.getElementById("Log-container");
let admin = document.getElementById("CRUDContainer");

function registrar(){
  event.preventDefault();
  let user = document.getElementById("mail").value;
    let pass = document.getElementById("password").value;
    
    firebase.auth().signInWithEmailAndPassword(user, pass)
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
    taskForm.reset();
    return false;
  }
  
  function Observer(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("si");
        let adminONo = firebase.auth().currentUser;
        Logged(adminONo);
        logContainer.innerHTML="";
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        window.location = "../pages/Home.html";
          // ...
        } else {
            console.log("no");

            logContainer.innerHTML=`
            <div class="text-center">
            <h3>Inicia sesión</h3><br>
          </div>

          <div class="form-group">
            <input type="email" id="mail" class="form-control"
            placeholder="usuario"
            autofocus>
          </div>

          <div class="form-group">
            <input type="password" id="password" class="form-control"
            placeholder="contraseña">
          </div>
    

          <button onclick="registrar()" class="btn btn-primary"style="background-color: #8A4FD1; border-color: #A35EF7;">
            Iniciar sesión
          </button>
          
          <p><br>¿No tienes cuenta?</p>
          <a href="../pages/Registro.html">Registrate aquí</a>
          `;

          
          // User is signed out
          // ...
        }
      });
}

Observer();
let iniciado = document.getElementById("logged");

  
function logout(){
  firebase.auth().signOut().then(function(){
    console.log("Bye")
    iniciado.innerHTML =" ";
    admin.innerHTML=" ";
  })
  .catch(function(error){
    console.log(error);
  })
  return false;
}

  
function Logged(adminONo){
    iniciado.innerHTML = `
     
    `;

    if (adminONo.email == "aoviedo_pongame_10@up.edu.mx") {
      admin.innerHTML= `
      <li class="nav-item">
        <a class="nav-link" href="../pages/CRUD.html">CRUD</a>
      </li>
    `
    }
    
}