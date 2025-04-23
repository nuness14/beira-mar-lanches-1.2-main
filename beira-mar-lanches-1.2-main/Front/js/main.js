// Variáveis globais
const cart = []
const currentOrder = null

// Classes simplificadas para inicialização
class WelcomeScreen {
  constructor() {
    this.welcomeScreen = document.getElementById("welcomeScreen")
    this.startButton = document.getElementById("startButton")
    this.init()
  }

  init() {
    this.startButton.addEventListener("click", () => {
      this.welcomeScreen.classList.add("hidden")
    })
  }
}

class CartModal {
  constructor() {
    this.cartModal = document.getElementById("cartModal")
    this.closeCart = document.getElementById("closeCart")
    this.cartButton = document.getElementById("cartButton")
    this.cartItemsList = document.getElementById("cartItemsList")
    this.cartTotal = document.getElementById("cartTotal")
    this.cartCount = document.getElementById("cartCount")
    this.checkoutButton = document.getElementById("checkoutButton")
    this.init()
  }

  init() {
    this.cartButton.addEventListener("click", () => {
      this.cartModal.classList.add("active")
      this.updateCart()
    })

    this.closeCart.addEventListener("click", () => {
      this.cartModal.classList.remove("active")
    })
  }

  updateCart() {
    // Implementação simplificada
    this.cartCount.textContent = cart.length
  }
}

class ProductsSection {
  constructor() {
    this.productsTitle = document.getElementById("productsTitle")
    this.productsGrid = document.getElementById("productsGrid")
    this.displayProducts("destaques")
  }

  displayProducts(category) {
    // Implementação simplificada
    this.productsGrid.innerHTML = ""
    if (window.products && window.products[category]) {
      window.products[category].forEach((product) => {
        const card = document.createElement("div")
        card.className = "product-card"
        card.innerHTML = `
          <div class="product-image-container">
            <img src="${product.image || "placeholder.svg"}" alt="${product.name}" class="product-image">
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">R$ ${product.price.toFixed(2)}</p>
            <button class="add-to-cart">
              Adicionar ao Carrinho
            </button>
          </div>
        `
        this.productsGrid.appendChild(card)
      })
    }
  }
}

// Inicialização dos componentes
document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = new WelcomeScreen()
  const cartModal = new CartModal()
  const productsSection = new ProductsSection()

  // Expor para uso global
  window.cartModal = cartModal
  window.productsSection = productsSection
})
