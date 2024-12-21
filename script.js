// Product Data
const products = {
    trending: [
        { id: 1, name: "Brown Toyota Car", price: 15000, image: "pictures/toyota1.jpg" },
        { id: 2, name: "Black Smart Watch", price: 300, image: "pictures/smartwatch.jpg" },
        { id: 3, name: "Gray Toyota Car", price: 17000, image: "pictures/toyota2.jpg" },
        { id: 4, name: "Black Luxury Chair", price: 200, image: "pictures/chair.jpg" },
        { id: 5, name: "Smart Lock", price: 500, image: "pictures/smartlock.jpg" },
        { id: 6, name: "Refrigerator", price: 500, image: "pictures/refrigerator.jpg" }
    ],
    new: [
        { id: 7, name: "White Macbook", price: 1200, image: "pictures/macbook.jpg" },
        { id: 8, name: "Black Headsets", price: 200, image: "pictures/headsets.jpg" },
        { id: 9, name: "Grey Toyota Car", price: 16000, image: "pictures/toyota2.jpg" },
        { id: 10, name: "Lego", price: 500, image: "pictures/lego.jpg" },
        { id: 11, name: "Electric Scooter", price: 1500, image: "pictures/bike.jpg" },
        { id: 12, name: "LED", price: 500, image: "pictures/tv.jpg" }
    ],
    gadgets: [
        { id: 13, name: "White Drone", price: 800, image: "pictures/drone.jpg" },
        { id: 14, name: "Black Movie Camera", price: 2000, image: "pictures/camera.jpg" },
        { id: 15, name: "Black Smart Watch", price: 300, image: "pictures/smartwatch.jpg" },
        { id: 16, name: "White Macbook", price: 1200, image: "pictures/macbook.jpg" },
        { id: 17, name: "Black Headsets", price: 200, image: "pictures/headsets.jpg" },
        { id: 18, name: "Smart Lock", price: 900, image: "pictures/smartlock.jpg" }
    ],
    cars: [
        { id: 19, name: "Black Mercedes Benz", price: 25000, image: "pictures/LUXURY-CAR.png" },
        { id: 20, name: "Red Toyota Car", price: 18000, image: "pictures/toyota3.jpg" },
        { id: 21, name: "Brown Toyota Car", price: 15000, image: "pictures/toyota1.jpg" },
        { id: 22, name: "Grey Toyota Car", price: 17000, image: "pictures/toyota2.jpg" },
        { id: 23, name: "BMW Toyota Car", price: 25000, image: "pictures/bmw.jpg" },
        { id: 24, name: "Hybrid Toyota Car", price: 35000, image: "pictures/hybridcar.jpg" }
    ],
    toys: [
        { id: 25, name: "Aeroplane", price: 50, image: "pictures/aeroplane.jpg" },
        { id: 26, name: "Lego", price: 100, image: "pictures/lego.jpg" },
        { id: 27, name: "Robot", price: 300, image: "pictures/robo.avif" },
        { id: 28, name: "RemoteControl Car", price: 200, image: "pictures/rcc.jpg" },
        { id: 29, name: "Kids Toy", price: 100, image: "pictures/toy.jpg" },
        { id: 30, name: "Puzzles for kids", price: 100, image: "pictures/puzzels.jpg" }
    ],
    homeappliances: [
        { id: 31, name: "Refrigerator", price: 1000, image: "pictures/Refrigerator.jpg" },
        { id: 32, name: "Washing Machine", price: 800, image: "pictures/washingmachine.png" },
        { id: 33, name: "DishWasher", price: 600, image: "pictures/dishwasher.jpg" },
        { id: 34, name: "Air Conditioner", price: 500, image: "pictures/ac.jpg" },
        { id: 35, name: "LED", price: 500, image: "pictures/tv.jpg" }
    ]
};

// Sidebar functionality
document.getElementById("menu").addEventListener("click", function () {
    document.getElementById("side").classList.toggle("show");
});

document.getElementById("closeMenu").addEventListener("click", function () {
    document.getElementById("side").classList.remove("show");
});

// Initialize cart
let cart = [];

// Render products across all categories
function renderProducts() {
    renderProductSection("trending", "trendingProducts", 6);
    renderProductSection("new", "newProducts", 6);
    renderProductSection("gadgets", "gadgetProducts", 6);
    renderProductSection("cars", "carProducts", 6);
    renderProductSection("toys", "toysProducts", 6);
    renderProductSection("homeappliances", "homeappliancesProducts", 6);
}

// Render a specific category
function renderProductSection(section, containerId, limit) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous content

    products[section].slice(0, limit).forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <div class="product-image" style="background-image: url(${product.image});"></div>
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <div class="stars">
                <span class="star" data-value="1">&#9733;</span>
                <span class="star" data-value="2">&#9733;</span>
                <span class="star" data-value="3">&#9733;</span>
                <span class="star" data-value="4">&#9733;</span>
                <span class="star" data-value="5">&#9733;</span>
            </div>
            <p class="ratingText">Rating: 0</p>
            <textarea placeholder="Write your review..." class="review-input"></textarea>
            <button class="submit-review">Submit Review</button>
            <button class="cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        container.appendChild(productDiv);
    });
}

// Add to cart functionality
function addToCart(productId) {
    const product = getProductById(productId);
    const existingItem = cart.find((item) => item.name === product.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Get product by ID
function getProductById(productId) {
    for (const section in products) {
        const product = products[section].find((item) => item.id === productId);
        if (product) return product;
    }
    return null;
}

// Update cart UI
function updateCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const totalPriceEl = document.getElementById("totalPrice");

    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div>
                <p>${item.name} x${item.quantity}</p>
                <p>$${item.price * item.quantity}</p>
            </div>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    totalPriceEl.textContent = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter((item) => item.name !== name);
    updateCart();
}

// Cart modal controls
document.getElementById("cartIcon").addEventListener("click", () => {
    document.getElementById("cartModal").style.display = "block";
});

document.getElementById("closeCart").addEventListener("click", () => {
    document.getElementById("cartModal").style.display = "none";
});

// Checkout functionality
document.getElementById("checkout").addEventListener("click", () => {
    alert("Checkout complete! Thank you for your purchase.");
    cart = []; // Clear the cart
    updateCart();
    document.getElementById("cartModal").style.display = "none";
});

// Handle star ratings for all products in a section
function setupStarRatings(containerId) {
    const container = document.getElementById(containerId);
    const starContainers = container.querySelectorAll(".stars");

    starContainers.forEach((starContainer) => {
        const stars = starContainer.querySelectorAll(".star");
        const ratingText = starContainer.nextElementSibling;

        stars.forEach((star, index) => {
            star.addEventListener("mouseover", () => updateStars(stars, index + 1));
            star.addEventListener("click", () => {
                const rating = index + 1;
                updateStars(stars, rating);
                ratingText.textContent = `Rating: ${rating}`;
            });
            star.addEventListener("mouseout", () => {
                const selectedRating = parseInt(ratingText.textContent.split(": ")[1]) || 0;
                updateStars(stars, selectedRating);
            });
        });

        function updateStars(stars, rating) {
            stars.forEach((star, i) => {
                star.classList.toggle("selected", i < rating);
            });
        }
    });
}

// Handle review submissions for all products in a section
function setupReviewSubmission(containerId) {
    const container = document.getElementById(containerId);
    const reviewButtons = container.querySelectorAll(".submit-review");

    reviewButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productDiv = button.closest(".product");
            const rating = productDiv.querySelector(".ratingText").textContent.split(": ")[1];
            const reviewText = productDiv.querySelector(".review-input").value.trim();

            if (!rating || reviewText === "") {
                alert("Please provide both a rating and a review.");
                return;
            }

            alert(`Thanks for your review!\nRating: ${rating}\nReview: ${reviewText}`);
            productDiv.querySelector(".review-input").value = ""; // Clear input
            productDiv.querySelector(".ratingText").textContent = "Rating: 0"; // Reset rating
            productDiv.querySelectorAll(".star").forEach((star) => star.classList.remove("selected"));
        });
    });
}

// Initialize on page load
window.onload = () => {
    renderProducts();
    setupStarRatings("trendingProducts");
    setupReviewSubmission("trendingProducts");
    setupStarRatings("newProducts");
    setupReviewSubmission("newProducts");
    setupStarRatings("gadgetProducts");
    setupReviewSubmission("gadgetProducts");
    setupStarRatings("carProducts");
    setupReviewSubmission("carProducts");
    setupStarRatings("toysProducts");
    setupReviewSubmission("toysProducts");
    setupStarRatings("homeappliancesProducts");
    setupReviewSubmission("homeappliancesProducts");
};
