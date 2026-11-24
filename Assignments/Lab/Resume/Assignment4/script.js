// Static array of product objects
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    description: "Comfortable wireless headphones with clear sound and deep bass.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    rating: 4.5,
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    description: "A stylish smartwatch for fitness tracking and daily use.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Accessories",
    rating: 4.2,
    inStock: true
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    description: "Lightweight running shoes designed for comfort and everyday workouts.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "Footwear",
    rating: 4.4,
    inStock: true
  },
  {
    id: 4,
    name: "Travel Backpack",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    description: "A spacious backpack suitable for college, office, and travel.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Bags",
    rating: 4.3,
    inStock: true
  },
  {
    id: 5,
    name: "Digital Camera",
    price: 15999,
    originalPrice: 18999,
    discount: 16,
    description: "Capture memorable moments with a compact digital camera.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    category: "Electronics",
    rating: 4.6,
    inStock: true
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    description: "Modern sunglasses with a stylish frame for everyday wear.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    category: "Fashion",
    rating: 4.1,
    inStock: true
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    description: "Prepare fresh coffee at home with this easy-to-use coffee maker.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    category: "Home Appliances",
    rating: 4.4,
    inStock: false
  }
];

// The cart is an empty list at the start
let cart = [];

// Get the HTML elements we need
let productList = document.getElementById("productList");
let cartSection = document.getElementById("cartSection");
let cartItems = document.getElementById("cartItems");
let cartCount = document.getElementById("cartCount");
let totalItems = document.getElementById("totalItems");
let grandTotal = document.getElementById("grandTotal");

// Show all products on the page
function displayProducts() {
  let html = "";

  for (let i = 0; i < products.length; i++) {
    let p = products[i];
    let cardClass = "";
    let stockLabel = "";
    let button = "";

    // Check if the product is in stock
    if (p.inStock == true) {
      button = '<button class="btn btn-success w-100 btn-sm" onclick="addToCart(' + p.id + ')">Add to Cart</button>';
    } else {
      cardClass = "out-of-stock";
      stockLabel = '<span class="stock-label">OUT OF STOCK</span>';
      button = '<button class="btn btn-secondary w-100 btn-sm" disabled>Add to Cart</button>';
    }

    html += '<div class="col-12 col-sm-6 col-lg-4 col-xl-3">';
    html += '<div class="card product-card position-relative ' + cardClass + '">';
    html += stockLabel;
    html += '<img src="' + p.image + '" class="product-image">';
    html += '<div class="card-body">';
    html += '<div class="d-flex justify-content-between">';
    html += '<h6>' + p.name + '</h6>';
    html += '<small><i class="bi bi-star-fill text-warning"></i> ' + p.rating + '</small>';
    html += '</div>';
    html += '<p class="product-desc">' + p.description + '</p>';
    html += '<div class="d-flex align-items-center gap-2 mb-3">';
    html += '<strong>₹ ' + p.price + '</strong>';
    html += '<span class="old-price">₹ ' + p.originalPrice + '</span>';
    html += '<span class="discount-badge">' + p.discount + '% OFF</span>';
    html += '</div>';
    html += button;
    html += '</div></div></div>';
  }

  productList.innerHTML = html;
}

// Add a product to the cart
function addToCart(id) {
  // Check if the product is already in the cart
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart[i].quantity = cart[i].quantity + 1;
      cartSection.classList.remove("d-none");
      updateCart();
      return;
    }
  }

  // If not in the cart, find the product and add it
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id && products[i].inStock == true) {
      cart.push({
        id: products[i].id,
        name: products[i].name,
        price: products[i].price,
        image: products[i].image,
        quantity: 1
      });
    }
  }

  cartSection.classList.remove("d-none");
  updateCart();
}

// Increase or decrease quantity (change is 1 or -1)
function changeQuantity(id, change) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart[i].quantity = cart[i].quantity + change;

      // Remove the item if quantity becomes 0
      if (cart[i].quantity == 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }

  updateCart();
}

// Show the cart items and calculate the totals
function updateCart() {
  let html = "";
  let total = 0;
  let count = 0;

  if (cart.length == 0) {
    html = '<p class="text-muted text-center">Your cart is empty.</p>';
  }

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let subtotal = item.price * item.quantity;
    total = total + subtotal;
    count = count + item.quantity;

    html += '<div class="cart-item">';
    html += '<img src="' + item.image + '">';
    html += '<div class="flex-grow-1">';
    html += '<div class="fw-semibold">' + item.name + '</div>';
    html += '<div>₹ ' + item.price + '</div>';
    html += '<div class="d-flex align-items-center gap-2 my-1">Quantity: ';
    html += '<button class="btn btn-outline-secondary qty-btn" onclick="changeQuantity(' + item.id + ', -1)">-</button>';
    html += '<span>' + item.quantity + '</span>';
    html += '<button class="btn btn-outline-secondary qty-btn" onclick="changeQuantity(' + item.id + ', 1)">+</button>';
    html += '</div>';
    html += '<div>Subtotal: <strong>₹ ' + subtotal + '</strong></div>';
    html += '</div></div>';
  }

  cartItems.innerHTML = html;
  cartCount.innerText = count;
  totalItems.innerText = count;
  grandTotal.innerText = "₹ " + total;
}

// Show or hide the cart
function toggleCart() {
  cartSection.classList.toggle("d-none");
}

// Simple checkout message
function checkout() {
  alert("Thank you! Your total is " + grandTotal.innerText);
}

// Run when the page loads
displayProducts();
updateCart();
