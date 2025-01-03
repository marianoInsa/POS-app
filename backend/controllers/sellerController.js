import SellerModel from "../models/sellerModel.js";
import SellerRepository from "../repositories/seller/SellerRepositorySQLite.js";
import bcrypt from "bcrypt";

const sellerRepository = new SellerRepository();
const sellerModel = new SellerModel(sellerRepository);

class SellerController {
  static async createSeller(req, res) {
    const { username, firstName, lastName, email, password, storeInfo } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await sellerModel.createSeller(
        username,
        firstName,
        lastName,
        email,
        hashedPassword,
        storeInfo
      );
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSellers(req, res) {
    try {
      const sellers = await sellerModel.getSellers();
      res.json(sellers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSellerById(req, res) {
    const id = req.params.id;
    try {
      const seller = await sellerModel.getSellerById(id);
      if (!seller) {
        return res.status(404).json({ error: "Vendedor no encontrado" });
      }
      res.json(seller);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSellerByUsername(req, res) {
    const { username } = req.params;
    try {
      const seller = await sellerModel.getSellerByUsername(username);
      if (!seller) {
        return res.status(404).json({ error: "Vendedor no encontrado" });
      }
      res.json(seller);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateSeller(req, res) {
    const id = req.params.id;
    const updatedSeller = req.body;
    try {
      await sellerModel.updateSeller(id, updatedSeller);
      res.json({ message: "Vendedor actualizado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteSeller(req, res) {
    const id = req.params.id;
    try {
      await sellerModel.deleteSeller(id);
      res.json({ message: "Vendedor eliminado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async sellerExistsById(req, res) {
    const id = req.params.id;
    try {
      const seller = await sellerModel.getSellerById(id);
      if (!seller) {
        return res.status(404).json({ error: "Vendedor no encontrado" });
      }
      res.json({ message: "Vendedor encontrado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async sellerExistsByUsername(req, res) {
    const { username } = req.params;
    try {
      const seller = await sellerModel.getSellerByUsername(username);
      if (!seller) {
        return res.status(404).json({ error: "Vendedor no encontrado" });
      }
      res.json({ message: "Vendedor encontrado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default SellerController;
