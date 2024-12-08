document.addEventListener("DOMContentLoaded", function() {
    const sizeSelect = document.getElementById("size");
    const quantityInput = document.getElementById("quantity");
    const totalPriceDisplay = document.getElementById("total-price");
    const needsShippingCheckbox = document.getElementById("needs-shipping");
    const addressField = document.getElementById("address-field");

    function calculateTotal() {
        const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
        const pricePerUnit = parseFloat(selectedOption.getAttribute("data-price")) || 0;
        const quantity = parseInt(quantityInput.value) || 0;
        const total = pricePerUnit * quantity;
        totalPriceDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }

    needsShippingCheckbox.addEventListener("change", function() {
        if (needsShippingCheckbox.checked) {
            addressField.style.display = "block";
            addressField.querySelector("textarea").setAttribute("required", "required");
        } else {
            addressField.style.display = "none";
            addressField.querySelector("textarea").removeAttribute("required");
        }
    });

    sizeSelect.addEventListener("change", calculateTotal);
    quantityInput.addEventListener("input", calculateTotal);

    calculateTotal();
});
