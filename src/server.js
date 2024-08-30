const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const { createProductTable, populateProducts } = require("./models/product");
const cors = require("cors");

// Cargar variables de entorno desde .env
dotenv.config();

// Middleware para parsear JSON
const app = express();
app.use(express.json());

// Middleware para habilitar CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

(async () => {
  try {
    await createProductTable();
    await populateProducts(
      50,
      { min: 100.0, max: 50000.0 },
      { min: 5, max: 500 }
    );
  } catch (err) {
    console.error("Error al inicializar la base de datos:", err);
  }

  app.use("/api", productRoutes);

  app.get("/", (req, res) => {
    res.send("POS App is running");
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
