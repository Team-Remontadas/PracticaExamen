// Función para generar la factura basada en los platos seleccionados
function generarFactura() {
    // Obtención de elementos del formulario y la sección de factura del DOM
    var form = document.getElementById('platosForm');
    var factura = document.getElementById('factura');
    var facturaBody = document.getElementById('facturaBody');
    var nombreCliente = document.getElementById('nombreCliente').value;

    // Limpiar el contenido anterior de la factura para evitar duplicaciones
    facturaBody.innerHTML = '';

    // Recuperar todos los checkboxes marcados que representan los platos seleccionados
    var platosSeleccionados = form.querySelectorAll('input[name="platoFuerte"]:checked');
    var totalGeneral = 0; // Inicializar el total general a 0

    // Iterar sobre cada plato seleccionado para calcular y añadir a la factura
    for (var i = 0; i < platosSeleccionados.length; i++) {
        var plato = platosSeleccionados[i];
        var precio = parseFloat(plato.getAttribute('data-precio')); // Obtener el precio del plato
        var iva = precio * 0.15; // Calcular el 15% de IVA del precio del plato
        var subtotal = precio + iva; // Sumar el precio del plato más el IVA para obtener el subtotal
        totalGeneral += subtotal; // Acumular el subtotal al total general

        // Crear una fila de tabla HTML con los detalles del plato y los costos calculados
        var row = '<tr>' +
                    '<td>' + nombreCliente + '</td>' +
                    '<td>' + plato.value + '</td>' +
                    '<td>$' + precio.toFixed(2) + '</td>' +
                    '<td>$' + iva.toFixed(2) + '</td>' +
                    '<td>$' + subtotal.toFixed(2) + '</td>' +
                    '<td>$' + totalGeneral.toFixed(2) + '</td>' +
                  '</tr>';
        facturaBody.innerHTML += row; // Añadir la fila al cuerpo de la factura
    }

    // Mostrar la sección de la factura si hay platos seleccionados, de lo contrario alertar al usuario
    if (platosSeleccionados.length > 0) {
        factura.style.display = 'block'; // Mostrar la factura
    } else {
        factura.style.display = 'none'; // Esconder la factura
        alert('Por favor, seleccione al menos un plato.'); // Alertar al usuario
    }
}
