document.getElementById("btnAceptar").addEventListener("click", function() {
    var txtNomb = document.getElementById("txtNomb").value;
    var txtMonto = document.getElementById("txtMonto_Apostar").value;
    var radiosDados = document.getElementsByName("cantidadDados");
    var cantidadDadosSeleccionada = Array.from(radiosDados).find(radio => radio.checked)?.value; //esto si se necesitó ayuda xd

    // Crear el objeto usuario
    var usuario = {
        nombre: txtNomb,
        Monto: txtMonto,
        CantidadDados: cantidadDadosSeleccionada
    };

    // Almacenar datos en localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));
     window.location.href = 'juego.html'; 
    // Limpiar formulario
    document.getElementById("formita").reset();
    document.getElementById("txtNomb").focus();
});
