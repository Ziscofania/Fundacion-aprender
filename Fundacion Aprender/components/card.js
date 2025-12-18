function ProductCard({ id, nombre, precio, img, cat, vela }) {
  return `
    <article class="product-card" data-cat="${cat}">
      <div class="product-image">
        <img src="${img}" alt="${nombre}">
      </div>

      <div class="product-info">
        <h4>${nombre}</h4>
        <p class="price">$${precio.toLocaleString()}</p>
      </div>

      <button 
        class="btn-primary"
        onclick="${vela ? 'openVela()' : `openPago(${id})`}"
      >
        Agregar
      </button>
    </article>
  `;
}
