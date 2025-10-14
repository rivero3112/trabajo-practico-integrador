document.getElementById("btnModificar").addEventListener("click", modificar);

async function modificar() {
  const id = document.getElementById("id").value;
  const nombre_ingresado = document.getElementById("nombre").value.trim();
  const apellido_ingresado = document.getElementById("apellido").value.trim();
  const nacimiento_ingresado = document.getElementById("nacimiento").value;
  const email_ingresado = document.getElementById("email").value.trim();
  const password_ingresado = document.getElementById("password").value.trim();
  const genero_ingresado = document.getElementById("genero").value.trim().toUpperCase();

  // ✅ Validar datos
  if (!nombre_ingresado || !apellido_ingresado) return alert("Nombre y apellido son obligatorios.");
  if (!email_ingresado.includes("@")) return alert("Correo electrónico inválido.");
  if (!password_ingresado) return alert("Debe ingresar una contraseña.");

  const datos = {
    nombre: nombre_ingresado,
    apellido: apellido_ingresado,
    nacimiento: nacimiento_ingresado || null,
    email: email_ingresado,
    password: password_ingresado,
    genero: genero_ingresado
  };

  try {
    const res = await fetch(`https://gymfit21.pythonanywhere.com/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    const result = await res.json();

    if (!res.ok) {
      alert(`❌ Error: ${result.error || "No se pudo actualizar el usuario."}`);
      return;
    }

    alert("✅ Usuario actualizado correctamente.");
    window.location.href = "./tabla_usuarios.html";

  } catch (err) {
    console.error("❌ Error al modificar usuario:", err);
    alert("Error de conexión con el servidor.");
  }
}
