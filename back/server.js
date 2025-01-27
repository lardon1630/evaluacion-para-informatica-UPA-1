const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "Ujsd#hfQ@s_15",
    database: "evaluacion_angel_de_leon",
});

// app.post("/guardar_usuario", (req, res) => {
//     const { name, phone, email, dob } = req.body;

//     if (!name || !phone || !email || !dob) {
//         return res.status(400).json({ error: "Faltan datos requeridos." });
//     }

//     const today = new Date();
//     const birthDate = new Date(dob);
//     const age = today.getFullYear() - birthDate.getFullYear();

//     if (age < 18) {
//         return res.status(400).json({ error: "Debe ser mayor de edad." });
//     }

//     const creationDate = today.toISOString().split("T")[0];
//     db.query(
//         "INSERT INTO Usuario (nombre, fecha, telefono, correo, creacion, EstadoUsuarioId) VALUES (?, ?, ?, ?, ?, ?)",
//         [name, dob, phone, email, creationDate, 1],
//         (err, result) => {
//             if (err) return res.status(500).json({ error: "Error al guardar el usuario." });
//             res.json({ id: result.insertId });
//         }
//     );
// });

app.post("/guardar_punteo", (req, res) => {
    const { email, phone } = req.body;

    if (  !email || !phone ) {
        return res.status(400).json({ error: "Faltan datos requeridos." });
    }

    // const today = new Date();
    // const birthDate = new Date(dob);
    // const age = today.getFullYear() - birthDate.getFullYear();

    // if (age < 18) {
    //     return res.status(400).json({ error: "Debe ser mayor de edad." });
    // }

    // const creationDate = today.toISOString().split("T")[0];
    db.query(
        "INSERT INTO punteo_usuario ( correo,telefono, EstadoUsuarioId) VALUES (?, ?, ?, ?, ?)",
        [ phone, email, 1],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error al guardar el usuario." });
            res.json({ id: result.insertId });
        }
    );
});

// app.get("/ejecutar_reporte/:reporte", (req, res) => {
//     const reporte = req.params.reporte;

//     if (!reporte) {
//         return res.status(500).json({ error: "Código de reporte no válido." });
//     }

//     if (reporte === "todos_los_usuarios") {
//         db.query(
//             "SELECT u.id, u.nombre, u.telefono, e.titulo AS estado FROM Usuario u JOIN EstadoUsuario e ON u.EstadoUsuarioId = e.id",
//             (err, results) => {
//                 if (err) return res.status(500).json({ error: "Error al generar reporte." });
//                 res.json(results);
//             }
//         );
//     } else if (reporte === "usuarios_creados_hoy") {
//         const today = new Date().toISOString().split("T")[0];
//         db.query(
//             "SELECT * FROM Usuario WHERE creacion = ?",
//             [today],
//             (err, results) => {
//                 if (err) return res.status(500).json({ error: "Error al generar reporte." });
//                 res.json(results);
//             }
//         );
//     } else if (reporte === "usuarios_creados_ayer") {
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         const formattedDate = yesterday.toISOString().split("T")[0];

//         db.query(
//             "SELECT * FROM Usuario WHERE creacion = ?",
//             [formattedDate],
//             (err, results) => {
//                 if (err) return res.status(500).json({ error: "Error al generar reporte." });
//                 res.json(results);
//             }
//         );
//     } else {
//         res.status(500).json({ error: "Reporte no reconocido." });
//     }
// });


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));



