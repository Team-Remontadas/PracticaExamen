// Declaración de variables locales relacionadas con interface HTML
var btnGuardar = document.getElementById("btnGuardar");
var btnMostrar = document.getElementById("btnMostrar");
var txtNomb = document.getElementById("txtNomb");
var txtFechaNac = document.getElementById("txtFechaNac");
var txtMonto = document.getElementById("txtMonto");
var radiosDados = document.getElementsByName("txtCantDados");
var resultados = document.getElementById("Datos");

// Declara lista de datos
var lista = [];

// Función para validar la edad
function validarEdad(anioNacimiento) {
    var anioActual = new Date().getFullYear();
    return anioActual - anioNacimiento;
}


// Programación de evento botón guardar
btnGuardar.addEventListener("click", function() {
    var anioNacimiento = parseInt(document.getElementById('txtFechaNac').value, 10);
    if (validarEdad(anioNacimiento) < 21) {
        alert('no bro esta muy chamaco todavia, debes tener al menos 21 años para jugar.');
        setTimeout(function() {
            window.location.reload(); // redirige a la página inicial.
        }, 5000);
        return;
    }

    //hecho por un sabio
    var cantidadDadosSeleccionada = Array.from(radiosDados).find(radio => radio.checked)?.value;

    var usuario = {
        "nombre": txtNomb.value,
        "FechaNac": anioNacimiento,
        "Monto": txtMonto.value,
        "Cantidad Dados": cantidadDadosSeleccionada
    };

    lista.push(usuario);
    localStorage.setItem("lista", JSON.stringify(lista));

    // aqui se limpian los campos
    txtNomb.value = "";
    txtFechaNac.value = ""; 
    txtMonto.value = "";
    if (cantidadDadosSeleccionada) { // esta parte la hizo un sabio
        document.querySelector(`input[name="txtCantDados"][value="${cantidadDadosSeleccionada}"]`).checked = false;
    }

    txtNomb.focus();
});


// Programación de evento botón mostrar
btnMostrar.addEventListener("click", function() {
    var lst = JSON.parse(localStorage.getItem("lista"));
    var salida = "<h3>Datos Recuperados</h3>";

    if (lst) {
        for (var i = 0; i < lst.length; i++) {
            salida += "<p>Nombre: " + lst[i].nombre + "</p>" +
                      "<p>Fecha de Nacimiento: " + lst[i].FechaNac + "</p>" +
                      "<p>Monto a apostar: " + lst[i].Monto + "</p>" +
                      "<p>Cantidad de Dados: " + lst[i]['Cantidad Dados'] + "</p>" + // Corrección aquí
                      "<hr>";
        }
    } else {
        salida = "<p>No hay datos almacenados.</p>";
    }

    resultados.innerHTML = salida;
});

function limpiarTodo() {
    localStorage.clear();
}

function eliminarItem() {
    localStorage.removeItem("lista");
}
