import saleDetailRepositorySQLite from "../repositories/saleDetail/SaleDetailRepositorySQLite.js";
import SaleDetailModel from "../models/saleDetailModel.js";

const saleDetailRepository = new saleDetailRepositorySQLite();
const saleDetailModel = new SaleDetailModel(saleDetailRepository);

class SaleDetailController {
  static async createSaleDetail(req, res) {
    const { quantity, subTotal, sku, idSale } = req.body;
    try {
      const result = await saleDetailModel.createSaleDetail(
        quantity,
        subTotal,
        sku,
        idSale
      );
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSalesDetail(req, res) {
    try {
      const salesDetail = await saleDetailModel.getSalesDetail();
      res.json(salesDetail);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSaleDetailById(req, res) {
    const { id } = req.params;
    try {
      const saleDetail = await saleDetailModel.getSaleDetailById(id);
      if (!saleDetail) {
        return res
          .status(404)
          .json({ error: "Detalle de venta no encontrado" });
      }
      res.json(saleDetail);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSalesDetailByIdSale(req, res) {
    const { idSale } = req.params;
    try {
      const salesDetail = await saleDetailModel.getSalesDetailByIdSale(idSale);
      if (!salesDetail.length) {
        return res
          .status(404)
          .json({ error: "Detalles de venta no encontrados" });
      }
      res.json(salesDetail);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSaleDetailBySKU(req, res) {
    const { sku } = req.params;
    try {
      const saleDetail = await saleDetailModel.getSaleDetailBySKU(sku);
      if (!saleDetail.length) {
        return res
          .status(404)
          .json({ error: "Detalle de venta no encontrado" });
      }
      res.json(saleDetail);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateSaleDetail(req, res) {
    const { id } = req.params;
    const updatedSaleDetail = req.body;
    try {
      await saleDetailModel.updateSaleDetail(id, updatedSaleDetail);
      res.json({ message: "Detalle de venta actualizado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteSaleDetail(req, res) {
    const { id } = req.params;
    try {
      await saleDetailModel.deleteSaleDetail(id);
      res.json({ message: "Detalle de venta eliminado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteSalesDetailByIdSale(req, res) {
    const { idSale } = req.params;
    try {
      await saleDetailModel.deleteSalesDetailByIdSale(idSale);
      res.json({ message: "Detalles de venta eliminados correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async saleDetailExistsById(req, res) {
    const { id } = req.params;
    try {
      const saleDetail = await saleDetailModel.saleDetailExistsById(id);
      if (!saleDetail) {
        return res
          .status(404)
          .json({ error: "Detalle de venta no encontrado" });
      }
      res.json({ message: "Detalle de venta encontrado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async salesDetailExistsByIdSale(req, res) {
    const { idSale } = req.params;
    try {
      const saleDetail = await saleDetailModel.salesDetailExistsByIdSale(
        idSale
      );
      if (!saleDetail) {
        return res
          .status(404)
          .json({ error: "Detalle de venta no encontrado" });
      }
      res.json({ message: "Detalle de venta encontrado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async salesDetailExistsBySKU(req, res) {
    const { sku } = req.params;
    try {
      const saleDetail = await saleDetailModel.salesDetailExistsBySKU(sku);
      if (!saleDetail) {
        return res
          .status(404)
          .json({ error: "Detalle de venta no encontrado" });
      }
      res.json({ message: "Detalle de venta encontrado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default SaleDetailController;
