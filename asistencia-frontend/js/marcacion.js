// Reloj en tiempo real
const reloj = document.getElementById("reloj");

setInterval(() => {
    const ahora = new Date();
    reloj.textContent = ahora.toLocaleTimeString('es-PE');
}, 1000);

function mostrarToast(mensaje, tipo = 'exito') {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.className = ''; // limpia clases previas
    toast.classList.add('visible', tipo);

    setTimeout(() => {
        toast.classList.remove('visible', tipo);
    }, 3000);
}

// Función principal de marcación
function marcarAsistencia() {
    const dniInput = document.getElementById("dni");
    const mensaje = document.getElementById("mensaje");
    const dni = dniInput.value.trim();

    // Validación básica
    if (dni.length !== 8 || isNaN(dni)) {
        mostrarToast(data.mensaje, 'éxito'); //mensaje.textContent = "DNI inválido. Debe tener 8 dígitos.";
        mensaje.style.color = "red";
        return;
    }

    // Envío al backend
    fetch('http://localhost:3000/api/marcar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dni })
    })
    .then(response => response.json())
    .then(data => {
        mensaje.textContent = data.mensaje;
        mensaje.style.color = "green";
        dniInput.value = "";
    })
    .catch(error => {
        console.error("Error de conexión:", error);
        mostrarToast("No se pudo conectar al servidor.", 'error'); //mensaje.textContent = "No se pudo conectar al servidor.";
        mensaje.style.color = "red";
    });
}
