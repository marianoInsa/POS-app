const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const productRoutes = require("./routes/productRoutes");

// Cargar variables de entorno desde .env
dotenv.config();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir la aplicación de Svelte
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Middleware para manejar errores
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Simple ruta para verificar que el servidor está corriendo
app.get("/", (req, res) => {
  res.send("POS App is running");
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Rutas de la API
app.use("/api", productRoutes);
