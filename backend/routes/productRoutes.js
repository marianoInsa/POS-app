import { Router } from "express";
import ProductController from "../controllers/productController.js";

const productRouter = Router();

productRouter
  .route("/")
  .post((req, res) => ProductController.addProduct(req, res))
  .get((req, res) => ProductController.getProducts(req, res));

productRouter
  .route("/:id")
  .get((req, res) => ProductController.getProductById(req, res))
  .patch((req, res) => ProductController.updateProduct(req, res))
  .delete((req, res) => ProductController.deleteProduct(req, res))
  .head((req, res) => ProductController.productExistsById(req, res));

productRouter
  .route("/nombre/:name")
  .get((req, res) => ProductController.getProductByName(req, res))
  .head((req, res) => ProductController.productExistsByName(req, res));

export default productRouter;
