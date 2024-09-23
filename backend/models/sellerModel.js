class SellerModel {
  constructor(repository) {
    this.repository = repository;
  }

  createSeller(name, email, password, storeInfo) {
    return this.repository.createSeller(name, email, password, storeInfo);
  }

  getSellers() {
    return this.repository.getSellers();
  }

  getSellerById(id) {
    return this.repository.getSellerById(id);
  }

  getSellerByUsername(name) {
    return this.repository.getSellerByUsername(name);
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

  sellerExistsByUsername(name) {
    return this.repository.sellerExistsByUsername(name);
  }
}

export default SellerModel;
