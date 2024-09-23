import ClientModel from "../models/clientModel.js";
import ClientRepositorySQLite from "../repositories/client/ClientRepositorySQLite.js";
import bcrypt from "bcrypt";

const clientRepository = new ClientRepositorySQLite();
const clientModel = new ClientModel(clientRepository);

class ClientController {
  static async createClient(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await clientModel.createClient(
        name,
        email,
        hashedPassword
      );
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getClients(req, res) {
    try {
      const clients = await clientModel.getClients();
      res.json(clients);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getClientById(req, res) {
    const id = req.params.id;
    try {
      const client = await clientModel.getClientById(id);
      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.json(client);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getClientByUsername(req, res) {
    const { name } = req.params;
    try {
      const client = await clientModel.getClientByUsername(name);
      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.json(client);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateClient(req, res) {
    const id = req.params.id;
    const updatedClient = req.body;
    try {
      await clientModel.updateClient(id, updatedClient);
      res.json({ message: "Cliente actualizado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteClient(req, res) {
    const id = req.params.id;
    try {
      await clientModel.deleteClient(id);
      res.json({ message: "Cliente eliminado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async clientExistsById(req, res) {
    const id = req.params.id;
    try {
      const clientExists = await clientModel.clientExistsById(id);
      if (!clientExists) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.status(200).json({ message: "Cliente encontrado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async clientExistsByUsername(req, res) {
    const { name } = req.params;
    try {
      const clientExists = await clientModel.clientExistsByUsername(name);
      if (!clientExists) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.status(200).json({ message: "Cliente encontrado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ClientController;
