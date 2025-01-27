
document.getElementById("userForm").addEventListener("submit", validateForm);




function validateForm(event) {
    event.preventDefault();

    // const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    // const dob = document.getElementById("dob").value;
    // let age = parseInt(document.getElementById("age").textContent);

 

    if (!/^\d+$/.test(phone)) {
        alert("El teléfono debe contener solo números.");
        return;
    }

 

    fetch("http://localhost:3000/guardar_punteo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
    })
        .then(response => response.json())
        .then(data => alert(`Usuario guardado con ID: ${data.id}`))
        .catch(err => console.error("Error al enviar datos:", err));
}