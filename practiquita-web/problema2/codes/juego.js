document.addEventListener("DOMContentLoaded", function() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
        alert("No se encontró la información del usuario.");
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('nombreJugador').textContent = usuario.nombre;
    document.getElementById('montoDisponible').textContent = formatCurrency(usuario.Monto);

    for (let i = 1; i <= usuario.CantidadDados; i++) {
        document.getElementById(`dado${i}Container`).style.display = 'block';
    }

    for (let i = usuario.CantidadDados + 1; i <= 3; i++) {
        document.getElementById(`dado${i}Container`).style.display = 'none';
    }

    if (usuario.CantidadDados === 2) {
        document.getElementById("numeroElegido").max = 12;
    } else if (usuario.CantidadDados === 3) {
        document.getElementById("numeroElegido").max = 18;
    }

    document.getElementById("btnApostar").addEventListener("click", apostar);
    document.getElementById("btnElegirNumero").addEventListener("click", elegirNumero);
    document.getElementById("btnJugar").addEventListener("click", jugar);
});

function apostar() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    var montoApostar = parseInt(document.getElementById("montoApostar").value, 10);
    if (isNaN(montoApostar) || montoApostar <= 0) {
        document.getElementById("resultado").textContent = "Por favor ingresa un monto válido para apostar.";
        return;
    }
    var montoActual = parseInt(usuario.Monto);

    if (montoApostar > montoActual) {
        document.getElementById("resultado").textContent = "El monto a apostar no puede ser mayor que el monto disponible.";
    } else {
        usuario.Monto -= montoApostar;
        usuario.montoApostado = montoApostar;
        localStorage.setItem("usuario", JSON.stringify(usuario));
        document.getElementById("montoDisponible").textContent = formatCurrency(usuario.Monto);
        document.getElementById("resultado").textContent = "Apuesta realizada. Elije un número y presiona Jugar.";
    }
}

function elegirNumero() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    var numElegido = parseInt(document.getElementById("numeroElegido").value, 10);
    if (isNaN(numElegido) || numElegido < parseInt(document.getElementById("numeroElegido").min) || numElegido > parseInt(document.getElementById("numeroElegido").max)) {
        document.getElementById("resultado").textContent = "Por favor ingresa un número válido para apostar.";
        return;
    }
    usuario.numeroApostado = numElegido;
    localStorage.setItem("usuario", JSON.stringify(usuario));
    document.getElementById("resultado").textContent = "Número elegido correctamente. Presiona Jugar.";
    document.getElementById("btnJugar").style.display = 'block';
}

function jugar() {
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    let cantidadDados = usuario.CantidadDados;
    let sumaDados = 0;

    for (let i = 1; i <= cantidadDados; i++) {
        let resultadoDado = Math.floor(Math.random() * 6) + 1;
        sumaDados += resultadoDado;
        let dadoImage = document.getElementById(`dado${i}Container`).querySelector('.dadoImg');
        dadoImage.src = `img/cara${resultadoDado}.png`;
        dadoImage.alt = `Dado ${i} cara ${resultadoDado}`;
    }

    let imgResultado = document.getElementById("imgResultado");
    let resultadoTexto = `Dado(s) lanzado(s). Resultado total: ${sumaDados}. `;
    if (sumaDados === usuario.numeroApostado) {
        usuario.Monto += usuario.montoApostado * 2;
        resultadoTexto += "¡Has ganado!";
        imgResultado.src = "img/ganar.jpg";
        imgResultado.alt = "Ganaste";
    } else {
        resultadoTexto += "Has perdido, mejor suerte la próxima vez.";
        imgResultado.src = "img/perder.jpg";
        imgResultado.alt = "Perdiste";
    }
    imgResultado.style.display = 'block';

    document.getElementById("resultado").textContent = resultadoTexto;
    document.getElementById("montoDisponible").textContent = formatCurrency(usuario.Monto);
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

function formatCurrency(value) {
    return '₡ ' + value.toLocaleString();
}
