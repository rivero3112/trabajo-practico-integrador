function modificar() {
    let id = document.getElementById("id").value
    let nombre_ingresado = document.getElementById("nombre").value
    let apellido_ingresado = document.getElementById("apellido").value 
    let nacimiento_ingresado = document.getElementById("nacimiento").value
    let email_ingresado = document.getElementById("email").value     
    let password_ingresado = document.getElementById("password").value
    let genero_ingresado = document.getElementById("genero").value 

    let datos = {
        nombre: nombre_ingresado,
        apellido:apellido_ingresado,
        nacimiento:nacimiento_ingresado,
        email:email_ingresado,
        password:password_ingresado,
        genero:genero_ingresado
        }

    console.log(datos);

    let url = "https://gymfit21.pythonanywhere.com/update/"+id
    var options = {
        body: JSON.stringify(datos),
        method: 'PUT',
        
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Registro modificado")

            //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
           window.location.href = "./tabla_usuarios.html";
          
        })
        .catch(err => {
            this.error = true
            console.error(err);
            alert("Error al Modificar")
        })      
}