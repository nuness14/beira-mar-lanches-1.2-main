// Dados dos produtos
const products = {
    destaques: [
      {
        id: 1,
        name: "Beira-Fritas",
        price: 22.9,
        description: "500g de batatas super crocantes com molho especial da casa",
        image: "public/beirafritas.png",
        badge: "Mais Vendido",
      },
      {
        id: 2,
        name: "Beira-iscas",
        price: 18.9,
        description: "Iscas de peixe empanadas com limão e molho tártaro",
        image: "public/beiraiscas.png",
        badge: "Novo",
      },
      {
        id: 3,
        name: "Beira-siri",
        price: 32.9,
        description: "Casquinha de siri gratinada com queijo e ervas finas",
        image: "public/beirasiri.png",
      },
      {
        id: 4,
        name: "Beira-Lulas",
        price: 18.9,
        description: "Anéis de lula empanados com molho especial",
        image: "public/beiraulas.png",
        badge: "Promoção",
      },
    ],
    lanches: [
      {
        id: 5,
        name: "Beira-Salada",
        price: 29.9,
        description: "Pão, carne bovina 120g, alface, tomate e queijo cheddar",
        image: "lanches/beira-salad.png",
        badge: "Novo",
      },
      {
        id: 6,
        name: "Beira-Bacon",
        price: 26.9,
        description: "Pão, Frango 120g, alface, tomate, molho especial e queijo cheddar",
        image: "lanches/beira-bacon.png",
      },
      {
        id: 7,
        name: "Beira-Frango",
        price: 26.9,
        description: "Sanduche de peixe empanado com alface, tomate e tártaro",
        image: "lanches/beira-frango.png",
      },
      {
        id: 8,
        name: "Beira-Tudo",
        price: 26.9,
        description: "Pão, Carne bovina 120g, alface, tomate, bacon, picles, ovo e queijo cheddar",
        image: "lanches/beira-tudo.png",
      },
    ],
    bebidas: [
      {
        id: 9,
        name: "Refrigerante 350ml",
        price: 6.9,
        description: "Coca-Cola, Guaraná ou Sprite",
        image: "tomaveis/refri.png",
      },
      {
        id: 10,
        name: "Suco Natural",
        price: 9.9,
        description: "200ml de suco (polpa), laranja, limão, morango, abacaxi e maracujá",
        image: "tomaveis/suco.png",
      },
      {
        id: 11,
        name: "Chop Artezanal",
        price: 9.9,
        description: "200ml de suco (polpa), laranja, limão, morango, abacaxi e maracujá",
        image: "tomaveis/chop.png",
      },
    ],
    sobremesas: [
      {
        id: 11,
        name: "Beira-Brownie",
        price: 16.9,
        description: "Brownie de chocolate, com uma crosta crocante e uma massa macia e untuosa",
        image: "sobrermesas/brownie.png",
      },
      {
        id: 12,
        name: "Beira-Split",
        price: 12.9,
        description: "160g de banana, 200g de sorvete de creme com uma porção de chantilly",
        image: "sobrermesas/beira-split.png",
      },
      {
        id: 13,
        name: "Beira-Cake",
        price: 12.9,
        description: "150g de biscoito, acompanha cream cheese e baunilha seguida de morango",
        image: "sobrermesas/beira-cake.png",
        badge: "Tradicional",
      },
      {
        id: 14,
        name: "Beira-Limão",
        price: 12.9,
        description: "60g (uma fatia), possui raspas de limão opcional",
        image: "sobrermesas/beira-limao.png",
      },
    ],
  }
  

  const cart = []
  
  
  function formatCategoryName(category) {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }
  
  
  function addToCart(productId) {
   
    let product = null
    for (const category in products) {
      const found = products[category].find((p) => p.id === productId)
      if (found) {
        product = found
        break
      }
    }
  
    if (!product) return
  
   
    const existingItem = cart.find((item) => item.id === productId)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        ...product,
        quantity: 1,
      })
    }
  
  
    updateCartCount()
  

    showNotification("Item adicionado ao carrinho!")
  }
  

  function updateCartCount() {
    const cartCount = document.getElementById("cartCount")
    const count = cart.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = count
  }
  
 
  function showNotification(message) {
    const notification = document.createElement("div")
    notification.textContent = message
    notification.style.position = "fixed"
    notification.style.bottom = "20px"
    notification.style.right = "20px"
    notification.style.backgroundColor = "#f8b830"
    notification.style.color = "#1a1a1a"
    notification.style.padding = "10px 20px"
    notification.style.borderRadius = "5px"
    notification.style.zIndex = "1000"
    notification.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
  
    document.body.appendChild(notification)
  
   
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 2000)
  }
  

  function displayProducts(category) {
    const productsGrid = document.getElementById("productsGrid")
    const productsTitle = document.getElementById("productsTitle")
  
  
    productsTitle.textContent = formatCategoryName(category)

    productsGrid.innerHTML = ""
  
   
    products[category].forEach((product) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"
  
     
      let badgeHTML = ""
      if (product.badge) {
        badgeHTML = `<span class="product-badge" style="position: absolute; top: 10px; right: 10px; background-color: #f8b830; color: #1a1a1a; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; z-index: 2;">${product.badge}</span>`
      }
  
      productCard.innerHTML = `
        ${badgeHTML}
        <div class="product-image-container" style="overflow: hidden;">
          <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <p class="product-price">R$ ${product.price.toFixed(2)}</p>
          <button class="add-to-cart" onclick="addToCart(${product.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Adicionar ao Carrinho
          </button>
        </div>
      `
  
      productsGrid.appendChild(productCard)
    })
  }
  
  // Função para alternar categoria
  function selectCategory(category) {
    // Atualizar navegação
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active")
    })
    document.querySelector(`[data-category="${category}"]`).classList.add("active")
  
    // Exibir produtos
    displayProducts(category)
  }
  
  // Função para abrir/fechar carrinho
  function toggleCart() {
    const cartModal = document.getElementById("cartModal")
    cartModal.classList.toggle("active")
  
    if (cartModal.classList.contains("active")) {
      updateCartItems()
    }
  }
  
  // Função para atualizar itens do carrinho
  function updateCartItems() {
    const cartItemsList = document.getElementById("cartItemsList")
    const cartTotal = document.getElementById("cartTotal")
  
    // Limpar lista
    cartItemsList.innerHTML = ""
  
    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 3rem 1rem; color: #b0b0b0;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem; color: #3a3a3a;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <p style="margin-bottom: 0.5rem; font-size: 1.1rem;">Seu carrinho está vazio</p>
          <p style="font-size: 0.9rem; opacity: 0.7;">Adicione itens para continuar</p>
        </div>
      `
      cartTotal.textContent = "R$ 0,00"
      return
    }
  
    // Calcular total
    let total = 0
  
    // Adicionar itens
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity
      total += itemTotal
  
      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
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
  
      cartItemsList.appendChild(cartItem)
    })
  
    // Atualizar total
    cartTotal.textContent = `R$ ${total.toFixed(2)}`
  }
  
  // Função para atualizar quantidade
  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeItem(productId)
    } else {
      const item = cart.find((item) => item.id === productId)
      if (item) {
        item.quantity = newQuantity
        updateCartCount()
        updateCartItems()
      }
    }
  }
  
  // Função para remover item
  function removeItem(productId) {
    const index = cart.findIndex((item) => item.id === productId)
    if (index !== -1) {
      cart.splice(index, 1)
      updateCartCount()
      updateCartItems()
    }
  }
  
  // Inicialização quando o DOM estiver carregado
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Botão de iniciar atendimento
    const startButton = document.getElementById("startButton")
    const welcomeScreen = document.getElementById("welcomeScreen")
  
    startButton.addEventListener("click", () => {
      welcomeScreen.classList.add("hidden")
    })
  
    // 2. Botões de categoria
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", function () {
        const category = this.dataset.category
        selectCategory(category)
      })
    })
  
    // 3. Botão do carrinho
    const cartButton = document.getElementById("cartButton")
    const closeCart = document.getElementById("closeCart")
  
    cartButton.addEventListener("click", toggleCart)
    closeCart.addEventListener("click", toggleCart)
  
    // 4. Exibir produtos iniciais
    displayProducts("destaques")
  })
  