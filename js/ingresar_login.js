function login() {
    let email_ingresado = document.getElementById("email").value;
    let password_ingresado = document.getElementById("password").value;

   
    console.log(email_ingresado, password_ingresado);

    // if (!email_ingresado || !password_ingresado) {
    //     alert("Por favor, completa todos los campos");
    //     return;

    let datos = {
        email: email_ingresado,
        password: password_ingresado
    };

    console.log(datos);

    let url = "https://gymfit21.pythonanywhere.com/login";  // Cambia la ruta si tu backend usa otra
    let options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }
            return response.json(); // Devuelve JSON con token o datos del usuario
        })
        .then(data => {
            console.log("Login exitoso", data);
            alert("Bienvenido " + datos.email);

            // Guardar datos del usuario en localStorage
            localStorage.setItem("usuario", JSON.stringify(data));

            // Guardar token en localStorage para mantener la sesión
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            // Redirigir al home o dashboard
            window.location.href = "./template/bienvenida.html";
        })
        .catch(err => {
            alert("Error al iniciar sesión: " + err.message);
            console.error(err);
        });
}
