import { Router } from "express";
import ClientController from "../controllers/clientController.js";

const clientRouter = Router();

clientRouter
  .route("/")
  .post((req, res) => ClientController.createClient(req, res))
  .get((req, res) => ClientController.getClients(req, res));

clientRouter
  .route("/:id")
  .get((req, res) => ClientController.getClientById(req, res))
  .patch((req, res) => ClientController.updateClient(req, res))
  .delete((req, res) => ClientController.deleteClient(req, res))
  .head((req, res) => ClientController.clientExistsById(req, res));

clientRouter
  .route("/nombre/:username")
  .get((req, res) => ClientController.getClientByUsername(req, res))
  .head((req, res) => ClientController.clientExistsByUsername(req, res));

export default clientRouter;
