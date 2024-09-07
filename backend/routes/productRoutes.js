import { Router } from "express";
import ProductController from "../controllers/productController.js";

const router = Router();

router.get("/productos", (req, res) =>
  ProductController.getProductsCT(req, res)
);
router.get("/productos/:id", (req, res) =>
  ProductController.getProductByIdCT(req, res)
);
router.get("/productos/stock/:stock", (req, res) =>
  ProductController.getProductsByStockCT(req, res)
);
router.post("/productos", (req, res) =>
  ProductController.addProductCT(req, res)
);
router.delete("/productos/:id", (req, res) =>
  ProductController.deleteProductCT(req, res)
);
router.put("/productos/:id", (req, res) =>
  ProductController.updateProductCT(req, res)
);

export default router;
