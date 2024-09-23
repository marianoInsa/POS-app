class ProductModel {
  constructor(repository) {
    this.repository = repository;
  }

  addProduct(idSeller, name, description, price, category) {
    return this.repository.addProduct(
      idSeller,
      name,
      description,
      price,
      category
    );
  }

  getProducts() {
    return this.repository.getProducts();
  }

  getProductById(id) {
    return this.repository.getProductById(id);
  }

  getProductByName(name) {
    return this.repository.getProductByName(name);
  }

  updateProduct(id, product) {
    return this.repository.updateProduct(id, product);
  }

  deleteProduct(id) {
    return this.repository.deleteProduct(id);
  }

  productExistsById(id) {
    return this.repository.productExistsById(id);
  }

  productExistsByName(name) {
    return this.repository.productExistsByName(name);
  }
}

export default ProductModel;
