class OrderStatus {
  constructor() {
    this.orderStatusButton = document.getElementById("orderStatusButton")
    this.statusIndicator = document.getElementById("statusIndicator")
    this.orderStatusModal = document.getElementById("orderStatusModal")
    this.closeOrderStatus = document.getElementById("closeOrderStatus")
    this.orderNumber = document.getElementById("orderNumber")
    this.orderItemsList = document.getElementById("orderItemsList")
    this.orderTotalAmount = document.getElementById("orderTotalAmount")
    this.statusReceived = document.getElementById("statusReceived")
    this.statusPreparing = document.getElementById("statusPreparing")
    this.statusReady = document.getElementById("statusReady")
    this.timeReceived = document.getElementById("timeReceived")
    this.timePreparing = document.getElementById("timePreparing")
    this.timeReady = document.getElementById("timeReady")

    this.currentOrder = null
    this.orderStatus = ""

    this.init()
  }

  init() {
    this.orderStatusButton.addEventListener("click", () => {
      this.showOrderStatus()
    })

    this.closeOrderStatus.addEventListener("click", () => {
      this.orderStatusModal.classList.remove("active")
    })
  }

  createOrder() {
    // Gerar número de pedido aleatório
    const orderNum = Math.floor(1000 + Math.random() * 9000)

    // Calcular total do pedido
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Criar objeto de pedido
    this.currentOrder = {
      number: orderNum,
      items: [...cart],
      total: total,
      status: "received",
      timestamps: {
        received: this.getCurrentTime(),
        preparing: null,
        ready: null,
      },
    }

    // Atualizar interface com o novo pedido
    this.updateOrderStatus("received")

    // Mostrar botão de status do pedido
    this.orderStatusButton.classList.add("active")

    // Simular mudanças de status
    this.simulateOrderProgress()
  }

  updateOrderStatus(status) {
    if (!this.currentOrder) return

    this.orderStatus = status
    this.currentOrder.status = status

    // Atualizar indicador visual
    this.statusIndicator.className = "status-indicator " + status

    // Atualizar timeline de status
    this.statusReceived.className = "status-step completed"
    this.statusPreparing.className = "status-step"
    this.statusReady.className = "status-step"

    if (status === "preparing" || status === "ready") {
      this.statusPreparing.className = "status-step completed"
      if (status === "preparing") {
        this.statusPreparing.classList.add("active")
      }
    }

    if (status === "ready") {
      this.statusReady.className = "status-step completed active"
    }

    // Atualizar timestamps
    if (status === "preparing" && !this.currentOrder.timestamps.preparing) {
      this.currentOrder.timestamps.preparing = this.getCurrentTime()
      this.timePreparing.textContent = this.currentOrder.timestamps.preparing
    }

    if (status === "ready" && !this.currentOrder.timestamps.ready) {
      this.currentOrder.timestamps.ready = this.getCurrentTime()
      this.timeReady.textContent = this.currentOrder.timestamps.ready
    }
  }

  showOrderStatus() {
    if (!this.currentOrder) return

    // Preencher informações do pedido
    this.orderNumber.textContent = this.currentOrder.number
    this.timeReceived.textContent = this.currentOrder.timestamps.received
    this.timePreparing.textContent = this.currentOrder.timestamps.preparing || "--:--"
    this.timeReady.textContent = this.currentOrder.timestamps.ready || "--:--"

    // Preencher itens do pedido
    this.orderItemsList.innerHTML = ""
    this.currentOrder.items.forEach((item) => {
      const orderItem = document.createElement("div")
      orderItem.className = "order-item"
      orderItem.innerHTML = `
        <span class="order-item-name">${item.name}</span>
        <span class="order-item-quantity">x${item.quantity}</span>
      `
      this.orderItemsList.appendChild(orderItem)
    })

    // Preencher total
    this.orderTotalAmount.textContent = `R$ ${this.currentOrder.total.toFixed(2)}`

    // Mostrar modal
    this.orderStatusModal.classList.add("active")
  }

  simulateOrderProgress() {
    // Simular mudança para "Preparando" após 5 segundos
    setTimeout(() => {
      this.updateOrderStatus("preparing")

      // Simular mudança para "Pronto" após mais 10 segundos
      setTimeout(() => {
        this.updateOrderStatus("ready")

        // Notificação de pedido pronto
        this.showReadyNotification()
      }, 10000) // 10 segundos para ficar pronto
    }, 5000) // 5 segundos para começar a preparar
  }

  showReadyNotification() {
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.textContent = "Seu pedido está pronto para retirada!"
    notification.style.position = "fixed"
    notification.style.bottom = "20px"
    notification.style.right = "20px"
    notification.style.backgroundColor = "#10b981"
    notification.style.color = "white"
    notification.style.padding = "10px 20px"
    notification.style.borderRadius = "5px"
    notification.style.zIndex = "1000"
    notification.style.boxShadow = "var(--shadow)"
    notification.style.animation = "fadeInOut 4s forwards"

    document.body.appendChild(notification)

    setTimeout(() => {
      document.body.removeChild(notification)
    }, 4000)
  }

  getCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }
}

// Mock cart data for demonstration purposes
const cart = [
  { name: "Item 1", price: 10, quantity: 2 },
  { name: "Item 2", price: 5, quantity: 1 },
]
