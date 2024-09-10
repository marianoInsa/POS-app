import sqlite3 from "sqlite3";
import path from "path";

// Crear una ruta absoluta para la base de datos
const dbPath = path.resolve("./backend/db/database.sqlite3");

// Conectar a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(`Error abriendo la base de datos: ${err.message}`);
    process.exit(1);
  }
});

function cleanDeletedRecords() {
  const tables = ["products", "clients", "sellers"];

  tables.forEach((table) => {
    const query = `DELETE FROM ${table} WHERE dateDeleted IS NOT NULL AND dateDeleted != ''`;

    db.run(query, function (err) {
      if (err) {
        console.error(
          `Error eliminando los registros de la tabla ${table}:`,
          err.message
        );
      } else {
        console.log(`Borrados ${this.changes} registros de ${table}.`);
      }
    });
  });
}

cleanDeletedRecords();
