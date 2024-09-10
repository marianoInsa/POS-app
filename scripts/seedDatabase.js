import sqlite3 from "sqlite3";
import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
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

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0
  );`);

  async function populateDatabase() {
    const ansewrs = await inquirer.prompt([
      {
        type: "number",
        name: "cantRegistros",
        message: "¿Cuántos registros desea generar?",
        validate: (value) => {
          return value > 0 ? true : "Ingrese un valor mayor a 0";
        },
      },
    ]);

    const stmt = db.prepare(
      `INSERT INTO products (name, price, stock) VALUES (?, ?, ?)`
    );
    for (let i = 0; i < ansewrs.cantRegistros; i++) {
      const name = faker.commerce.productName();
      const price = faker.commerce.price({ min: 50.0, max: 50000.0 });
      const stock = faker.datatype.number({ min: 1, max: 100 });

      stmt.run(name, price, stock, (error) => {
        if (error) {
          console.error(`Error al insertar el registro: ${error.message}`);
        }
      });
    }
    stmt.finalize();
    console.log(`Se han insertado ${ansewrs.cantRegistros} registros.`);
  }

  populateDatabase().then(() => db.close());
});
