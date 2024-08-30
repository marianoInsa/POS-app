import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { resolve } from "path";

// Configurar la ruta base para el proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta a la base de datos
const dbPath = resolve(__dirname, "database.sqlite3");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar con la base de datos: ", err);
  } else {
    console.log("Conectado a la base de datos SQLite.");
  }
});

export default db;
