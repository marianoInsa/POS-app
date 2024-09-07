import db from "../db/database.js";

class SellerModel {
  constructor(db) {
    super(db);
  }

  // registro de vendedor
  static createSeller(username, email, password, registerDate, storeInfo) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO sellers (username, email, password, registerDate, storeInfo) VALUES (?, ?, ?, ?, ?)`;
      db.run(
        query,
        [username, email, password, registerDate, storeInfo],
        function (err) {
          if (err) {
            return reject(err);
          } else {
            resolve({ id: this.lastID, username, email });
          }
        }
      );
    });
  }

  // // inicio de sesion de vendedor
  // static loginSeller(username, password) {
  //   return new Promise((resolve, reject) => {
  //     const query = `SELECT * FROM sellers WHERE username = ? AND password = ?`;
  //     db.get(query, [username, password], (err, row) => {
  //       if (err) {
  //         return reject(err);
  //       } else {
  //         resolve(row);
  //       }
  //     });
  //   });
  // }

  static getSellers() {
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

  static getSellerByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM seller WHERE username = ?`;
      db.get(query, [username], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // actualizar datos del vendedor
  static updateSeller(id, seller) {
    return new Promise((resolve, reject) => {
      const updates = [];
      const parametros = [];

      if (seller.username) {
        updates.push(`username = ?`);
        parametros.push(seller.username);
      }
      if (seller.email) {
        updates.push(`email = ?`);
        parametros.push(seller.email);
      }
      if (seller.storeInfo) {
        updates.push(`storeInfo = ?`);
        parametros.push(seller.storeInfo);
      }

      parametros.push(id);

      const query = `UPDATE sellers SET ${updates.join(", ")} WHERE id = ?`;
      db.run(query, parametros, function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  // eliminar vendedor
  static deleteSeller(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM sellers WHERE id = ?`;
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

export default SellerModel;
