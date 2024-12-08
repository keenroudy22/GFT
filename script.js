document.addEventListener("DOMContentLoaded", function() {
    const sizeSelect = document.getElementById("size");
    const quantityInput = document.getElementById("quantity");
    const totalPriceDisplay = document.getElementById("total-price");

    // Clear the form on page load
    document.getElementById("order-form").reset();

    // Calculate the total price dynamically
    function calculateTotal() {
        const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
        const pricePerUnit = parseFloat(selectedOption.getAttribute("data-price")) || 0;
        const quantity = parseInt(quantityInput.value) || 0;
        const total = pricePerUnit * quantity;
        totalPriceDisplay.textContent = `Total: $${total.toFixed(2)}`;
    }

    sizeSelect.addEventListener("change", calculateTotal);
    quantityInput.addEventListener("input", calculateTotal);

    calculateTotal(); // Initial calculation

    // Handle form submission
    document.getElementById("order-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const size = document.getElementById("size").value;
        const scent = document.getElementById("scent").value;
        const quantity = document.getElementById("quantity").value;
        const specialRequests = document.getElementById("specialRequests").value;

        const orderData = {
            name,
            phone,
            size,
            scent,
            quantity,
            specialRequests
        };

        fetch("https://script.google.com/macros/s/AKfycbyIIBEk9uTpsgG4Oqasby-oxVRW-TB6Op_nHqy5sVUDCK4Vq74x8atLq8VrGC3SIXU7/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(orderData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === "Success") {
                document.getElementById("message").innerText = "Your order has been submitted successfully!";
                document.getElementById("order-form").reset(); // Reset form fields
            } else {
                document.getElementById("message").innerText = "There was an error with your submission.";
            }
        })
        .catch(error => {
            document.getElementById("message").innerText = "Error: " + error.message;
            console.error("Fetch error:", error);
        });
    });
});
