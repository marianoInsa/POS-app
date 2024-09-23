import db from "../../db/database.js";
import IProductRepository from "./IProductRepository.js";

class ProductRepositorySQLite extends IProductRepository {
  addProduct(idSeller, name, description, price, category) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO products (idSeller, name, description, price, category) VALUES (?, ?, ?, ?, ?)`;
      db.run(
        query,
        [idSeller, name, description, price, category],
        function (err) {
          if (err) {
            return reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        }
      );
    });
  }

  getProducts() {
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

  getProductById(id) {
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

  getProductByName(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM products WHERE name = ?`;
      db.get(query, [name], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  updateProduct(id, product) {
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

  deleteProduct(id) {
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

  productExistsById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM products WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }

  productExistsByName(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM products WHERE name = ?`;
      db.get(query, [name], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }
}

export default ProductRepositorySQLite;
