import express, { json } from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { config } from "dotenv";
import db from "./db/database.js";
import productRoutes from "./routes/productRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import stockOfProductsRoutes from "./routes/stockOfProductsRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import saleDetailRoutes from "./routes/saleDetailRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";

// Configurar la ruta base para el proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para parsear JSON
const app = express();
app.use(json());

// Cargar variables de entorno desde .env
config();

// Middleware para habilitar CORS
import cors from "cors";
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Realizar migraciones
function runMigrations() {
  const migrationsPath = path.resolve(__dirname, "migrations");
  fs.readdirSync(migrationsPath).forEach((file) => {
    const migration = fs.readFileSync(path.join(migrationsPath, file), "utf8");
    db.exec(migration, (err) => {
      if (err) {
        console.error(`Error al ejecutar migración: ${file}`, err.message);
      } else {
        console.log(`Migración ${file} ejecutada correctamente.`);
      }
    });
  });
}
runMigrations();

app.use("/api/productos", productRoutes);
app.use("/api/clientes", clientRoutes);
app.use("/api/vendedores", sellerRoutes);
app.use("/api/stock", stockOfProductsRoutes);
app.use("/api/ventas", saleRoutes);
app.use("/api/detalle-venta", saleDetailRoutes);
app.use("/api/ofertas", offerRoutes);

app.get("/", (req, res) => {
  res.send("POS App is running");
});

const PORT = process.env.PUBLIC_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
