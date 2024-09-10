import db from "../db/database.js";

class ProductModel {
  constructor(db) {
    this.db = db;
  }

  static addProduct(name, description, price, category) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)`;
      db.run(query, [name, description, price, category], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  static getProducts() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM products`;
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static getProductById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM products WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static updateProduct(id, product) {
    return new Promise((resolve, reject) => {
      const updates = [];
      const parametros = [];

      if (product.name) {
        updates.push(`name = ?`);
        parametros.push(product.name);
      }
      if (product.description) {
        updates.push(`description = ?`);
        parametros.push(product.description);
      }
      if (product.price) {
        updates.push(`price = ?`);
        parametros.push(product.price);
      }
      if (product.category) {
        updates.push(`category = ?`);
        parametros.push(product.category);
      }
      if (updates.length === 0) {
        return reject("No se especificaron campos a actualizar");
      }

      const query = `UPDATE products SET ${updates.join(", ")} WHERE id = ?`;
      parametros.push(id);

      db.run(query, parametros, function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  static deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE products SET dateDeleted = DATETIME('now') WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
}

export default ProductModel;
