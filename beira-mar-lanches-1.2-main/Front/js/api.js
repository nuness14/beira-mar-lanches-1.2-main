// URL base da API
const API_BASE_URL = 'http://localhost:8082';

// Funções de API
const api = {
  // Produtos
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
  
  // Estoque
  async checkInventory(productId) {
    const response = await fetch(`${API_BASE_URL}/inventory/${productId}`);
    return await response.json();
  },
  
  // Pedidos
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
        // Problema com estoque ou outro erro
        throw new Error('Erro ao processar pedido. Verifique o estoque dos produtos.');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      throw error;
    }
  }
};

// Modificações necessárias para o arquivo app.js existente

// Substituir a declaração estática de produtos
let products = {}; // Será carregado da API

// Função para carregar produtos da API
async function loadProducts() {
  try {
    // Carrega todas as categorias
    const categories = ['destaques', 'lanches', 'bebidas', 'sobremesas'];
    products = {};
    
    for (const category of categories) {
      const productList = await api.getProductsByCategory(category);
      products[category] = productList;
    }
    
    // Exibir produtos iniciais após carregamento
    displayProducts('destaques');
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    showNotification('Erro ao carregar produtos. Verifique sua conexão.', true);
  }
}

// Modificar a função de checkout para usar a API
async function checkout() {
  try {
    if (cart.length === 0) {
      showNotification('Seu carrinho está vazio!');
      return;
    }
    
    // Converter carrinho para o formato esperado pela API
    const cartItems = cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      quantity: item.quantity
    }));
    
    // Enviar pedido para a API
    const order = await api.createOrder(cartItems);
    
    // Limpar carrinho após sucesso
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