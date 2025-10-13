// ----------------------------------------
// 🔹 VALIDACIONES
// ----------------------------------------
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarFecha(fecha) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(fecha);
}

// ----------------------------------------
// 🔹 GUARDAR USUARIO
// ----------------------------------------
async function guardar() {
  const nombre = document.getElementById("reg_nombre").value.trim();
  const apellido = document.getElementById("reg_apellido").value.trim();
  const nacimiento = document.getElementById("reg_nacimiento").value.trim();
  const email = document.getElementById("reg_email").value.trim().toLowerCase();
  const password = document.getElementById("reg_password").value.trim();
  const genero = document.getElementById("reg_genero").value.trim().toLowerCase();

  // VALIDACIONES FRONTEND
  if (!nombre || !apellido || !email || !password) {
    alert("Por favor complete todos los campos obligatorios.");
    return;
  }
  if (!validarEmail(email)) {
    alert("Ingrese un correo electrónico válido.");
    return;
  }
  if (nacimiento && !validarFecha(nacimiento)) {
    alert("La fecha debe tener formato AAAA-MM-DD.");
    return;
  }
  if (genero && genero.length > 1) {
    alert("El género debe ser una sola letra (M, F, O...).");
    return;
  }

  const datos = { nombre, apellido, nacimiento: nacimiento || null, email, password, genero };

  try {
    const response = await fetch("https://gymfit21.pythonanywhere.com/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 409) alert("❌ El correo ya está registrado.");
      else if (response.status === 400) alert("❌ Datos incompletos o formato incorrecto.");
      else alert("❌ Error al registrar usuario.");
      return;
    }

    alert("✅ Usuario registrado correctamente.");
    window.location.href = "../index.html";

  } catch (err) {
    console.error("Error de conexión:", err);
    alert("❌ No se pudo conectar con el servidor.");
  }
}
