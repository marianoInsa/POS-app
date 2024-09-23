import { Router } from "express";
import StockOfProductsController from "../controllers/stockOfProductsController.js";

const stockRouter = Router();

stockRouter
  .route("/")
  .post((req, res) => StockOfProductsController.addStockOfProduct(req, res))
  .get((req, res) => StockOfProductsController.getStockOfProducts(req, res));

stockRouter
  .route("/:sku")
  .get((req, res) => StockOfProductsController.getStockOfProductBySku(req, res))
  .delete((req, res) =>
    StockOfProductsController.deleteStockOfProduct(req, res)
  );

export default stockRouter;
