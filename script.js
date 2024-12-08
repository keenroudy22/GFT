document.addEventListener("DOMContentLoaded", function() {
    const sizeSelect = document.getElementById("size");
    const quantityInput = document.getElementById("quantity");
    const totalPriceDisplay = document.getElementById("total-price");

    function calculateTotal() {
        const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
        const pricePerUnit = parseFloat(selectedOption.getAttribute("data-price")) || 0;
        const quantity = parseInt(quantityInput.value) || 0;
        const total = pricePerUnit * quantity;
        totalPriceDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }

    sizeSelect.addEventListener("change", calculateTotal);
    quantityInput.addEventListener("input", calculateTotal);

    calculateTotal();
});
