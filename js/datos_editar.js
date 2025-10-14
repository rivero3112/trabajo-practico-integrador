const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const API_URL = "https://gymfit21.pythonanywhere.com";

const inputId = document.getElementById("id");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const nacimiento = document.getElementById("nacimiento");
const email = document.getElementById("email");
const password = document.getElementById("password");
const genero = document.getElementById("genero");

// 🔹 Cargar usuario existente
async function cargarUsuario() {
  try {
    if (!id) {
      alert("ID de usuario no proporcionado.");
      window.location.href = "./tabla_usuarios.html";
      return;
    }

    const res = await fetch(`${API_URL}/usuarios/${id}`);
    if (!res.ok) throw new Error("Error al obtener usuario.");

    const data = await res.json();

    // ✅ Asignar valores
    inputId.value = data.id;
    nombre.value = data.nombre || "";
    apellido.value = data.apellido || "";
    email.value = data.email || "";
    password.value = data.password || "";
    genero.value = data.genero || "";

    if (data.nacimiento) {
      const fecha = new Date(data.nacimiento);
      nacimiento.value = !isNaN(fecha) ? fecha.toISOString().split("T")[0] : "";
    } else {
      nacimiento.value = "";
    }

  } catch (err) {
    console.error("❌ Error al cargar usuario:", err);
    alert("No se pudo cargar la información del usuario.");
    window.location.href = "./tabla_usuarios.html";
  }
}

document.addEventListener("DOMContentLoaded", cargarUsuario);

////////////////////////////////////////agragado de prueba 

document.addEventListener("DOMContentLoaded", async () => {
  console.log("📥 Iniciando carga de usuario...");
  console.log("🆔 ID obtenido de la URL:", id);

  if (!id) {
    alert("No se proporcionó un ID válido.");
    window.location.href = "./tabla_usuarios.html";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/usuarios/${id}`);
    console.log("🌐 Fetch URL:", `${API_URL}/usuarios/${id}`);
    if (!res.ok) throw new Error("Error al obtener usuario");

    const data = await res.json();
    console.log("📦 Datos recibidos del backend:", data);

    document.getElementById("id").value = data.id;
    document.getElementById("nombre").value = data.nombre || "";
    document.getElementById("apellido").value = data.apellido || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("password").value = data.password || "";
    document.getElementById("genero").value = data.genero || "";

    if (data.nacimiento) {
      const fecha = new Date(data.nacimiento);
      document.getElementById("nacimiento").value = !isNaN(fecha)
        ? fecha.toISOString().split("T")[0]
        : "";
    } else {
      document.getElementById("nacimiento").value = "";
    }

  } catch (err) {
    console.error("❌ Error al cargar usuario:", err);
    alert("Error al cargar datos del usuario");
  }
});

