import { products } from "../../data/products.js"

class ProductsSection {
  constructor() {
    this.productsTitle = document.getElementById("productsTitle")
    this.productsGrid = document.getElementById("productsGrid")
  }

  setTitle(title) {
    this.productsTitle.textContent = title
  }

  displayProducts(category) {
    this.productsGrid.innerHTML = ""
    products[category].forEach((product) => {
      const productCard = this.createProductCard(product)
      this.productsGrid.appendChild(productCard)
    })
  }

  createProductCard(product) {
    const card = document.createElement("div")
    card.className = "product-card"

    let badgeHTML = ""
    if (product.badge) {
      badgeHTML = `<span class="product-badge" style="position: absolute; top: 10px; right: 10px; background-color: var(--primary); color: var(--dark); padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; z-index: 2;">${product.badge}</span>`
    }

    card.innerHTML = `
      ${badgeHTML}
      <div class="product-image-container" style="overflow: hidden;">
        <img src="${product.image || "/placeholder.svg"}" alt="${product.name}" class="product-image">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-price">R$ ${product.price.toFixed(2)}</p>
        <button class="add-to-cart" onclick="addToCart(${JSON.stringify(product).replace(/"/g, "&quot;")})">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          Adicionar ao Carrinho
        </button>
      </div>
    `
    return card
  }

  filterProducts(searchTerm) {
    if (searchTerm.trim() === "") {
      // Se a busca estiver vazia, volta para a categoria atual
      const activeCategory = document.querySelector(".nav-item.active").dataset.category
      this.displayProducts(activeCategory)
      return
    }

    const allProducts = Object.values(products).flat()
    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
    )

    this.productsGrid.innerHTML = ""
    this.productsTitle.textContent = `Resultados para: "${searchTerm}"`

    if (filtered.length === 0) {
      this.productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 1rem;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3 style="margin-bottom: 1rem; color: var(--primary);">Nenhum produto encontrado</h3>
          <p>Tente buscar por outro termo ou navegue pelas categorias.</p>
        </div>
      `
    } else {
      filtered.forEach((product) => {
        const productCard = this.createProductCard(product)
        this.productsGrid.appendChild(productCard)
      })
    }
  }
}
