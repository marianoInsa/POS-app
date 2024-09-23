import db from "../../db/database.js";
import IStockOfProductsRepository from "./IStockOfProductsRepository.js";

class StockOfProductsRepository extends IStockOfProductsRepository {
  addStockOfProduct(idProduct) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO stockOfProducts (idProduct) VALUES (?)`;
      db.run(query, [idProduct], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  getStockOfProducts() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM stockOfProducts`;
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getStockOfProductBySku(sku) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM stockOfProducts WHERE sku = ?`;
      db.get(query, [sku], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  deleteStockOfProduct(sku) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE stockOfProducts SET dateDeleted = datetime('now') WHERE sku = ?`;
      db.run(query, [sku], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}

export default StockOfProductsRepository;
