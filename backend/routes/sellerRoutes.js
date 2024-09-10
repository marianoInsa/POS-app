import { Router } from "express";
import SellerController from "../controllers/sellerController.js";

const router = Router();

router
  .route("/")
  .post((req, res) => SellerController.createSellerCT(req, res))
  .get((req, res) => SellerController.getSellersCT(req, res));

router
  .route("/:id")
  .get((req, res) => SellerController.getSellerByIdCT(req, res))
  .put((req, res) => SellerController.updateSellerCT(req, res))
  .delete((req, res) => SellerController.deleteSellerCT(req, res));

router.get("/nombre/:name", (req, res) =>
  SellerController.getSellerByUsernameCT(req, res)
);

export default router;
