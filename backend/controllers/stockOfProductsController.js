import StockOfProductsModel from "../models/stockOfProductsModel.js";
import StockOfProductsRepository from "../repositories/stockOfProducts/StockOfProductsRepositorySQLite.js";

const stockOfProductsRepository = new StockOfProductsRepository();
const stockOfProductsModel = new StockOfProductsModel(
  stockOfProductsRepository
);

class StockOfProductsController {
  static async addStockOfProduct(req, res) {
    const { idProduct } = req.body;
    try {
      const result = await stockOfProductsModel.addStockOfProduct(idProduct);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getStockOfProducts(req, res) {
    try {
      const stockOfProducts = await stockOfProductsModel.getStockOfProducts();
      res.json(stockOfProducts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getStockOfProductBySku(req, res) {
    const { sku } = req.params;
    try {
      const stockOfProduct = await stockOfProductsModel.getStockOfProductBySku(
        sku
      );
      if (!stockOfProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(stockOfProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteStockOfProduct(req, res) {
    const { sku } = req.params;
    try {
      await stockOfProductsModel.deleteStockOfProduct(sku);
      res.json({ message: "Producto eliminado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default StockOfProductsController;
