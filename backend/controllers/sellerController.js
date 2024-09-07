import SellerModel from "../models/sellerModel";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

class SellerController {
  constructor(SellerModel) {
    this.SellerModel = SellerModel;
  }

  static async createSellerCT(req, res) {
    const { username, email, password, storeInfo } = req.body;
    const hashedPassword = await bycrypt.hash(password, 10);
    const registerDate = new Date().toISOString();
    try {
      const seller = await SellerModel.createSeller(
        username,
        email,
        hashedPassword,
        registerDate,
        storeInfo
      );
      res.status(201).json(seller);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async loginSellerCT(req, res) {
    const { username, password } = req.body;
    const seller = await SellerModel.getSellerByUsername(username);
    if (!seller || !(await bycrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ error: "Nombre de usuario o contraseña incorrectos." });
    } else {
      const token = jwt.sign(
        { id: seller.id },
        process.env.JWT_SECRET
        // { expiresIn: "1h", }
      );
      res.json({ token });
    }
  }

  static async updateSellerCT(req, res) {
    const { username, email, storeInfo } = req.body;
    try {
      const seller = await SellerModel.getSellerByUsername(username);
      await SellerModel.updateSeller(seller.id, { username, email, storeInfo });
      res.json({ message: "Vendedor actualizado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default SellerController;
