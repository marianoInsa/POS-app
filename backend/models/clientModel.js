class ClientModel {
  constructor(repository) {
    this.repository = repository;
  }

  createClient(username, firstName, lastName, email, password) {
    return this.repository.createClient(
      username,
      firstName,
      lastName,
      email,
      password
    );
  }

  getClients() {
    return this.repository.getClients();
  }

  getClientById(id) {
    return this.repository.getClientById(id);
  }

  getClientByUsername(username) {
    return this.repository.getClientByUsername(username);
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

  clientExistsByUsername(username) {
    return this.repository.clientExistsByUsername(username);
  }
}

export default ClientModel;
