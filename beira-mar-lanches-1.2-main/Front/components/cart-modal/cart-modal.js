import { cart } from "../../cart.js"
import { waitingScreen } from "../../waiting-screen.js"

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

    this.checkoutButton.addEventListener("click", () => {
      if (cart.length > 0) {
        this.cartModal.classList.remove("active")
        waitingScreen.show()
      }
    })
  }

  updateCart() {
    this.cartItemsList.innerHTML = ""
    let total = 0

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity
      total += itemTotal

      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
      cartItem.innerHTML = `
        <img src="${item.image || "/placeholder.svg"}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="quantity-button" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-button" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </div>
        <button class="remove-item" onclick="removeItem(${item.id})" style="background: none; border: none; color: #ff6b6b; cursor: pointer; margin-left: auto;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      `
      this.cartItemsList.appendChild(cartItem)
    })

    this.cartTotal.textContent = `R$ ${total.toFixed(2)}`
    this.cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0)

    // Atualiza o botão do carrinho
    if (cart.length > 0) {
      this.cartButton.classList.add("has-items")
    } else {
      this.cartButton.classList.remove("has-items")
    }
  }
}
