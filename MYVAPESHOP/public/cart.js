document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");
    
    function updateCart() {
        cartContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-image">
                <div class="cart-details">
                    <h2>${item.name}</h2>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <label>Quantity:</label>
                    <input type="number" class="quantity-input" data-index="${index}" value="${item.quantity}" min="1">
                    <p><strong>Total: $${itemTotal.toFixed(2)}</strong></p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });

        const tax = subtotal * 0.0675;
        const total = subtotal + tax;
        
        subtotalElement.textContent = subtotal.toFixed(2);
        taxElement.textContent = tax.toFixed(2);
        totalElement.textContent = total.toFixed(2);

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartContainer.addEventListener("input", function (event) {
        if (event.target.classList.contains("quantity-input")) {
            const index = event.target.getAttribute("data-index");
            cart[index].quantity = parseInt(event.target.value);
            updateCart();
        }
    });

    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCart();
        }
    });

    updateCart();
});
