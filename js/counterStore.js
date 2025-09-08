// /js/counterStore.js
const fechaFinal = new Date('2025-09-17T00:00:00');
const diasEl = document.getElementById('dias');
const horasEl = document.getElementById('horas');
const minutosEl = document.getElementById('minutos');
const segundosEl = document.getElementById('segundos');

function actualizarContador() {
    const ahora = new Date();
    const diferencia = fechaFinal - ahora;

    if (diferencia <= 0) {
        diasEl.textContent = '0';
        horasEl.textContent = '0';
        minutosEl.textContent = '0';
        segundosEl.textContent = '0';
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    diasEl.textContent = dias;
    horasEl.textContent = horas;
    minutosEl.textContent = minutos;
    segundosEl.textContent = segundos;
}

actualizarContador();
setInterval(actualizarContador, 1000);