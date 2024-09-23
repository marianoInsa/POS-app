import db from "../../db/database.js";
import ISaleDetailRepository from "./ISaleDetailRepository.js";

class saleDetailRepositorySQLite extends ISaleDetailRepository {
  createSaleDetail(quantity, subTotal, sku, idSale) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO salesDetail (quantity, subTotal, sku, idSale) VALUES (?, ?, ?, ?)`;
      db.run(query, [quantity, subTotal, sku, idSale], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  getSalesDetail() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM salesDetail`;
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getSaleDetailById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM salesDetail WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  getSalesDetailByIdSale(idSale) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM salesDetail WHERE idSale = ?`;
      db.all(query, [idSale], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getSaleDetailBySKU(sku) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM salesDetail WHERE sku = ?`;
      db.all(query, [sku], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  updateSaleDetail(id, updatedSaleDetail) {
    return new Promise((resolve, reject) => {
      const updates = [];
      const params = [];

      if (updatedSaleDetail.quantity) {
        updates.push("quantity = ?");
        params.push(updatedSaleDetail.quantity);
      }
      if (updatedSaleDetail.subTotal) {
        updates.push("subTotal = ?");
        params.push(updatedSaleDetail.subTotal);
      }
      if (updates.length === 0) {
        return reject("No se especificaron campos a modificar");
      }

      const query = `UPDATE salesDetail SET ${updates.join(", ")} WHERE id = ?`;
      params.push(id);

      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  deleteSaleDetail(id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE salesDetail SET dateDeleted = DATETIME('now') WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  deleteSalesDetailByIdSale(idSale) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE salesDetail SET dateDeleted = DATETIME('now') WHERE idSale = ?`;
      db.run(query, [idSale], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  saleDetailExistsById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM salesDetail WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }

  salesDetailExistsByIdSale(idSale) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM salesDetail WHERE idSale = ?`;
      db.get(query, [idSale], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }

  salesDetailExistsBySKU(sku) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM salesDetail WHERE sku = ?`;
      db.get(query, [sku], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }
}

export default saleDetailRepositorySQLite;
