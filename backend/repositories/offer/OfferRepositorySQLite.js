import db from "../../db/database.js";
import IOfferRepository from "./IOfferRepository.js";

class OfferRepositorySQLite extends IOfferRepository {
  createOffer(idProduct, name, description, value) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO offers (idProduct, name, description, value) VALUES (?, ?, ?, ?)`;
      db.run(query, [idProduct, name, description, value], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  getOffers() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM offers`;
      db.all(query, [], (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getOfferById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM offers WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  getOfferByName(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM offers WHERE name = ?`;
      db.get(query, [name], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  updateOffer(id, updatedOffer) {
    return new Promise((resolve, reject) => {
      const updates = [];
      const params = [];

      if (updatedOffer.name) {
        updates.push(`name = ?`);
        params.push(updatedOffer.name);
      }
      if (updatedOffer.description) {
        updates.push(`description = ?`);
        params.push(updatedOffer.description);
      }
      if (updatedOffer.value) {
        updates.push(`value = ?`);
        params.push(updatedOffer.value);
      }
      if (updates.length === 0) {
        return reject("No se especificaron campos a actualizar");
      }

      const query = `UPDATE offers SET ${updates.join(", ")} WHERE id = ?`;
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

  deleteOffer(id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE offers SET dateDeleted = DATETIME('now') WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  offerExistsById(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM offers WHERE id = ?`;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }

  offersExistsByName(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM offers WHERE name = ?`;
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

export default OfferRepositorySQLite;
