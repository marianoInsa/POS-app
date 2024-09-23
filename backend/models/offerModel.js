class OfferModel {
  constructor(repository) {
    this.repository = repository;
  }

  createOffer(name, description, value) {
    return this.repository.createOffer(name, description, value);
  }

  getOffers() {
    return this.repository.getOffers();
  }

  getOfferById(id) {
    return this.repository.getOfferById(id);
  }

  getOfferByName(name) {
    return this.repository.getOfferByName(name);
  }

  updateOffer(id, updatedOffer) {
    return this.repository.updateOffer(id, updatedOffer);
  }

  deleteOffer(id) {
    return this.repository.deleteOffer(id);
  }

  offerExistsById(id) {
    return this.repository.offerExistsById(id);
  }

  offersExistsByName(name) {
    return this.repository.offersExistsByName(name);
  }
}

export default OfferModel;
