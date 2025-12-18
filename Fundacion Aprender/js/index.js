// ================= PRODUCTOS =================
const productos = [
  { id: 1, nombre: 'Vela artesanal base', cat: 'velas', precio: 8000, img: '/Fundacion Aprender/assets/WhatsApp Image 2025-12-17 at 9.17.16 PM.jpeg', vela: true },
  { id: 2, nombre: 'Pulsera artesanal', cat: 'pulseras', precio: 5000, img: '/Fundacion Aprender/assets/WhatsApp Image 2025-12-17 at 9.17.07 PM.jpeg' },
  { id: 3, nombre: 'Artesanía en madera', cat: 'maderas', precio: 12000, img: '/Fundacion Aprender/assets/WhatsApp Image 2025-12-17 at 9.17.08 PM.jpeg' },
  { id: 4, nombre: 'Cuadro decorativo', cat: 'cuadros', precio: 20000, img: '/Fundacion Aprender/assets/WhatsApp Image 2025-12-17 at 9.17.09 PM.jpeg' },
  { id: 5, nombre: 'Perfume artesanal', cat: 'perfumes', precio: 15000, img: '/Fundacion Aprender/assets/WhatsApp Image 2025-12-17 at 9.17.13 PM.jpeg' },
  { id: 6, nombre: 'Collar', cat: 'collares', precio: 6000, img: '/Fundacion Aprender/assets/WhatsApp Image 2025-12-17 at 9.17.14 PM.jpeg' },
  { id: 7, nombre: 'Aretes', cat: 'aretes', precio: 4000, img: '/Fundacion Aprender/assets/WhatsApp Image 2025-12-17 at 9.17.15 PM.jpeg' },
  { id: 8, nombre: 'Pulsera', cat: 'pulseras', precio: 5000, img: '/Fundacion Aprender/assets/WhatsApp Image 2025-12-17 at 9.17.16 PM.jpeg' }
];

// ================= ESTADO =================
let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
let velaConfig = { envase: null, esencia: null };

// ================= NAVEGACIÓN =================
function showSection(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}

// ================= CATÁLOGO =================
function renderCatalogo(lista) {
  const grid = document.getElementById('catalogoGrid');
  grid.innerHTML = '';

  lista.forEach(p => {
    grid.innerHTML += `
      <article class="product-card">
        <img src="${p.img}">
        <h4>${p.nombre}</h4>
        <p class="price">$${p.precio}</p>
        ${
          p.vela
            ? `<button onclick="openVela()">Personalizar</button>`
            : `<button onclick="addVenta(${p.id})">Agregar</button>`
        }
      </article>
    `;
  });
}

function filterCat(cat) {
  if (cat === 'all') {
    renderCatalogo(productos);
  } else {
    renderCatalogo(productos.filter(p => p.cat === cat));
  }
}

// ================= VENTAS =================
function addVenta(id) {
  const p = productos.find(x => x.id === id);
  ventas.push({
    nombre: p.nombre,
    cat: p.cat,
    cant: 1,
    precio: p.precio,
    total: p.precio
  });
  saveVentas();
}

function saveVentas() {
  localStorage.setItem('ventas', JSON.stringify(ventas));
  renderVentas();
}

function renderVentas() {
  const tbody = document.querySelector('#tablaVentas tbody');
  tbody.innerHTML = '';

  ventas.forEach((v, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${v.nombre}</td>
        <td>${v.cat}</td>
        <td>${v.cant}</td>
        <td>$${v.precio}</td>
        <td>$${v.total}</td>
        <td><button onclick="delVenta(${i})">X</button></td>
      </tr>
    `;
  });
}

function delVenta(i) {
  ventas.splice(i, 1);
  saveVentas();
}

// ================= VELAS =================
function openVela() {
  velaConfig = { envase: null, esencia: null };
  document.getElementById('velaModal').style.display = 'flex';
  loadOptions();
}

function loadOptions() {
  const envasesList = ['pescera', 'whisky', 'cilindro', 'comun'];
  const esenciasList = ['chicle', 'citrus', 'patchouli', 'sandalo', 'lavanda', 'vainilla', 'durazno'];

  const envasesDiv = document.getElementById('envases');
  const esenciasDiv = document.getElementById('esencias');

  envasesDiv.innerHTML = '';
  esenciasDiv.innerHTML = '';

  envasesList.forEach(e => {
    envasesDiv.innerHTML += `<button onclick="selectOpt('envase','${e}',this)">${e}</button>`;
  });

  esenciasList.forEach(e => {
    esenciasDiv.innerHTML += `<button onclick="selectOpt('esencia','${e}',this)">${e}</button>`;
  });
}

function selectOpt(tipo, valor, el) {
  velaConfig[tipo] = valor;
  el.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function addVela() {
  if (!velaConfig.envase || !velaConfig.esencia) {
    alert('Selecciona envase y esencia');
    return;
  }

  const precio = 10000;

  ventas.push({
    nombre: `Vela ${velaConfig.envase} ${velaConfig.esencia}`,
    cat: 'velas',
    cant: 1,
    precio: precio,
    total: precio
  });

  saveVentas();
  document.getElementById('velaModal').style.display = 'none';
}

// ================= EXPORTAR =================
function exportExcel() {
  let csv = 'Producto,Categoría,Cantidad,Precio,Total\n';
  let total = 0;

  ventas.forEach(v => {
    csv += `${v.nombre},${v.cat},${v.cant},${v.precio},${v.total}\n`;
    total += v.total;
  });

  csv += `,,,TOTAL,${total}`;

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `ventas_${new Date().toLocaleDateString()}.csv`;
  a.click();
}

// ================= INIT =================
renderCatalogo(productos);
renderVentas();
