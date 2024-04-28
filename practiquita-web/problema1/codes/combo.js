// Precios de los platos fuertes y opciones adicionales
const precios = {
    plato_fuerte: {
        pollo: 8.50,
        costilla: 10.00,
        pescado: 9.75,
        beefsteak: 11.00
    },
    extras: {
        opcion1: 2.50, // Aros de Cebolla
        opcion2: 1.50, // Vinagreta
        opcion3: 1.75, // Verduras al vapor
        opcion4: 2.00, // Tortilla Casera
        opcion5: 1.25  // Puré nuestra tierra
    },
    bebidas: {
        bebida1: 1.50, // Gaseosa
        bebida2: 2.00, // Natural (500ml)
        bebida3: 1.25, // Café Negro
        bebida4: 1.75, // Café con leche
        bebida5: 0.75  // Agua (250ml)
    }
};

// Recuperar o inicializar lista de pedidos
var pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

// Función para calcular el total y guardar el pedido
function procesarPedido() {
    let total = 0;
    const nombreCliente = document.getElementById('txtNomb').value;

    // Asegurarse de que el nombre no esté vacío
    if (!nombreCliente) {
        alert('Por favor, ingresa el nombre del cliente.');
        return;
    }

    const platoFuerteSelect = document.getElementById('cmb1opciones');
    const platoFuerte = platoFuerteSelect.value;
    total += precios.plato_fuerte[platoFuerte];

    const extrasSeleccionados = [];
    document.querySelectorAll('.checkbox_div input[type="checkbox"]:checked').forEach(checkbox => {
        total += precios.extras[checkbox.id];
        extrasSeleccionados.push(checkbox.nextElementSibling.textContent.trim()); // Captura el texto junto al checkbox
    });

    const bebidaSeleccionada = document.querySelector('.combo3 input[type="radio"]:checked')?.nextElementSibling.textContent.trim() || '';
    total += precios.bebidas[bebidaSeleccionada];

    const pedido = {
        nombre: nombreCliente,
        platoFuerte: platoFuerte,
        extras: extrasSeleccionados,
        bebida: bebidaSeleccionada,
        total: total.toFixed(2)
    };

    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Muestra el total y redirige a la factura
    document.getElementById('Datos').innerText = `Total a pagar por ${nombreCliente}: $${total.toFixed(2)}`;
    window.location.href = 'factura.html'; // Redirige a la página de factura
}

// Añadir event listeners a los botones
document.getElementById('btnAceptar').addEventListener('click', procesarPedido);
document.getElementById('btnCancelar').addEventListener('click', function() {
    document.getElementById('Datos').innerText = 'Pedido cancelado.';
    document.getElementById('txtNomb').value = ''; // Limpiar nombre del cliente en cancelación
    // Limpiar todos los campos de entrada
    document.querySelectorAll('.checkbox_div input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.querySelectorAll('.combo3 input[type="radio"]').forEach(radio => radio.checked = false);
});

// Función para mostrar todos los pedidos
function mostrarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    let salida = '<h3>Pedidos Realizados</h3>';
    pedidos.forEach(pedido => {
        salida += `<p>Nombre: ${pedido.nombre}, Total: $${pedido.total}</p>`;
    });
    document.getElementById('Datos').innerHTML = salida;
}

// Funciones para manejar el LocalStorage
function limpiarPedidos() {
    localStorage.clear();
    alert('Todos los pedidos han sido eliminados.');
}

function eliminarUltimoPedido() {
    pedidos.pop();
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    mostrarPedidos();
}
