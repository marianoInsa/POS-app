import OfferModel from "../models/offerModel.js";
import OfferRepositorySQLite from "../repositories/offer/OfferRepositorySQLite.js";

const offerRepository = new OfferRepositorySQLite();
const offerModel = new OfferModel(offerRepository);

class OfferController {
  static async createOffer(req, res) {
    const { idProduct, name, description, value } = req.body;
    try {
      const result = await offerModel.createOffer(
        idProduct,
        name,
        description,
        value
      );
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getOffers(req, res) {
    try {
      const offers = await offerModel.getOffers();
      res.json(offers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getOfferById(req, res) {
    const { id } = req.params;
    try {
      const offer = await offerModel.getOfferById(id);
      if (!offer) {
        return res.status(404).json({ error: "Oferta no encontrada" });
      }
      res.json(offer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getOfferByName(req, res) {
    const { name } = req.params;
    try {
      const offer = await offerModel.getOfferByName(name);
      if (!offer) {
        return res.status(404).json({ error: "Oferta no encontrada" });
      }
      res.json(offer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateOffer(req, res) {
    const { id } = req.params;
    const updatedOffer = req.body;
    try {
      await offerModel.updateOffer(id, updatedOffer);
      res.json({ message: "Oferta actualizada correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteOffer(req, res) {
    const { id } = req.params;
    try {
      await offerModel.deleteOffer(id);
      res.json({ message: "Oferta eliminada correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async offerExistsById(req, res) {
    const { id } = req.params;
    try {
      const offer = await offerModel.offerExistsById(id);
      if (!offer) {
        return res.status(404).json({ message: "Oferta no encontrada" });
      }
      res.json({ message: "Oferta encontrada" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async offersExistsByName(req, res) {
    const { name } = req.params;
    try {
      const offer = await offerModel.offersExistsByName(name);
      if (!offer) {
        return res.status(404).json({ message: "Oferta no encontrada" });
      }
      res.json({ message: "Oferta encontrada" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default OfferController;
