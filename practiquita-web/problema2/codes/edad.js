document.getElementById('btnVerificar').addEventListener('click', function() {
    var edad = document.getElementById('txtEdad').value;

    if (edad >= 21) {
        window.location.href = 'registro.html'; // Asegúrate de cambiar 'dadosJuego.html' a la URL correcta si es necesario
    } else {
        alert('Debes tener al menos 21 años para jugar.'); // Muestra una alerta de JavaScript
    }
});
