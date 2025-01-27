
document.getElementById("userForm").addEventListener("submit", validateForm);




function validateForm(event) {
    event.preventDefault();

    // const name = document.getElementById("name").value;
    const punteo = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    // const dob = document.getElementById("dob").value;
    // let age = parseInt(document.getElementById("age").textContent);

 

    if (!/^\d+$/.test(punteo)) {
        alert("El teléfono debe contener solo números.");
        return;
    }

 

fetch("http://localhost:3000/guardar_punteo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ punteo,email }),
})
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error); // Show error message if any
        } else {
            alert(`Usuario guardado con ID: ${data.id}`);
        }
    })
    .catch(err => {
        console.error("Error al enviar datos:", err);
        alert("Hubo un error al procesar la solicitud.");
    });

}