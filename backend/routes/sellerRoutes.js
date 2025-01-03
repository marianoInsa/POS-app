import { Router } from "express";
import SellerController from "../controllers/sellerController.js";

const sellerRoutes = Router();

sellerRoutes
  .route("/")
  .post((req, res) => SellerController.createSeller(req, res))
  .get((req, res) => SellerController.getSellers(req, res));

sellerRoutes
  .route("/:id")
  .get((req, res) => SellerController.getSellerById(req, res))
  .patch((req, res) => SellerController.updateSeller(req, res))
  .delete((req, res) => SellerController.deleteSeller(req, res))
  .head((req, res) => SellerController.sellerExistsById(req, res));

sellerRoutes
  .route("/nombre/:username")
  .get((req, res) => SellerController.getSellerByUsername(req, res))
  .head((req, res) => SellerController.sellerExistsByUsername(req, res));

export default sellerRoutes;
