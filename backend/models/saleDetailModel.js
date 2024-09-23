class SaleDetailModel {
  constructor(repository) {
    this.repository = repository;
  }
  createSaleDetail(quantity, subtotal, sku, idSale) {
    return this.repository.createSaleDetail(quantity, subtotal, sku, idSale);
  }

  getSalesDetail() {
    return this.repository.getSalesDetail();
  }

  getSaleDetailById(id) {
    return this.repository.getSaleDetailById(id);
  }

  getSalesDetailByIdSale(idSale) {
    return this.repository.getSalesDetailByIdSale(idSale);
  }

  getSaleDetailBySKU(sku) {
    return this.repository.getSaleDetailBySKU(sku);
  }

  updateSaleDetail(id, updatedSaleDetail) {
    return this.repository.updateSaleDetail(id, updatedSaleDetail);
  }

  deleteSaleDetail(id) {
    return this.repository.deleteSaleDetail(id);
  }

  deleteSalesDetailByIdSale(idSale) {
    return this.repository.deleteSalesDetailByIdSale(idSale);
  }

  saleDetailExistsById(id) {
    return this.repository.saleDetailExistsById(id);
  }

  salesDetailExistsByIdSale(idSale) {
    return this.repository.salesDetailExistsByIdSale(idSale);
  }

  salesDetailExistsBySKU(sku) {
    return this.repository.salesDetailExistsBySKU(sku);
  }
}

export default SaleDetailModel;
