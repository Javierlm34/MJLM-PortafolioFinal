const db = firebase.firestore();

const taskForm = document.getElementById("task-form");
const projectContainer = document.getElementById("project-container");
const projectContaineradmin = document.getElementById("project-container-admin");

let editStatus = false;
let id = "";

const saveProject = (title,description,categoria,fileurl) =>
    db.collection("Proyectos").doc().set({
        title,
        description,
        categoria,
        fileurl
    });

const getProjects = () => db.collection("Proyectos").get();
const getProject = (id) => db.collection("Proyectos").doc(id).get();

const onGetProjects = (callback) => db.collection("Proyectos").onSnapshot(callback);

const deleteProject = (id) => db.collection("Proyectos").doc(id).delete();

const updateProJect = (id, updatedProject) => db.collection("Proyectos").doc(id).update(updatedProject);

async function uploadImage(file) {
    const ref = firebase.storage().ref();
    const name = new Date() + "-" + file.name;
    const metadata = { contentType: file.type };
    const snapshot = await ref.child(name).put(file, metadata);
    const url = await snapshot.ref.getDownloadURL();
    return url;
  }

window.addEventListener("DOMContentLoaded", async(e) => {
    //const querySnapshot = await getProjects();
    
    onGetProjects((querySnapshot) =>{
        if (projectContainer){
            projectContainer.innerHTML = ``
        }
        if (projectContaineradmin){
            projectContaineradmin.innerHTML = ``
        }
        querySnapshot.forEach(doc =>{    
            const proyecto = doc.data();
            proyecto.id=doc.id

            if (!proyecto.fileurl) {
                proyecto.fileurl =
                  "https://firebasestorage.googleapis.com/v0/b/portafolio-bda88.appspot.com/o/thumbnail.jpg?alt=media&token=b30ef8cf-33d0-47b6-ad44-a0c68156b61d"
              }

            if (projectContainer){
            projectContainer.innerHTML += `
                <div category="${proyecto.categoria}">
                    <div class="card card-body mt-2 caty" id="cards" category="${proyecto.categoria}">
                        <h3>${proyecto.title}</h3>
                        <p>${proyecto.description}</p>
                        <img class="img-fluid" src="${proyecto.fileurl}" />
                    </div>
                </div>
                `
            }

            if (projectContaineradmin){
            projectContaineradmin.innerHTML += `
                    <div class="card card-body mt-2 caty" id="cards" category="${proyecto.categoria}">
                        <h3>${proyecto.title}</h3>
                        <p>${proyecto.description}</p>
                        <img class="img-fluid" src="${proyecto.fileurl}" />
                        <br>
                        <br>
                        <div>
                            <button class="btn btn-primary btn-borrar" data-id="${proyecto.id}">Borrar</button>
                            <button class="btn btn-secondary btn-editar" data-id="${proyecto.id}">Editar</button>
                        </div>
                    </div>
                `
            }
            const btnsBorrar = document.querySelectorAll(".btn-borrar");
            btnsBorrar.forEach(btn => {
                btn.addEventListener("click", async (e) =>{
                        
                    console.log(e.target.dataset.id)
                    await deleteProject(e.target.dataset.id);
                })
            });

            const btnsEditar = document.querySelectorAll(".btn-editar");
            btnsEditar.forEach(btn => {
                btn.addEventListener("click", async (e) =>{
                        
                    // window.location.href = "../pages/CRUD.html";
                    const doc = await getProject(e.target.dataset.id);
                    const proy = doc.data();
                    console.log(doc.data())


                    taskForm["project-title"].value = proy.title;
                    taskForm["desc-title"].value = proy.description;
                    taskForm["categoria"].value = proy.categoria;
                    taskForm["btn-task-form"].innerText = "Actualizar";

                    editStatus = true;
                    id = doc.id;
                })
            });

            
        })
    })
    
})

taskForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    
    const title = taskForm["project-title"];
    const description = taskForm["desc-title"];
    const categoria = taskForm["categoria"];
    const file = taskForm["task-image"].files[0];

    let fileurl = null;

    if (file) {
      fileurl = await uploadImage(file);
    }
  

    if (!editStatus){
        await saveProject(title.value,description.value,categoria.value,fileurl);
    } else {
        if(file){
            await updateProJect(id, {
                title: title.value,
                description: description.value,
                categoria: categoria.value,
                fileurl
            });
        }
        await updateProJect(id, {
            title: title.value,
            description: description.value,
            categoria: categoria.value
        });
        editStatus = false;
        id="";
        taskForm["btn-task-form"].innerText = "Guardar";
    }

    await getProjects();
    taskForm.reset();
    title.focus();
})