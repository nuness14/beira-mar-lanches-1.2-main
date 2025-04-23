import { successModal } from "../success-modal/success-modal.js"
import { orderStatus } from "../../order-status/order-status.js"
import { cartModal } from "../cart-modal/cart-modal.js"

let cart = []

class WaitingScreen {
  constructor() {
    this.waitingScreen = document.getElementById("waitingScreen")
    this.progressFill = document.getElementById("progressFill")
    this.estimatedTime = document.getElementById("estimatedTime")
  }

  show() {
    this.waitingScreen.classList.add("active")

    let progress = 0
    const progressInterval = setInterval(() => {
      progress += 1
      this.progressFill.style.width = `${progress}%`

      if (progress >= 100) {
        clearInterval(progressInterval)
        this.waitingScreen.classList.remove("active")
        successModal.show()
        orderStatus.createOrder()
        cart = []
        cartModal.updateCart()
      }
    }, 150)
  }
}
