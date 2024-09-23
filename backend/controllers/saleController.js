import SaleRepositorySQLite from "../repositories/sale/SaleRepositorySQLite.js";
import SaleModel from "../models/saleModel.js";

const saleRepository = new SaleRepositorySQLite();
const saleModel = new SaleModel(saleRepository);

class SaleController {
  static async createSale(req, res) {
    const { total, idClient } = req.body;
    try {
      const result = await saleModel.createSale(total, idClient);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSales(req, res) {
    try {
      const sales = await saleModel.getSales();
      res.json(sales);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSaleById(req, res) {
    const { id } = req.params;
    try {
      const sale = await saleModel.getSaleById(id);
      if (!sale) {
        return res.status(404).json({ error: "Venta no encontrada" });
      }
      res.json(sale);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSalesByClient(req, res) {
    const { idClient } = req.params;
    try {
      const sales = await saleModel.getSalesByClient(idClient);
      if (!sales.length) {
        return res.status(404).json({ error: "Ventas no encontradas" });
      }
      res.json(sales);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateSale(req, res) {
    const { id } = req.params;
    const updatedSale = req.body;
    try {
      await saleModel.updateSale(id, updatedSale);
      res.json({ message: "Venta actualizada correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteSale(req, res) {
    const { id } = req.params;
    try {
      await saleModel.deleteSale(id);
      res.json({ message: "Venta eliminada correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async saleExistsById(req, res) {
    const { id } = req.params;
    try {
      const sale = await saleModel.getSaleById(id);
      if (!sale) {
        return res.status(404).json({ error: "Venta no encontrada" });
      }
      res.json({ message: "Venta encontrada" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async salesExistsByClient(req, res) {
    const { idClient } = req.params;
    try {
      const sales = await saleModel.getSalesByClient(idClient);
      if (!sales.length) {
        return res.status(404).json({ error: "Ventas no encontradas" });
      }
      res.json({ message: "Ventas encontradas" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default SaleController;
