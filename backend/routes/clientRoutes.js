import { Router } from "express";
import ClientController from "../controllers/clientController.js";

const router = Router();

router
  .route("/")
  .post((req, res) => ClientController.createClientCT(req, res))
  .get((req, res) => ClientController.getClientsCT(req, res));

router
  .route("/:id")
  .get((req, res) => ClientController.getClientByIdCT(req, res))
  .put((req, res) => ClientController.updateClientCT(req, res))
  .delete((req, res) => ClientController.deleteClientCT(req, res));

router.get("/nombre/:name", (req, res) =>
  ClientController.getClientByUsernameCT(req, res)
);

export default router;
