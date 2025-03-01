document.addEventListener("DOMContentLoaded", function () {
    // Toggle search bar
    const searchIcon = document.querySelector(".search");
    let searchBarVisible = false;

    searchIcon.addEventListener("click", function () {
        let searchBar = document.getElementById("searchBar");

        if (!searchBarVisible) {
            searchBar = document.createElement("input");
            searchBar.setAttribute("type", "text");
            searchBar.setAttribute("id", "searchBar");
            searchBar.setAttribute("placeholder", "Search...");
            searchBar.classList.add("search-bar");
            document.body.appendChild(searchBar);
            searchBarVisible = true;
        } else {
            searchBar.remove();
            searchBarVisible = false;
        }
    });

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartIcon = document.querySelector(".cart");

    function updateCartIcon() {
        cartIcon.innerHTML = `shopping_cart (${cart.length})`;
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartIcon();
    }

    function addToCart(event) {
        const product = event.target.closest(".product");
        const productName = product.querySelector("h5").innerText;
        const productPrice = product.querySelector("span").innerText;
        const productImg = product.querySelector("img").src;

        const cartItem = { name: productName, price: productPrice, img: productImg };
        cart.push(cartItem);

        saveCart();
    }

    document.querySelectorAll(".productBtn").forEach(button => {
        button.addEventListener("click", addToCart);
    });

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        showCart(); // Refresh cart view
    }

    function showCart() {
        document.querySelector(".cart-container")?.remove(); // Remove previous cart if open

        const cartContainer = document.createElement("div");
        cartContainer.classList.add("cart-container");
        cartContainer.innerHTML = "<h3>Shopping Cart</h3>";

        if (cart.length === 0) {
            cartContainer.innerHTML += "<p>Your cart is empty!</p>";
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-details">
                        <p>${item.name}</p>
                        <p>${item.price}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                `;
                cartContainer.appendChild(cartItem);
            });

            // Add event listeners to Remove buttons
            cartContainer.querySelectorAll(".remove-btn").forEach(button => {
                button.addEventListener("click", function () {
                    removeFromCart(this.dataset.index);
                });
            });
        }

        // Close button
        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.classList.add("cart-close");
        closeButton.addEventListener("click", () => cartContainer.remove());

        cartContainer.appendChild(closeButton);
        document.body.appendChild(cartContainer);
    }

    cartIcon.addEventListener("click", showCart);
    updateCartIcon();

    // Redirect to login page
    const loginIcon = document.querySelector(".login");
    loginIcon.addEventListener("click", function () {
        window.location.href = "login.html";
    });

    // Toggle menu for mobile view
    const menuIcon = document.querySelector(".menu");
    const navLinks = document.querySelector(".navLinks");

    menuIcon.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuIcon.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("active");
        }
    });
});
