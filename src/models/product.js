const db = require("../db/database");

const createProductTable = () => {
  const sql = `
      CREATE TABLE IF NOT EXISTS products (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT,
         price REAL,
         stock INTEGER
      )
   `;
  db.run(sql);
};

const addProduct = (product, callback) => {
  const sql = `INSERT INTO products (name, price, stock) VALUES (?, ?, ?)`;
  db.run(sql, [product.name, product.price, product.stock], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID });
  });
};

module.exports = { createProductTable, addProduct };
