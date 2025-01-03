import db from "../../db/database.js";
import ISellerRepository from "./ISellerRepository.js";

class SellerRepository extends ISellerRepository {
  createSeller(username, firstName, lastName, email, password, storeInfo) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO sellers (username, firstName, lastName, email, password, storeInfo) VALUES (?, ?, ?, ?, ?, ?)`;
      db.run(
        query,
        [username, firstName, lastName, email, password, storeInfo],
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

  getSellerByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM sellers WHERE username = ?`;
      db.get(query, [username], (err, row) => {
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

      if (seller.username) {
        updates.push(`username = ?`);
        parametros.push(seller.username);
      }
      if (seller.firstName) {
        updates.push(`firstName = ?`);
        parametros.push(seller.firstName);
      }
      if (seller.lastName) {
        updates.push(`lastName = ?`);
        parametros.push(seller.lastName);
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

  sellerExistsByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM sellers WHERE username = ?`;
      db.get(query, [username], (err, row) => {
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
