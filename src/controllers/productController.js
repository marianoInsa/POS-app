const db = require("../db/database");

const getProducts = (req, res) => {
  const sql = `SELECT name, price FROM products WHERE stock > 10`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
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

const deleteProduct = (id, callback) => {
  const sql = `DELETE FROM products WHERE id = ?`;
  db.run(sql, id, function (err) {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
};

const updateProduct = (id, updatedProduct, callback) => {
  const sql = `UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?`;
  db.run(
    sql,
    [updatedProduct.name, updatedProduct.price, updatedProduct.stock, id],
    function (err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    }
  );
};

module.exports = { getProducts, addProduct, deleteProduct, updateProduct };
