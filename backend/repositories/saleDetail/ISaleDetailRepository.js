class ISaleDetailRepository {
  createSaleDetail(quantity, subTotal, sku, idSale) {
    throw new Error("Metodo no implementado");
  }

  getSalesDetail() {
    throw new Error("Metodo no implementado");
  }

  getSaleDetailById(id) {
    throw new Error("Metodo no implementado");
  }

  getSaleDetailByIdSale(idSale) {
    throw new Error("Metodo no implementado");
  }

  getSaleDetailBySKU(sku) {
    throw new Error("Metodo no implementado");
  }

  updateSaleDetail(id, saleDetail) {
    throw new Error("Metodo no implementado");
  }

  deleteSaleDetail(id) {
    throw new Error("Metodo no implementado");
  }

  deleteSalesDetailByIdSale(idSale) {
    throw new Error("Metodo no implementado");
  }

  saleDetailExistsById(id) {
    throw new Error("Metodo no implementado");
  }

  salesDetailExistsByIdSale(idSale) {
    throw new Error("Metodo no implementado");
  }

  salesDetailExistsBySKU(sku) {
    throw new Error("Metodo no implementado");
  }
}

export default ISaleDetailRepository;
