// ===================================================
// ✅ Script: ingresar_usuarios.js (CRUD - Registrar Usuario)
// ===================================================

async function guardar() {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const nacimiento = document.getElementById("nacimiento").value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const genero = document.getElementById("genero").value.trim().toUpperCase();

    // 🔸 Validar campos obligatorios
    if (!nombre || !apellido || !email || !password) {
        alert("⚠️ Todos los campos obligatorios deben estar completos.");
        return;
    }

    // 🔸 Validar formato de correo
    if (!email.includes("@") || !email.includes(".")) {
        alert("⚠️ Ingresa un correo electrónico válido.");
        return;
    }

    const datos = {
        nombre,
        apellido,
        nacimiento,
        email,
        password,
        genero
    };

    console.log("📤 Enviando datos al backend:", datos);

    try {
        const response = await fetch("https://gymfit21.pythonanywhere.com/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        console.log("📩 Respuesta HTTP:", response.status);

        const data = await response.json();
        console.log("📦 Respuesta JSON:", data);

        if (response.ok) {
            alert("✅ Usuario registrado correctamente.");
            window.location.href = "./tabla_usuarios.html";
        } else if (response.status === 409) {
            alert("⚠️ Este correo ya está registrado.");
        } else if (response.status === 400) {
            alert("⚠️ Datos inválidos o incompletos. Verifique los campos.");
        } else {
            alert("❌ Error al registrar usuario: " + (data.error || "Desconocido"));
        }

    } catch (error) {
        console.error("❌ Error de conexión con el servidor:", error);
        alert("No se pudo conectar con el servidor.");
    }
}
