document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    fetch('https://script.google.com/macros/s/1_Gzrk__JgiShntZqFJH4xmuKJt8SH3ElTZiegPhPAAg/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('message').textContent = 'Order submitted successfully!';
        event.target.reset();
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Error submitting order. Please try again.';
        console.error(error);
    });
});
