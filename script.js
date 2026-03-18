// script.js
const products = [
    {
        id: 1,
        name: "Classic Chocolate Truffle",
        category: "Cakes",
        price: 2500,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
        description: "A decadent, rich dark chocolate cake layered with silky chocolate truffle ganache. Perfectly balanced with a hint of espresso.",
        ingredients: ["Dark Chocolate (70%)", "Organic Flour", "Free-range Eggs", "Heavy Cream", "Vanilla Bean"]
    },
    {
        id: 2,
        name: "Raspberry Mille-Feuille",
        category: "Pastries",
        price: 450,
        image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=600&auto=format&fit=crop",
        description: "Layers of caramelized puff pastry filled with vanilla mousseline and fresh tart raspberries.",
        ingredients: ["Puff Pastry", "Fresh Raspberries", "Vanilla Mousseline", "Powdered Sugar"]
    },
    {
        id: 3,
        name: "Artisan Sourdough Boule",
        category: "Breads",
        price: 350,
        image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=600&auto=format&fit=crop",
        description: "Naturally leavened sourdough bread with a deeply caramelized crust and an open, chewy crumb.",
        ingredients: ["Organic Bread Flour", "Water", "Sea Salt", "Wild Yeast Starter"]
    },
    {
        id: 4,
        name: "Matcha Macadamia Cookies",
        category: "Cookies",
        price: 200,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop",
        description: "Soft-baked cookies made with premium ceremonial grade matcha and roasted macadamia nuts.",
        ingredients: ["Matcha Powder", "Macadamia Nuts", "Organic Butter", "Brown Sugar", "Flour"]
    },
    {
        id: 5,
        name: "Red Velvet Dream",
        category: "Cakes",
        price: 2200,
        image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=600&auto=format&fit=crop",
        description: "Moist red velvet sponge layered with tangy, rich cream cheese frosting.",
        ingredients: ["Cocoa Powder", "Buttermilk", "Cream Cheese", "Vanilla", "Butter"]
    },
    {
        id: 6,
        name: "Parisian Butter Croissant",
        category: "Pastries",
        price: 250,
        image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=600&auto=format&fit=crop",
        description: "The classic Parisian croissant, impeccably flaky on the outside and wonderfully buttery inside.",
        ingredients: ["High-protein Flour", "French Butter", "Water", "Yeast", "Salt"]
    },
    {
        id: 7,
        name: "Olive & Rosemary Focaccia",
        category: "Breads",
        price: 300,
        image: "https://images.unsplash.com/photo-1596450514735-11512fbfa3cf?q=80&w=600&auto=format&fit=crop",
        description: "Italian completely flat bread baked with extra virgin olive oil, Kalamata olives, and fresh rosemary.",
        ingredients: ["Flour", "Olive Oil", "Kalamata Olives", "Rosemary", "Sea Salt"]
    },
    {
        id: 8,
        name: "Double Chocolate Chunk",
        category: "Cookies",
        price: 180,
        image: "https://images.unsplash.com/photo-1605666807759-ddf2705fe053?q=80&w=600&auto=format&fit=crop",
        description: "A gooey, indulgent cookie loaded with dark chocolate chunks and a sprinkle of flaky sea salt.",
        ingredients: ["Cocoa Powder", "Dark Chocolate Chunks", "Sea Salt", "Butter", "Flour"]
    }
];

// App State
let cart = [];
let currentCategory = "All";
let searchQuery = "";

// DOM Elements
const productGrid = document.getElementById("productGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const searchMobileToggle = document.getElementById("searchMobileToggle");
const searchContainer = document.querySelector(".search-container");
const cartToggle = document.getElementById("cartToggle");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTax = document.getElementById("cartTax");
const cartTotalSum = document.getElementById("cartTotalSum");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutOverlay = document.getElementById("checkoutOverlay");
const productModal = document.getElementById("productModal");
const productModalOverlay = document.getElementById("productModalOverlay");
const closeModal = document.getElementById("closeModal");
const modalContent = document.getElementById("modalContent");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.getElementById("navbar");
const noProductsMessage = document.getElementById("noProductsMessage");

// Initialize App
function init() {
    renderProducts();
    setupEventListeners();
    setupIntersectionObserver();
    checkTheme();
}

// Render Products
function renderProducts() {
    const filteredProducts = products.filter(p => {
        const matchesCategory = currentCategory === "All" || p.category === currentCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    productGrid.innerHTML = "";
    
    if (filteredProducts.length === 0) {
        noProductsMessage.classList.remove("hidden");
    } else {
        noProductsMessage.classList.add("hidden");
        filteredProducts.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card reveal active";
            card.innerHTML = `
                <div class="product-image-container" onclick="openProductModal(${product.id})">
                    <img src="${product.image}" loading="lazy" alt="${product.name}">
                    <div class="quick-view">Quick View</div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">₹${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="ph ph-shopping-bag"></i> Add to Cart
                    </button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }
}

// Global filter function used by Homepage category cards
window.filterCategory = function(category) {
    currentCategory = category;
    
    // Update active button state
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Scroll to products section smoothly
    document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
    renderProducts();
};

// Open Product Modal
window.openProductModal = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    modalContent.innerHTML = `
        <div class="modal-img">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-details">
            <span class="modal-details-cat">${product.category}</span>
            <h2>${product.name}</h2>
            <div class="price">₹${product.price.toFixed(2)}</div>
            <p>${product.description}</p>
            <div class="ingredients">
                <h4>Finest Ingredients:</h4>
                <ul>
                    ${product.ingredients.map(ing => `<li>${ing}</li>`).join("")}
                </ul>
            </div>
            <button class="btn btn-primary w-100" onclick="addToCart(${product.id}); closeProductModal()">Add to Cart - ₹${product.price.toFixed(2)}</button>
        </div>
    `;
    
    productModalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
};

window.closeProductModal = function() {
    productModalOverlay.classList.remove("active");
    document.body.style.overflow = "";
};

// Cart Logic
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartIcon();
    renderCart();
    
    // Open sidebar
    cartOverlay.classList.add("active");
    cartSidebar.classList.add("active");
    document.body.style.overflow = "hidden";
};

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartIcon();
    renderCart();
};

window.updateQuantity = function(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartIcon();
            renderCart();
        }
    }
};

function updateCartIcon() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    // Pop animation
    cartBadge.style.transform = "scale(1.3)";
    setTimeout(() => {
        cartBadge.style.transform = "scale(1)";
    }, 200);
}

function renderCart() {
    cartItems.innerHTML = "";
    
    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="empty-cart-msg">Your cart is elegantly empty.</div>`;
        cartSubtotal.textContent = "₹0.00";
        cartTax.textContent = "₹0.00";
        cartTotalSum.textContent = "₹0.00";
        checkoutBtn.disabled = true;
        return;
    }
    
    checkoutBtn.disabled = false;
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const cartItemEl = document.createElement("div");
        cartItemEl.className = "cart-item";
        cartItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="price">₹${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" aria-label="Remove item" onclick="removeFromCart(${item.id})">
                <i class="ph ph-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItemEl);
    });
    
    const tax = subtotal * 0.18; // 18% GST for India
    const total = subtotal + tax;
    
    cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    cartTax.textContent = `₹${tax.toFixed(2)}`;
    cartTotalSum.textContent = `₹${total.toFixed(2)}`;
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentCategory = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProducts();
        });
    });

    // Search
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });

    searchMobileToggle.addEventListener("click", () => {
        searchContainer.classList.toggle("active");
        if(searchContainer.classList.contains("active")) {
            searchInput.focus();
        }
    });

    // Cart Sidebar toggle
    cartToggle.addEventListener("click", () => {
        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });
    
    closeCart.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
        document.body.style.overflow = "";
    });
    
    cartOverlay.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
        document.body.style.overflow = "";
    });

    // Modal Close
    closeModal.addEventListener("click", closeProductModal);
    productModalOverlay.addEventListener("click", (e) => {
        if (e.target === productModalOverlay) closeProductModal();
    });

    // Mobile Menu
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        const icon = mobileMenu.classList.contains("active") ? "ph-x" : "ph-list";
        menuToggle.innerHTML = `<i class="ph ${icon}"></i>`;
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuToggle.innerHTML = `<i class="ph ph-list"></i>`;
        });
    });

    // Theme Toggle
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.parentElement.getAttribute("data-theme") === "dark";
        if (isDark) {
            document.body.parentElement.removeAttribute("data-theme");
            themeToggle.innerHTML = `<i class="ph ph-moon"></i>`;
            localStorage.setItem("lumiere-theme", "light");
        } else {
            document.body.parentElement.setAttribute("data-theme", "dark");
            themeToggle.innerHTML = `<i class="ph ph-sun"></i>`;
            localStorage.setItem("lumiere-theme", "dark");
        }
    });

    // Sticky Navbar
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Checkout
    checkoutBtn.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
        document.body.style.overflow = "";
        checkoutOverlay.classList.add("active");
        
        setTimeout(() => {
            checkoutOverlay.innerHTML = `
                <i class="ph-fill ph-check-circle" style="font-size: 4rem; color: var(--color-primary); margin-bottom: 1rem;"></i>
                <h2>Order Placed Successfully!</h2>
                <p>An artisan will begin preparing your order soon.</p>
            `;
            
            cart = [];
            updateCartIcon();
            renderCart();
            
            setTimeout(() => {
                checkoutOverlay.classList.remove("active");
                // Reset overlay HTML for next time
                setTimeout(() => {
                    checkoutOverlay.innerHTML = `
                        <div class="checkout-spinner"></div>
                        <h3>Processing your order...</h3>
                    `;
                }, 500);
            }, 3000);
        }, 2000);
    });
}

// Intersection Observer for Scroll Animations
function setupIntersectionObserver() {
    const reveals = document.querySelectorAll(".reveal");
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
}

// Initial Theme Check
function checkTheme() {
    const savedTheme = localStorage.getItem("lumiere-theme");
    if (savedTheme === "dark") {
        document.body.parentElement.setAttribute("data-theme", "dark");
        themeToggle.innerHTML = `<i class="ph ph-sun"></i>`;
    }
}

// Run
document.addEventListener("DOMContentLoaded", init);
