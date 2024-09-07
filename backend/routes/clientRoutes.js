import { Router } from "express";
import ClientController from "../controllers/clientController";

const router = Router();

router.post("/clientes", (req, res) =>
  ClientController.createClientCT(req, res)
);

router.get("/clientes", (req, res) => ClientController.getClientsCT(req, res));

router.get("/clientes/:username", (req, res) =>
  ClientController.getClientByUsernameCT(req, res)
);

router.put("/clientes/:id", (req, res) =>
  ClientController.updateClientCT(req, res)
);

router.delete("/clientes/:id", (req, res) =>
  ClientController.deleteClientCT(req, res)
);

router.post("/clientes/login", (req, res) =>
  ClientController.loginClientCT(req, res)
);

export default router;
