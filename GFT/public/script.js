document.getElementById("order-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        size: document.getElementById("size").value,
        scent: document.getElementById("scent").value,
        quantity: document.getElementById("quantity").value,
    };

    try {
        const response = await fetch("/.netlify/functions/process-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        document.getElementById("message").innerText = result.message;
    } catch (error) {
        console.error("Error submitting order:", error);
        document.getElementById("message").innerText = "Failed to submit order.";
    }
});
