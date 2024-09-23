import db from "../../db/database.js";
import IClientRepository from "./IClientRepository.js";

class ClientRepositorySQLite extends IClientRepository {
  createClient(name, email, password) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO clients (name, email, password) VALUES (?, ?, ?)`;
      db.run(query, [name, email, password], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
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

  getClientByUsername(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM clients WHERE name = ?`;
      db.get(query, [name], (err, row) => {
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

      if (user.name) {
        updates.push(`name = ?`);
        parametros.push(user.name);
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

  clientExistsByUsername(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM clients WHERE name = ?`;
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

export default ClientRepositorySQLite;
