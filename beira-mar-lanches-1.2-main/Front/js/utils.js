
const cart = []

function formatCategoryName(category) {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

function getCurrentTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  if (window.cartModal) {
    window.cartModal.updateCart()
  }
}

function selectCategory(category) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active")
  })
  document.querySelector(`[data-category="${category}"]`).classList.add("active")

  if (window.productsSection) {
    window.productsSection.displayProducts(category)
  }
}

// Adicionar event listeners para os itens de navegação
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault()
      const category = item.dataset.category
      selectCategory(category)
    })
  })
})
