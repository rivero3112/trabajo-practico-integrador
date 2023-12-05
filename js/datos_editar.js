let cadena = location.search; // Cadena con los símbolos & y =

let datos = new URLSearchParams(cadena);


let resultado = {};


for (const [nombre, valor] of datos) {
    resultado[nombre] = valor;
    resultado[apellido] = valor;
    resultado[nacimiento] = valor;
    resultado[email] = valor;
    resultado[password] = valor;
    resultado[genero] = valor
}


document.getElementById("id").value = resultado["id"]
document.getElementById("nombre").value = resultado["nombre"]
document.getElementById("apellido").value = resultado["apellido"]
document.getElementById("nacimiento").value = resultado["nacimiento"]
document.getElementById("email").value = resultado["email"]
document.getElementById("password").value = resultado["password"]
document.getElementById("genero").value = resultado["genero"]