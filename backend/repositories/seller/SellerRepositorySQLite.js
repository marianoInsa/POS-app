import db from "../../db/database.js";
import ISellerRepository from "./ISellerRepository.js";

class SellerRepository extends ISellerRepository {
  createSeller(name, email, password, storeInfo) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO sellers (name, email, password, storeInfo) VALUES (?, ?, ?, ?)`;
      db.run(query, [name, email, password, storeInfo], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  getSellers() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM sellers`;
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getSellerById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM sellers WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  getSellerByUsername(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM sellers WHERE name = ?`;
      db.get(query, [name], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  updateSeller(id, seller) {
    return new Promise((resolve, reject) => {
      const updates = [];
      const parametros = [];

      if (seller.name) {
        updates.push(`name = ?`);
        parametros.push(seller.name);
      }
      if (seller.email) {
        updates.push(`email = ?`);
        parametros.push(seller.email);
      }
      if (seller.storeInfo) {
        updates.push(`storeInfo = ?`);
        parametros.push(seller.storeInfo);
      }
      if (updates.length === 0) {
        return reject("No se especificaron campos a actualizar");
      }

      const query = `UPDATE sellers SET ${updates.join(", ")} WHERE id = ?`;
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

  deleteSeller(id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE sellers SET dateDeleted = DATETIME('now') WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  sellerExistsById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM sellers WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }

  sellerExistsByUsername(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM sellers WHERE name = ?`;
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

export default SellerRepository;
