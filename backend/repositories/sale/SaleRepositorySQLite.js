import db from "../../db/database.js";
import ISaleRepository from "./ISaleRepository.js";

class SaleRepositorySQLite extends ISaleRepository {
  createSale(total, idClient) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO sales (total, idClient) VALUES (?, ?)`;
      db.run(query, [total, idClient], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }
  getSales() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM sales`;
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  getSaleById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM sales WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  getSalesByClient(idClient) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM sales WHERE idClient = ?`;
      db.all(query, [idClient], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  updateSale(id, updatedTotal) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE sales SET total = ? WHERE id = ?`;
      db.run(query, [updatedTotal.total, id], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
  deleteSale(id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE sales SET dateDeleted = DATETIME('now') WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
  saleExistsById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM sales WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }
  salesExistsByClient(idClient) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM sales WHERE idClient = ?`;
      db.get(query, [idClient], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }
}

export default SaleRepositorySQLite;
