// Sons & Co. Mega Menu Hover & Responsive Accordion Logic

document.addEventListener("DOMContentLoaded", () => {
    // Desktop Hover and Overlay Management
    const navItems = document.querySelectorAll(".nav-item-container");
    const megaPanels = document.querySelectorAll(".mega-menu-panel");
    const overlay = document.getElementById("mega-menu-overlay");
    let closeTimeout = null;

    function clearCloseTimeout() {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }
    }

    function openPanel(targetId) {
        clearCloseTimeout();
        megaPanels.forEach(panel => {
            if (panel.id === targetId) {
                panel.classList.remove("hidden");
                // Force layout recalculation for CSS transition
                panel.offsetHeight;
                panel.classList.add("active");
            } else {
                panel.classList.remove("active");
                panel.classList.add("hidden");
            }
        });
        if (overlay) {
            overlay.classList.remove("hidden");
            overlay.offsetHeight;
            overlay.classList.add("opacity-100");
        }
    }

    function closeAll() {
        clearCloseTimeout();
        megaPanels.forEach(panel => {
            panel.classList.remove("active");
            // Add slight timeout matching transition duration
            setTimeout(() => {
                if (!panel.classList.contains("active")) {
                    panel.classList.add("hidden");
                }
            }, 200);
        });
        if (overlay) {
            overlay.classList.remove("opacity-100");
            setTimeout(() => {
                if (!overlay.classList.contains("opacity-100")) {
                    overlay.classList.add("hidden");
                }
            }, 200);
        }
    }

    navItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const targetId = item.getAttribute("data-mega-target");
            openPanel(targetId);
        });

        item.addEventListener("mouseleave", () => {
            closeTimeout = setTimeout(closeAll, 150);
        });
    });

    megaPanels.forEach(panel => {
        panel.addEventListener("mouseenter", () => {
            clearCloseTimeout();
        });

        panel.addEventListener("mouseleave", () => {
            closeTimeout = setTimeout(closeAll, 150);
        });
    });

    // Mobile Hamburger Accordion Toggle Logic
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    const accordionTriggers = document.querySelectorAll(".mobile-accordion-trigger");
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const panel = trigger.nextElementSibling;
            if (panel) {
                panel.classList.toggle("hidden");
                const icon = trigger.querySelector(".fa-chevron-down");
                if (icon) {
                    icon.classList.toggle("rotate-180");
                }
            }
        });
    });

    // Image Error Handling (Fallback)
    document.addEventListener("error", (e) => {
        if (e.target.tagName === "IMG" && e.target.closest("#shop, #shop-catalog-grid, #shop-featured, #cart-items-list, #wishlist-items-list, #product-detail-container, #summary-items-list")) {
            console.log("Image failed to load, applying fallback:", e.target.src);
            e.target.src = "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop"; // Using a high-quality product placeholder
            e.target.classList.add("img-fallback");
            // Optional: add a branded container class or style
            e.target.style.opacity = "0.7";
        }
    }, true);
});
