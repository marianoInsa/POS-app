class IClientRepository {
  createClient(name, email, password) {
    throw new Error("Metodo no implementado");
  }

  getClients() {
    throw new Error("Metodo no implementado");
  }

  getClientById(id) {
    throw new Error("Metodo no implementado");
  }

  getClientByUsername(name) {
    throw new Error("Metodo no implementado");
  }

  updateClient(id, user) {
    throw new Error("Metodo no implementado");
  }

  deleteClient(id) {
    throw new Error("Metodo no implementado");
  }

  clientExistsById(id) {
    throw new Error("Metodo no implementado");
  }

  clientExistsByUsername(name) {
    throw new Error("Metodo no implementado");
  }
}

export default IClientRepository;
