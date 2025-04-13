// Obtain elements from handlebars views documents
const productsContainer = document.getElementById("productsContainer");
const checkbox = document.getElementById("checkbox");
const cartSelect = document.getElementById("cart-select");
const addButton = document.getElementById("addToCart-btn");

// Events

if (productsContainer) {
  productsContainer.addEventListener("click", (e) => {
    // Navigates to product details view
    if (e.target.classList.contains("detailsButton")) {
      const id = e.target.getAttribute("data-id");

      window.location.href = `/views/products/${id}`;
    }

    // Add to cart event
    if (e.target.classList.contains("addToCartButton")) {
      const pid = e.target.getAttribute("data-id");
      const container = e.target.closest(".item");
      const cartSelect = container.querySelector("select[name='cart-select']");

      if (!cartSelect || !cartSelect.value) {
        alert("Por favor, selecciona un carrito antes de agregar el producto.");
        return;
      }

      const cid = cartSelect.value;

      fetch(`/api/carts/${cid}/product/${pid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Producto agregado al carrito correctamente.");
        })
        .catch((error) => console.error("Error al agregar producto:", error));
    }
  });
}

// Enables or disables select and "Add Product to cart" button depending on checkbox
productsContainer.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const container = e.target.closest(".item");
    const cartSelect = container.querySelector("select[name='cart-select']");
    const addButton = container.querySelector(".addToCartButton");

    cartSelect.disabled = !e.target.checked;
    addButton.disabled = !e.target.checked;
  }
});
