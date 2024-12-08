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

    fetch("https://script.google.com/macros/s/1_Gzrk__JgiShntZqFJH4xmuKJt8SH3ElTZiegPhPAAg/exec", {
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
    });
});
