import { Router } from "express";
import SaleController from "../controllers/saleController.js";

const saleRoutes = Router();

saleRoutes
  .route("/")
  .post((req, res) => SaleController.createSale(req, res))
  .get((req, res) => SaleController.getSales(req, res));

saleRoutes
  .route("/:id")
  .get((req, res) => SaleController.getSaleById(req, res))
  .patch((req, res) => SaleController.updateSale(req, res))
  .delete((req, res) => SaleController.deleteSale(req, res))
  .head((req, res) => SaleController.saleExistsById(req, res));

saleRoutes
  .route("/cliente/:idClient")
  .get((req, res) => SaleController.getSalesByClient(req, res))
  .head((req, res) => SaleController.salesExistsByClient(req, res));

export default saleRoutes;
