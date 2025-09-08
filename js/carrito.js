// ---------------------------
// CARRITO
// ---------------------------
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id, nombre, precio) {
  let producto = carrito.find(p => p.id === id);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(nombre + " agregado al carrito 🛒");
}

function mostrarCarrito() {
  let lista = document.getElementById("lista-carrito");
  let total = document.getElementById("total");
  if (!lista) return;

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((p, index) => {
    let subtotal = p.precio * p.cantidad;
    suma += subtotal;
    lista.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td>${p.cantidad}</td>
        <td>$${subtotal}</td>
        <td><button onclick="eliminar(${index})">Eliminar</button></td>
      </tr>
    `;
  });

  total.innerText = "Total: $" + suma;
}

function eliminar(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function finalizarCompra() {
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) {
    alert("⚠ Debes registrarte antes de finalizar la compra.");
    window.location.href = "index.html";
    return;
  }

  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  let resumenDiv = document.getElementById("resumen-compra");
  let total = 0;
  let html = `<h2>✅ Compra Exitosa</h2>`;
  html += `<h3>Productos Comprados:</h3><ul>`;
  carrito.forEach(p => {
    let subtotal = p.precio * p.cantidad;
    total += subtotal;
    html += `<li>${p.nombre} x ${p.cantidad} - $${subtotal}</li>`;
  });
  html += `</ul><h3>Total: $${total}</h3>`;
  html += `<h3>Datos del Usuario:</h3>`;
  html += `<p>${usuario.nombre} ${usuario.apellido}</p>`;
  html += `<p>${usuario.correo}</p>`;
  html += `<p>${usuario.direccion}, ${usuario.comuna}, ${usuario.region}</p>`;

  resumenDiv.innerHTML = html;

  // Limpiar carrito
  carrito = [];
  localStorage.removeItem("carrito");
}

mostrarCarrito();
