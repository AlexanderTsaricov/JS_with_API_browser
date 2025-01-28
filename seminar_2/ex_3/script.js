const button = document.querySelector(".payButton");

button.addEventListener("click", (event) => {
    if (event.isTrusted) {
        button.textContent = "Product added to cart";
        setTimeout(() => {
            button.textContent = "Pay";
        }, 2000);
    }
});
