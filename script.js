document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const size = document.getElementById("size").value;
    const scent = document.getElementById("scent").value;
    const quantity = document.getElementById("quantity").value;
    const specialRequests = document.getElementById("specialRequests").value;

    const orderData = {
        name,
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
            document.getElementById("message").innerText = "Your order has been submitted!";
            document.getElementById("order-form").reset();
        } else {
            document.getElementById("message").innerText = "There was an error with your submission.";
        }
    })
    .catch(error => {
        document.getElementById("message").innerText = "Error: " + error.message;
        console.error("Fetch error: ", error);
    });
});
