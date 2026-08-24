// Common Cart & Wishlist Logic using LocalStorage for Sons & Co.

let cart = JSON.parse(localStorage.getItem('sons_co_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('sons_co_wishlist')) || [];

function saveCart() {
    localStorage.setItem('sons_co_cart', JSON.stringify(cart));
    updateCartDOM();
}

function saveWishlist() {
    localStorage.setItem('sons_co_wishlist', JSON.stringify(wishlist));
    updateWishlistDOM();
}

function addToCart(productId, size = "M") {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId && item.selectedSize === size);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, selectedSize: size, quantity: 1 });
    }

    saveCart();
    openCartDrawer();
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.selectedSize === size));
    saveCart();
}

function updateQuantity(productId, size, delta) {
    const item = cart.find(item => item.id === productId && item.selectedSize === size);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId, size);
    } else {
        saveCart();
    }
}

function toggleWishlist(productId) {
    const exists = wishlist.some(id => id === productId);
    if (exists) {
        wishlist = wishlist.filter(id => id !== productId);
        alert("Removed from Wishlist");
    } else {
        wishlist.push(productId);
        alert("Added to Wishlist!");
    }
    saveWishlist();
}

function openCartDrawer() {
    const cartDrawer = document.getElementById("cart-drawer");
    if (cartDrawer) cartDrawer.classList.remove("hidden");
}

function closeCartDrawer() {
    const cartDrawer = document.getElementById("cart-drawer");
    if (cartDrawer) cartDrawer.classList.add("hidden");
}

function updateCartDOM() {
    const cartCount = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items-list");
    const cartSubtotal = document.getElementById("cart-subtotal");

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;

    if (!cartItemsList) return;

    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <li class="py-12 text-center text-gray-500">
                <i class="fa-solid fa-basket-shopping text-3xl mb-2 text-gray-300"></i>
                <p>Your shopping bag is empty.</p>
            </li>
        `;
        if (cartSubtotal) cartSubtotal.textContent = "$0.00";
        return;
    }

    cartItemsList.innerHTML = cart.map(item => `
        <li class="flex py-6">
            <div class="h-24 w-18 flex-shrink-0 overflow-hidden border border-brand-100 rounded">
                <img src="${item.image}" alt="${item.title}" class="h-full w-full object-cover">
            </div>

            <div class="ml-4 flex flex-1 flex-col justify-between">
                <div>
                    <div class="flex justify-between text-sm font-semibold text-brand-900">
                        <h4 class="font-serif line-clamp-1">${item.title}</h4>
                        <p class="ml-4">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p class="mt-1 text-xs text-gray-400 uppercase tracking-widest">${item.category} | ${item.selectedSize} | ${item.season}</p>
                </div>
                <div class="flex items-end justify-between text-xs">
                    <div class="flex items-center border border-gray-200 rounded">
                        <button onclick="updateQuantity(${item.id}, '${item.selectedSize}', -1)" class="px-2 py-1 text-gray-500 hover:bg-gray-100">-</button>
                        <span class="px-3 font-semibold">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, '${item.selectedSize}', 1)" class="px-2 py-1 text-gray-500 hover:bg-gray-100">+</button>
                    </div>
                    <button type="button" onclick="removeFromCart(${item.id}, '${item.selectedSize}')" class="font-medium text-amber-600 hover:text-amber-500 uppercase tracking-widest text-[10px]">Remove</button>
                </div>
            </div>
        </li>
    `).join("");

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
}

function updateWishlistDOM() {
    const wishlistCount = document.getElementById("wishlist-count");
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// Show dynamic wishlist modal
function toggleWishlistModal() {
    let modal = document.getElementById("wishlist-modal");
    if (!modal) {
        // Create wishlist modal dynamically
        modal = document.createElement("div");
        modal.id = "wishlist-modal";
        modal.className = "fixed inset-0 z-50 overflow-y-auto hidden";
        modal.innerHTML = `
            <div class="flex min-h-screen items-center justify-center p-4 text-center">
                <div onclick="toggleWishlistModal()" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-xl p-8 z-10">
                    <button onclick="toggleWishlistModal()" class="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                        <i class="fa-solid fa-xmark text-xl"></i>
                    </button>
                    <h2 class="font-serif text-2xl font-bold mb-6 text-brand-900">Your Wishlist</h2>
                    <ul id="wishlist-items-list" class="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                        <!-- Loaded dynamically -->
                    </ul>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    modal.classList.toggle("hidden");

    if (!modal.classList.contains("hidden")) {
        const list = document.getElementById("wishlist-items-list");
        if (wishlist.length === 0) {
            list.innerHTML = `
                <li class="py-8 text-center text-gray-500">
                    <i class="fa-regular fa-heart text-3xl mb-2 text-gray-300 block"></i>
                    Your wishlist is empty.
                </li>
            `;
            return;
        }

        list.innerHTML = wishlist.map(id => {
            const item = products.find(p => p.id === id);
            if (!item) return "";
            return `
                <li class="flex py-4 items-center justify-between">
                    <div class="flex items-center">
                        <img src="${item.image}" alt="${item.title}" class="h-16 w-12 object-cover border border-brand-50 flex-shrink-0">
                        <div class="ml-4">
                            <h4 class="font-serif text-sm font-bold line-clamp-1">${item.title}</h4>
                            <p class="text-xs text-amber-600">$${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="addToCart(${item.id}, 'M'); toggleWishlistModal();" class="bg-brand-900 text-white text-xs px-3 py-1.5 font-bold uppercase tracking-wider">Add To Bag</button>
                        <button onclick="toggleWishlist(${item.id}); toggleWishlistModal();" class="text-red-500 hover:text-red-700 text-xs px-2"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </li>
            `;
        }).join("");
    }
}

// Setup common elements and listeners on DOM load
window.addEventListener("DOMContentLoaded", () => {
    updateCartDOM();
    updateWishlistDOM();

    // Bind navigation buttons if they exist
    const cartBtn = document.getElementById("cart-btn");
    const closeCart = document.getElementById("close-cart");
    const keepShopping = document.getElementById("keep-shopping");
    const cartOverlay = document.getElementById("cart-overlay");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (cartBtn) cartBtn.addEventListener("click", openCartDrawer);
    if (closeCart) closeCart.addEventListener("click", closeCartDrawer);
    if (keepShopping) keepShopping.addEventListener("click", closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener("click", closeCartDrawer);

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
    }
});
