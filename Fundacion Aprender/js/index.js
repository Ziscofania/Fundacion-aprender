// =================================================
// PRODUCTOS
// =================================================
const productos = [

  { id: 1, nombre: 'Vela artesanal pequeña', cat: 'velas', precio: 12000, img: '/Fundacion Aprender/assets/vela pequeña.png' },
  { id: 2, nombre: 'Vela artesanal alta', cat: 'velas', precio: 18000, img: '/Fundacion Aprender/assets/vela alta decorativa.jpeg' },
  { id: 3, nombre: 'Vela con base', cat: 'velas', precio: 20000, img: '/Fundacion Aprender/assets/vela con base.jpeg' },
  { id: 4, nombre: 'Vela con corcho', cat: 'velas', precio: 22000, img: '/Fundacion Aprender/assets/vela con corcho.jpeg' },
  { id: 5, nombre: 'Vela con tapón', cat: 'velas', precio: 22000, img: '/Fundacion Aprender/assets/vela con tapon.jpeg' },
  { id: 6, nombre: 'Vela en envase de vidrio', cat: 'velas', precio: 25000, img: '/Fundacion Aprender/assets/vela en envase de vidrio.jpeg' },
  { id: 7, nombre: 'Vela de barril', cat: 'velas', precio: 28000, img: '/Fundacion Aprender/assets/vela de barril.jpeg' },
  { id: 8, nombre: 'Vela de cilindro', cat: 'velas', precio: 24000, img: '/Fundacion Aprender/assets/vela de cilindro.jpeg' },
  { id: 9, nombre: 'Vela de cera completa', cat: 'velas', precio: 26000, img: '/Fundacion Aprender/assets/vela de cera completa.jpeg' },
  { id: 10, nombre: 'Vela pesquera grande', cat: 'velas', precio: 30000, img: '/Fundacion Aprender/assets/vela pescera grande.jpeg' },

  { id: 11, nombre: 'Pulsera artesanal', cat: 'pulseras', precio: 15000, img: '/Fundacion Aprender/assets/pulseras.jpeg' },
  { id: 12, nombre: 'Collar artesanal', cat: 'collares', precio: 22000, img: '/Fundacion Aprender/assets/Bisuteria.jpeg' },
  { id: 13, nombre: 'Aretes artesanales', cat: 'aretes', precio: 12000, img: '/Fundacion Aprender/assets/figuras.jpeg' },

  { id: 14, nombre: 'Adornos de madera', cat: 'maderas', precio: 20000, img: '/Fundacion Aprender/assets/adornos de maderas armables.jpeg' },
  { id: 15, nombre: 'Caja de madera pequeña', cat: 'maderas', precio: 18000, img: '/Fundacion Aprender/assets/caja de madera pequeña.jpeg' },
  { id: 16, nombre: 'Caja de madera estándar', cat: 'maderas', precio: 22000, img: '/Fundacion Aprender/assets/caja de madera.jpeg' },
  { id: 17, nombre: 'Caja de madera tipo vino', cat: 'maderas', precio: 26000, img: '/Fundacion Aprender/assets/caja de madera de vino.jpeg' },
  { id: 18, nombre: 'Cajón de madera', cat: 'maderas', precio: 30000, img: '/Fundacion Aprender/assets/cajon de madera.jpeg' },
  { id: 19, nombre: 'Cajones pequeños de madera', cat: 'maderas', precio: 28000, img: '/Fundacion Aprender/assets/cajones pequeños de madera.jpeg' },

  { id: 20, nombre: 'Cuadro decorativo', cat: 'cuadros', precio: 35000, img: '/Fundacion Aprender/assets/Cuadro.jpeg' },

  // Nota: no existe "perfumes.jpeg" en assets; usar imagen disponible como fallback
  { id: 21, nombre: 'Perfume artesanal', cat: 'perfumes', precio: 45000, img: '/Fundacion Aprender/assets/Bisuteria.jpeg' },

  { id: 22, nombre: 'Envase de barril mediano', cat: 'velas', precio: 15000, img: '/Fundacion Aprender/assets/envase de barril mediano.jpeg' },
  { id: 23, nombre: 'Envase de barril pequeño', cat: 'velas', precio: 12000, img: '/Fundacion Aprender/assets/envase de barril pequeño.jpeg' },
  { id: 24, nombre: 'Envase para vela', cat: 'velas', precio: 10000, img: '/Fundacion Aprender/assets/envase de vela.jpeg' }

];


// =================================================
// CONFIGURACIÓN VELAS
// =================================================
const envases = {
  pescera: 5000,
  whisky: 8000,
  cilindro: 6000,
  comun: 0
};

const esencias = {
  chicle: 3000,
  citrus: 3000,
  patchouli: 4000,
  sandalo: 4000,
  lavanda: 3000,
  vainilla: 3000,
  durazno: 3500
};

let velaConfig = { envase: null, esencia: null };

// =================================================
// ESTADO
// =================================================
let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
let tipoPagoActual = 'efectivo';

// =================================================
// NAVEGACIÓN
// =================================================
function showSection(id, btn) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// =================================================
// CATÁLOGO
// =================================================
function renderCatalogo(lista = productos) {
  const grid = document.getElementById('catalogoGrid');
  grid.innerHTML = '';

  lista.forEach(p => {
    grid.innerHTML += `
      <article class="product-card">
        <img src="${p.img}" alt="${p.nombre}">
        <h4>${p.nombre}</h4>
        <p class="price">$${p.precio.toLocaleString('es-CO')}</p>
        <button onclick="addProduct(${p.id})">Agregar</button>
      </article>
    `;
  });
}

function filterCat(cat) {
  if (cat === 'all') renderCatalogo(productos);
  else renderCatalogo(productos.filter(p => p.cat === cat));
}

// =================================================
// AGREGAR PRODUCTO (FIX CLAVE)
// =================================================
function addProduct(id) {
  const p = productos.find(prod => prod.id === id);
  if (!p) return;

  ventas.push({
    nombre: p.nombre,
    cat: p.cat,
    cant: 1,
    precio: p.precio,
    total: p.precio,
    pago: tipoPagoActual,
    fecha: new Date().toLocaleString()
  });

  saveVentas();
  showToast(`✔ ${p.nombre} agregado`);
}

// =================================================
// VENTAS
// =================================================
function saveVentas() {
  localStorage.setItem('ventas', JSON.stringify(ventas));
  renderVentas();
}

function renderVentas() {
  const tbody = document.querySelector('#tablaVentas tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  ventas.forEach((v, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${v.nombre}</td>
        <td>${v.cat}</td>
        <td>${v.cant}</td>
        <td>$${v.precio.toLocaleString()}</td>
        <td>$${v.total.toLocaleString()}</td>
        <td>${v.pago}</td>
        <td>${v.fecha}</td>
        <td><button onclick="delVenta(${i})">X</button></td>
      </tr>
    `;
  });
}

function delVenta(i) {
  ventas.splice(i, 1);
  saveVentas();
}

// =================================================
// TOAST / NOTIFICACIÓN
// =================================================
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = msg;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// =================================================
// EXPORTAR CSV
// =================================================
function exportExcel() {
  let csv = 'Producto,Categoría,Cantidad,Precio,Total,Pago,Fecha\n';
  let total = 0;

  ventas.forEach(v => {
    csv += `${v.nombre},${v.cat},${v.cant},${v.precio},${v.total},${v.pago},${v.fecha}\n`;
    total += v.total;
  });

  csv += `,,,,TOTAL,${total}`;

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `ventas_${new Date().toLocaleDateString()}.csv`;
  a.click();
}

// =================================================
// INIT
// =================================================
renderCatalogo();
renderVentas();
