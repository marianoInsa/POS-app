import { Router } from "express";
import SaleDetailController from "../controllers/saleDetailController.js";

const saleDetailRouter = Router();

saleDetailRouter
  .route("/")
  .get((req, res) => SaleDetailController.getSalesDetail(req, res))
  .post((req, res) => SaleDetailController.createSaleDetail(req, res));

saleDetailRouter
  .route("/:id")
  .get((req, res) => SaleDetailController.getSaleDetailById(req, res))
  .patch((req, res) => SaleDetailController.updateSaleDetail(req, res))
  .delete((req, res) => SaleDetailController.deleteSaleDetail(req, res))
  .head((req, res) => SaleDetailController.saleDetailExistsById(req, res));

saleDetailRouter
  .route("/venta/:idSale")
  .get((req, res) => SaleDetailController.getSalesDetailByIdSale(req, res))
  .head((req, res) => SaleDetailController.salesDetailExistsByIdSale(req, res));

saleDetailRouter
  .route("/sku/:sku")
  .get((req, res) => SaleDetailController.getSaleDetailBySKU(req, res))
  .head((req, res) => SaleDetailController.salesDetailExistsBySKU(req, res));

export default saleDetailRouter;
