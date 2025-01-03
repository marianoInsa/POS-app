class SellerModel {
  constructor(repository) {
    this.repository = repository;
  }

  createSeller(username, firstName, lastName, email, password, storeInfo) {
    return this.repository.createSeller(name, email, password, storeInfo);
  }

  getSellers() {
    return this.repository.getSellers();
  }

  getSellerById(id) {
    return this.repository.getSellerById(id);
  }

  getSellerByUsername(username) {
    return this.repository.getSellerByUsername(username);
  }

  updateSeller(id, seller) {
    return this.repository.updateSeller(id, seller);
  }

  deleteSeller(id) {
    return this.repository.deleteSeller(id);
  }

  sellerExistsById(id) {
    return this.repository.sellerExistsById(id);
  }

  sellerExistsByUsername(username) {
    return this.repository.sellerExistsByUsername(username);
  }
}

export default SellerModel;
