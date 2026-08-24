# Sons & Co. | Premium E-Commerce Wardrobe

Sons & Co. is a modern, responsive, and fully interactive premium e-commerce platform combining classic tailoring with functional design for all generations (Men, Women, and Kids). This application features a robust frontend catalog, a fully functional shopping bag system, and dynamic filter controls.

---

## 🌟 Key Features

*   **Curated Interactive Catalog**: A fully dynamic product filtering catalog (`shop.html`) powered by vanilla JS that updates instantly as filters change.
*   **Intuitive Category Menus**: Immersive desktop mega-menus and responsive mobile accordion navigation (`menu.js`).
*   **Complete Shopping Bag & Checkout**: A slide-out drawer cart supporting real-time price calculation, sizing, item quantity adjustment, and step-by-step secure checkout processing (`cart.js`, `checkout.html`).
*   **Wishlist & Favorites**: Easy wishlist toggles with counter badges to save items for future purchases.
*   **Perfect Gender & Product Alignment**: Hand-curated, high-quality, and completely unique fashion images mapped to each section (no model mismatches or placeholder overlaps).
*   **Responsive Modern UI**: Styled with Tailwind CSS and designed for optimal viewing on desktop, tablet, and mobile browsers.

---

## 🛠️ Technology Stack

*   **HTML5 & CSS3**: Semantic page structures and custom typography styled using Google Fonts (*Plus Jakarta Sans* & *Playfair Display*).
*   **Tailwind CSS (CDN)**: Utility-first CSS classes for clean layout adjustments, grid systems, and animations.
*   **JavaScript (ES6+)**: Custom dynamic state management for the shop filters, search, sorting, cart actions, and countdown timers.
*   **FontAwesome Icons**: Premium icon assets for search, bag, wishlist, and interface controls.

---

## 📂 Project Structure

```bash
├── index.html       # Landing page featuring hero banners, collections, and flash sale highlights.
├── shop.html        # Interactive shop page with filters (gender, styles, sizes, price range).
├── product.html     # Product details page showcasing item descriptions, size selectors, and additions.
├── checkout.html    # Order summary, shipping form, payment options, and invoice confirmation.
├── products.js      # Canonical dataset containing all audited fashion products, categories, and image URLs.
├── cart.js          # Cart state machine handles adding/removing items, counts, and pricing calculations.
├── menu.js          # Hover mega-menus, responsive mobile accordions, and image fallback management.
├── script.js        # Global utility scripts.
└── style.css        # Custom theme definitions.
```

---

## 🚀 How to Run Locally

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Hunter12371/Cloud-E-commerce-Website.git
    cd Cloud-E-commerce-Website
    ```
2.  **Open in Browser**:
    *   Simply double-click `index.html` to run the website locally in any browser.
    *   Alternatively, run a local development server (e.g., using VS Code Live Server extension, or `python -m http.server 8000` in the directory) for optimal experience.

---

## 👔 Audited Fashion Categories

*   **Gentlemen (Men)**: Tuxedo Suits, Oxford Dress Shirts, Chinos, Denim, Cargo Shorts, Knit Cardigans, Sweaters, Modi Jackets, Sherwanis, and Activewear.
*   **Ladies (Women)**: Silk Maxi Dresses, Evening Gowns, Saffiano Leather Handbags, Suede Block Heels, Saree Wear, Lehenga Cholis, and Suede Trench Coats.
*   **Little Ones (Kids)**: Party Dresses, Kids Tuxedos, Overalls, Cargo Shorts, Sleepers, and Active Wear.

---

## 📈 Project Status

*   **Status**: Completed
*   **Verification**: All e-commerce core features (catalog, filtering, cart, checkout) have been implemented, tested, and verified.