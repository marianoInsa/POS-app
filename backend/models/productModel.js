import db from "../db/database.js";

class ProductModel {
  constructor(db) {
    this.db = db;
  }

  // metodos CRUD
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

  static getProductsByStock(stock) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM products WHERE stock > ?`;
      db.all(query, [stock], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static addProduct(nombre, precio, stock) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO products (name, price, stock) VALUES (?, ?, ?)`;
      db.run(query, [nombre, precio, stock], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  static deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM products WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
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
      if (product.price) {
        updates.push(`price = ?`);
        parametros.push(product.price);
      }
      if (product.stock) {
        updates.push(`stock = ?`);
        parametros.push(product.stock);
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
}

export default ProductModel;
