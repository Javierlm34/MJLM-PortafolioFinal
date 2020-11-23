let admin = document.getElementById("CRUDContainer");
let loginContainer = document.getElementById("loginContainer")

function Observer(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let adminONo = firebase.auth().currentUser;
            Logged(adminONo);
          var uid = user.uid;
          // ...
        } else {
            Loggedout();
        }
      });
}

Observer();

function Logged(adminONo){

    if (adminONo.email == "aoviedo_pongame_10@up.edu.mx") {
      admin.innerHTML= `
      <li class="nav-item">
        <a class="nav-link" href="../pages/CRUD.html">CRUD</a>
      </li>
    `
    }

    loginContainer.innerHTML=`
        <li class="nav-item">
            <button onclick="logout()" class="nav-link btn btn-primary" style="background-color: #8A4FD1; border-color: #A35EF7;"href="../pages/Login.html">Cerrar sesión</button>
        </li>
    `
    
    
}


function Loggedout(){
loginContainer.innerHTML=`
<li class="nav-item">
    <a class="nav-link text-right" href="../pages/Login.html">Login</a>
</li>
`
}

function logout(){
    firebase.auth().signOut().then(function(){
      console.log("Bye")
      admin.innerHTML=" ";
      loginContainer.innerHTML=`
    <li class="nav-item">
        <a class="nav-link text-right" href="../pages/Login.html">Login</a>
    </li>
    `
    window.location = "../pages/Home.html";
    })
    .catch(function(error){
      console.log(error);
    })
    return false;
  }