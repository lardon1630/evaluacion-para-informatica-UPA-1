document.getElementById("dob").addEventListener("change", calculateAge);
document.getElementById("userForm").addEventListener("submit", validateForm);

function calculateAge() {
    const dob = new Date(document.getElementById("dob").value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    document.getElementById("age").textContent = age;
}

function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("dob").value;
    let age = parseInt(document.getElementById("age").textContent);

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("El nombre debe contener solo letras.");
        return;
    }

    if (!/^\d+$/.test(phone)) {
        alert("El teléfono debe contener solo números.");
        return;
    }

    if (age < 18) {
        alert("Debe ser mayor de edad.");
        return;
    }

    fetch("http://localhost:3000/guardar_usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, dob }),
    })
        .then(response => response.json())
        .then(data => alert(`Usuario guardado con ID: ${data.id}`))
        .catch(err => console.error("Error al enviar datos:", err));
}
