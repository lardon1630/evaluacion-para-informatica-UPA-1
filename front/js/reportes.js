document.querySelectorAll("#reporte-lista button").forEach(button => {
    button.addEventListener("click", () => {
        const reporte = button.getAttribute("data-reporte");
        fetchReporte(reporte);
    });
});

function fetchReporte(reporte) {
    fetch(`http://localhost:3000/ejecutar_reporte/${reporte}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener el reporte.");
            return response.json();
        })
        .then(data => {
            document.getElementById("reporte-resultados").textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("reporte-resultados").textContent = "Error al obtener datos.";
        });
}
