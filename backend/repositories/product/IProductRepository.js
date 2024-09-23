class IProductRepository {
  addProduct(idSeller, name, description, price, category) {
    throw new Error("Metodo no implementado");
  }

  getProducts() {
    throw new Error("Metodo no implementado");
  }

  getProductById(id) {
    throw new Error("Metodo no implementado");
  }

  getProductByName(name) {
    throw new Error("Metodo no implementado");
  }

  updateProduct(id, product) {
    throw new Error("Metodo no implementado");
  }

  deleteProduct(id) {
    throw new Error("Metodo no implementado");
  }

  productExistsById(id) {
    throw new Error("Metodo no implementado");
  }

  productExistsByName(name) {
    throw new Error("Metodo no implementado");
  }
}

export default IProductRepository;
