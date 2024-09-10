import { Router } from "express";
import ProductController from "../controllers/productController.js";

const router = Router();

router
  .route("/")
  .post((req, res) => ProductController.addProductCT(req, res))
  .get((req, res) => ProductController.getProductsCT(req, res));

router
  .route("/:id")
  .get((req, res) => ProductController.getProductByIdCT(req, res))
  .put((req, res) => ProductController.updateProductCT(req, res))
  .delete((req, res) => ProductController.deleteProductCT(req, res));

export default router;
