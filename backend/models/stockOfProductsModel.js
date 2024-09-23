class StockOfProductsModel {
  constructor(repository) {
    this.repository = repository;
  }

  addStockOfProduct(idProduct) {
    return this.repository.addStockOfProduct(idProduct);
  }

  getStockOfProducts() {
    return this.repository.getStockOfProducts();
  }

  getStockOfProductBySku(sku) {
    return this.repository.getStockOfProductBySku(sku);
  }

  deleteStockOfProduct(sku) {
    return this.repository.deleteStockOfProduct(sku);
  }
}

export default StockOfProductsModel;
