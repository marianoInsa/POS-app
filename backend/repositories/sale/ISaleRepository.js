class ISaleRepository {
  createSale(total, idClient) {
    throw new Error("Metodo no implementado");
  }
  getSales() {
    throw new Error("Metodo no implementado");
  }
  getSaleById(id) {
    throw new Error("Metodo no implementado");
  }
  getSalesByClient(idClient) {
    throw new Error("Metodo no implementado");
  }
  updateSale(id, sale) {
    throw new Error("Metodo no implementado");
  }
  deleteSale(id) {
    throw new Error("Metodo no implementado");
  }
  saleExistsById(id) {
    throw new Error("Metodo no implementado");
  }
  salesExistsByClient(idClient) {
    throw new Error("Metodo no implementado");
  }
}

export default ISaleRepository;
