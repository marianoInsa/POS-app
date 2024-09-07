import db from "../db/database.js";

class ClientModel {
  constructor(db) {
    this.db = db;
  }

  // registro de cliente
  static createClient(username, email, password, registerDate) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO client (username, email, password, registerDate) VALUES (?, ?, ?, ?)`;
      db.run(query, [username, email, password, registerDate], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve({ id: this.lastID, username, email });
        }
      });
    });
  }

  // obtener todos los clientes
  static getClients() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM client`;
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // obtener cliente por nombre de usuario
  static getClientByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM client WHERE username = ?`;
      db.get(query, [username], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // // inicio de sesion de cliente
  // static loginClient(username, password) {
  //   return new Promise((resolve, reject) => {
  //     const query = `SELECT * FROM client WHERE username = ? AND password = ?`;
  //     db.get(query, [username, password], (err, row) => {
  //       if (err) {
  //         return reject(err);
  //       } else {
  //         resolve(row);
  //       }
  //     });
  //   });
  // }

  // actualizar datos del cliente
  static updateClient(id, user) {
    return new Promise((resolve, reject) => {
      const updates = [];
      const parametros = [];

      if (user.username) {
        updates.push(`username = ?`);
        parametros.push(user.username);
      }
      if (user.email) {
        updates.push(`email = ?`);
        parametros.push(user.email);
      }
      if (updates.length === 0) {
        return reject("No se especificaron campos a actualizar");
      }

      const query = `UPDATE client SET ${updates.join(", ")} WHERE id = ?`;
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

  // eliminar cliente
  static deleteClient(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM client WHERE id = ?`;
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

export default ClientModel;
