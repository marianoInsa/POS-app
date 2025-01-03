import db from "../../db/database.js";
import IClientRepository from "./IClientRepository.js";

class ClientRepositorySQLite extends IClientRepository {
  createClient(username, firstName, lastName, email, password) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO clients (username, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)`;
      db.run(
        query,
        [username, firstName, lastName, email, password],
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
  getClients() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM clients`;
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getClientById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM clients WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  getClientByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM clients WHERE username = ?`;
      db.get(query, [username], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  updateClient(id, user) {
    return new Promise((resolve, reject) => {
      const updates = [];
      const parametros = [];

      if (user.username) {
        updates.push(`username = ?`);
        parametros.push(user.username);
      }
      if (user.firstName) {
        updates.push(`firstName = ?`);
        parametros.push(user.firstName);
      }
      if (user.lastName) {
        updates.push(`lastName = ?`);
        parametros.push(user.lastName);
      }
      if (user.email) {
        updates.push(`email = ?`);
        parametros.push(user.email);
      }
      if (updates.length === 0) {
        return reject("No se especificaron campos a actualizar");
      }

      const query = `UPDATE clients SET ${updates.join(", ")} WHERE id = ?`;
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

  deleteClient(id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE clients SET dateDeleted = DATETIME('now') WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  clientExistsById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM clients WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }

  clientExistsByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM clients WHERE username = ?`;
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

export default ClientRepositorySQLite;
