class ClientModel {
  constructor(repository) {
    this.repository = repository;
  }

  createClient(name, email, password) {
    return this.repository.createClient(name, email, password);
  }

  getClients() {
    return this.repository.getClients();
  }

  getClientById(id) {
    return this.repository.getClientById(id);
  }

  getClientByUsername(name) {
    return this.repository.getClientByUsername(name);
  }

  updateClient(id, user) {
    return this.repository.updateClient(id, user);
  }

  deleteClient(id) {
    return this.repository.deleteClient(id);
  }

  clientExistsById(id) {
    return this.repository.clientExistsById(id);
  }

  clientExistsByUsername(name) {
    return this.repository.clientExistsByUsername(name);
  }
}

export default ClientModel;
