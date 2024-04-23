function guardar() {
    let nombre_ingresado = document.getElementById("nombre").value 
    let apellido_ingresado = document.getElementById("apellido").value 
    let nacimiento_ingresado = document.getElementById("nacimiento").value 
    let email_ingresado = document.getElementById("email").value
    let password_ingresado = document.getElementById("password").value
    let genero_ingresado = document.getElementById("genero").value 

    console.log(nombre_ingresado,apellido_ingresado,nacimiento_ingresado,email_ingresado,password_ingresado,genero_ingresado);
    
    let datos = {
        nombre: nombre_ingresado,
        apellido:apellido_ingresado,
        nacimiento:nacimiento_ingresado,
        email:email_ingresado,
        password:password_ingresado,
        genero:genero_ingresado
    }
    console.log(datos);
    
    let url = "https://gymfit21.pythonanywhere.com/registro"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Devuelve el href (URL) de la página actual
            window.location.href = "../index.html";  
            
        })
        .catch(err => {
            alert("Error al grabar" )
            console.error(err);
        })
}