class SaleModel {
  constructor(repository) {
    this.repository = repository;
  }
  createSale(total, idClient) {
    return this.repository.createSale(total, idClient);
  }
  getSales() {
    return this.repository.getSales();
  }
  getSaleById(id) {
    return this.repository.getSaleById(id);
  }
  getSalesByClient(idClient) {
    return this.repository.getSalesByClient(idClient);
  }
  updateSale(id, sale) {
    return this.repository.updateSale(id, sale);
  }
  deleteSale(id) {
    return this.repository.deleteSale(id);
  }
  saleExistsById(id) {
    return this.repository.saleExistsById(id);
  }
  salesExistsByClient(idClient) {
    return this.repository.salesExistsByClient(idClient);
  }
}

export default SaleModel;
