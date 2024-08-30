const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

async function createProductTable() {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            stock INTEGER NOT NULL
        )`,
      (err) => {
        if (err) {
          console.error("Error creando la tabla de productos:", err);
        } else {
          console.log("Tabla de productos creada exitosamente.");
        }
        resolve();
      }
    );
  });
}

const addProduct = (product, callback) => {
  const quey = `INSERT INTO products (name, price, stock) VALUES (?, ?, ?)`;
  db.run(quey, [product.name, product.price, product.stock], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID });
  });
};

// Funcion para poblar la tabla de productos con datos aleatorios
const generarNombre = (index) => `Producto ${String.fromCharCode(65 + index)}`;

const generarPrecio = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generarStock = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function populateProducts(cantidad, rangoDePrecio, rangoDeStock) {
  return new Promise((resolve, reject) => {
    const products = [];

    for (let i = 0; i < cantidad; i++) {
      const name = generarNombre(i);
      const price = generarPrecio(rangoDePrecio.min, rangoDePrecio.max);
      const stock = generarStock(rangoDeStock.min, rangoDeStock.max);

      products.push({ name, price, stock });
    }

    products.forEach((product) => {
      addProduct(product, (err) => {
        if (err) {
          return `Error agregando productos: ${err}`;
        }
        console.log(`Producto ${product.name} agregado correctamente.`);
        resolve();
      });
    });
    console.log(`Se agregaron ${cantidad} productos a la tabla.`);
  });
}

module.exports = { db, createProductTable, populateProducts };
