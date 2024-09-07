import ClientModel from "../models/clientModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class ClientController {
  constructor(ClientModel) {
    this.ClientModel = ClientModel;
  }

  static async createClientCT(req, res) {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const registerDate = new Date().toISOString();
    try {
      const client = await ClientModel.createClient(
        username,
        email,
        hashedPassword,
        registerDate
      );
      res.status(201).json(client);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getClientsCT(req, res) {
    try {
      const clients = await ClientModel.getClients();
      res.json(clients);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getClientByUsernameCT(req, res) {
    const { username } = req.params;
    try {
      const client = await ClientModel.getClientByUsername(username);
      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.json(client);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async loginClientCT(req, res) {
    const { username, password } = req.body;
    const client = await ClientModel.getClientByUsername(username);
    if (!client || !(await bcrypt.compare(password, client.password))) {
      return res
        .status(401)
        .json({ error: "Nombre de usuario o contraseña incorrectos." });
    } else {
      const token = jwt.sign(
        { id: client.id },
        process.env.JWT_SECRET
        // { expiresIn: "1h", } // omito por ahora, pero no es recomendable
      );
      res.json({ token });
    }
  }

  static async updateClientCT(req, res) {
    const id = req.params.id;
    const updateClient = req.body;
    try {
      await ClientModel.updateClient(id, updateClient);
      res.json({ message: "Cliente actualizado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteClientCT(req, res) {
    const id = req.params.id;
    try {
      await ClientModel.deleteClient(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ClientController;
