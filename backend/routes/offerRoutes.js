import { Router } from "express";
import OfferController from "../controllers/offerController.js";

const offerController = Router();

offerController
  .route("/")
  .post((req, res) => OfferController.createOffer(req, res))
  .get((req, res) => OfferController.getOffers(req, res));

offerController
  .route("/:id")
  .get((req, res) => OfferController.getOfferById(req, res))
  .patch((req, res) => OfferController.updateOffer(req, res))
  .delete((req, res) => OfferController.deleteOffer(req, res))
  .head((req, res) => OfferController.offerExistsById(req, res));

offerController
  .route("/nombre/:name")
  .get((req, res) => OfferController.getOfferByName(req, res))
  .head((req, res) => OfferController.offersExistsByName(req, res));

export default offerController;
