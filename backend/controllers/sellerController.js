import SellerModel from "../models/sellerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class SellerController {
  constructor(SellerModel) {
    this.SellerModel = SellerModel;
  }

  static async createSellerCT(req, res) {
    const { name, email, password, storeInfo } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const seller = await SellerModel.createSeller(
        name,
        email,
        hashedPassword,
        storeInfo
      );
      res.status(201).json(seller);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSellersCT(req, res) {
    try {
      const sellers = await SellerModel.getSellers();
      res.json(sellers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSellerByIdCT(req, res) {
    const id = req.params.id;
    try {
      const seller = await SellerModel.getSellerById(id);
      if (!seller) {
        return res.status(404).json({ error: "Vendedor no encontrado" });
      }
      res.json(seller);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSellerByUsernameCT(req, res) {
    const { name } = req.params;
    try {
      const seller = await SellerModel.getSellerByUsername(name);
      if (!seller) {
        return res.status(404).json({ error: "Vendedor no encontrado" });
      }
      res.json(seller);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async loginSellerCT(req, res) {
    const { name, password } = req.body;
    try {
      const seller = await SellerModel.getSellerByUsername(name);
      if (!seller || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(401)
          .json({ error: "Nombre de usuario o contraseña incorrectos." });
      }

      const token = jwt.sign({ id: seller.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateSellerCT(req, res) {
    const id = req.params.id;
    const updatedSeller = req.body;
    try {
      await SellerModel.updateSeller(id, updatedSeller);
      res.json({ message: "Vendedor actualizado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteSellerCT(req, res) {
    const id = req.params.id;
    try {
      await SellerModel.deleteSeller(id);
      res.json({ message: "Vendedor eliminado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default SellerController;
