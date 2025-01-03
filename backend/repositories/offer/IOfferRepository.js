class IOfferRepository {
  createOffer(idProduct, name, description, value) {
    throw new Error("Metodo no implementado");
  }

  getOffers() {
    throw new Error("Metodo no implementado");
  }

  getOfferById(id) {
    throw new Error("Metodo no implementado");
  }

  getOfferByName(name) {
    throw new Error("Metodo no implementado");
  }

  updateOffer(id, updatedOffer) {
    throw new Error("Metodo no implementado");
  }

  deleteOffer(id) {
    throw new Error("Metodo no implementado");
  }

  offerExistsById(id) {
    throw new Error("Metodo no implementado");
  }

  offersExistsByName(name) {
    throw new Error("Metodo no implementado");
  }
}

export default IOfferRepository;
