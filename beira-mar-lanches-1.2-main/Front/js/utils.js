function searchProducts(query) {
  const productsGrid = document.getElementById("productsGrid");
  productsGrid.innerHTML = ""; // Limpa os produtos da tela

  if (!query.trim()) {
    // Se o campo de busca estiver vazio, mostra os destaques
    if (window.productsSection) {
      window.productsSection.displayProducts("destaques");
    }
    return;
  }

  query = query.toLowerCase();
  const matchedProducts = [];

  // Buscar em todas as categorias
  for (const category in window.products) {
    const categoryProducts = window.products[category];
    categoryProducts.forEach((product) => {
      if (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      ) {
        matchedProducts.push(product);
      }
    });
  }

  // Se não encontrou nada
  if (matchedProducts.length === 0) {
    productsGrid.innerHTML = `<p style="text-align: center; color: #777;">Nenhum produto encontrado.</p>`;
  } else {
    matchedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <p class="product-price">R$ ${product.price.toFixed(2)}</p>
          <button class="add-to-cart" onclick="addToCart(${product.id})">
            Adicionar ao Carrinho
          </button>
        </div>
      `;
      productsGrid.appendChild(productCard);
    });
    // Quando o usuário digitar no campo de busca, chamar a função de busca
document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value;
  searchProducts(query);
});

  }
}
