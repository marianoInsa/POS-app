class ISellerRepository {
  createSeller(name, email, password, storeInfo) {
    throw new Error("Metodo no implementado");
  }

  getSellers() {
    throw new Error("Metodo no implementado");
  }

  getSellerById(id) {
    throw new Error("Metodo no implementado");
  }

  getSellerByUsername(name) {
    throw new Error("Metodo no implementado");
  }

  updateSeller(id, seller) {
    throw new Error("Metodo no implementado");
  }

  deleteSeller(id) {
    throw new Error("Metodo no implementado");
  }

  sellerExistsById(id) {
    throw new Error("Metodo no implementado");
  }

  sellerExistsByUsername(name) {
    throw new Error("Metodo no implementado");
  }
}

export default ISellerRepository;
