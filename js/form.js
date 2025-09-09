const datosPreInscritos = [];

function actualizarContador() {
    const contador = document.getElementById('contador-inscritos');
    if (contador) {
        contador.textContent = datosPreInscritos.length;
    }
}

function mostrarModal(mensaje) {
    let modal = document.getElementById('modal-validacion');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-validacion';
        modal.className = 'modal fade';
        modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content bg-dark text-white">
                <div class="modal-header">
                    <h5 class="modal-title">Atención</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" id="cerrar-modal"></button>
                </div>
                <div class="modal-body">
                    <p id="modal-mensaje"></p>
                </div>
            </div>
        </div>`;
        document.body.appendChild(modal);
    }
    document.getElementById('modal-mensaje').textContent = mensaje;
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Eliminar el modal del DOM al cerrarlo
    document.getElementById('cerrar-modal').onclick = () => {
        bsModal.hide();
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const campos = [
            {id: 'nombre', nombre: 'Nombre'},
            {id: 'apellido', nombre: 'Apellido'},
            {id: 'correo', nombre: 'Correo Electrónico'},
            {id: 'direccion', nombre: 'Dirección'},
            {id: 'region', nombre: 'Región'},
            {id: 'comuna', nombre: 'Comuna'}
        ];

        for (let campo of campos) {
            const valor = document.getElementById(campo.id).value.trim();
            if (!valor) {
                mostrarModal(`Falta ${campo.nombre}!`);
                return;
            }
        }

        // Si todos los campos están completos, guardar en el array
        const datos = {};
        campos.forEach(campo => {
            datos[campo.id] = document.getElementById(campo.id).value.trim();
        });
        datosPreInscritos.push(datos);

        actualizarContador();
        mostrarModal('¡Formulario enviado correctamente!');
        verificarEnvioGratis();
        form.reset();
    });
});




function mostrarMensajeEnvioGratis(esGratis) {
    const mensajeDiv = document.getElementById('mensaje-envio-gratis');
    if (esGratis) {
        mensajeDiv.textContent = '¡Tu envío es gratis en esta comuna!';
    } else {
        mensajeDiv.textContent = '';
    }
}

function verificarEnvioGratis() {
    const region = document.getElementById('region').value;
    const comuna = document.getElementById('comuna').value.trim().toLowerCase();
    const comunasGratis = ['ñuñoa', 'providencia', 'las condes', 'la reina', 'macul'];
    const esGratis = region === 'Región Metropolitana de Santiago' && comunasGratis.includes(comuna);
    mostrarMensajeEnvioGratis(esGratis);
}
