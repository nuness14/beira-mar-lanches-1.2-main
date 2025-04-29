
const API_BASE_URL = 'http://localhost:8082';


const api = {

  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return await response.json();
  },
  
  async getProductsByCategory(category) {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    return await response.json();
  },
  
  async getProductById(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return await response.json();
  },
  

  async checkInventory(productId) {
    const response = await fetch(`${API_BASE_URL}/inventory/${productId}`);
    return await response.json();
  },
  

  async createOrder(cartItems) {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });
      
      if (!response.ok) {
    
        throw new Error('Erro ao processar pedido. Verifique o estoque dos produtos.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      throw error;
    }
  }
};
let products = {}; 


async function loadProducts() {
  try {
    const categories = ['destaques', 'lanches', 'bebidas', 'sobremesas'];
    products = {};
    
    for (const category of categories) {
      const productList = await api.getProductsByCategory(category);
      products[category] = productList;
    }
    
  
    displayProducts('destaques');
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    showNotification('Erro ao carregar produtos. Verifique sua conexão.', true);
  }
}


async function checkout() {
  try {
    if (cart.length === 0) {
      showNotification('Seu carrinho está vazio!');
      return;
    }
    
  
    const cartItems = cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      quantity: item.quantity
    }));
    
   
    const order = await api.createOrder(cartItems);
    
   
    cart.length = 0;
    updateCartCount();
    updateCartItems();
    
    // Fechar modal do carrinho
    toggleCart();
    
    // Mostrar confirmação
    showNotification('Pedido realizado com sucesso! Número do pedido: ' + order.id);
  } catch (error) {
    showNotification('Erro ao processar pedido: ' + error.message, true);
  }
}

// Melhorar a função de notificação para suportar erros
function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = isError ? "#ff6b6b" : "#f8b830";
  notification.style.color = "#1a1a1a";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "5px";
  notification.style.zIndex = "1000";
  notification.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

  document.body.appendChild(notification);

  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

// Adicionar botão de checkout ao código HTML do carrinho
// Adicione este código ao HTML do modal do carrinho
/*
<div class="cart-actions">
  <button id="checkoutButton" class="checkout-button" onclick="checkout()">
    Finalizar Pedido
  </button>
</div>
*/

// Carregar produtos quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  // Código existente...
  
  // Adicionar carregamento de produtos da API
  loadProducts();
  
  // Resto do código existente...
});