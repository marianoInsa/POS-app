const express = require("express");
const { addProduct } = require("../models/product");

const router = express.Router();

router.post("/products", (req, res) => {
  const newProduct = req.body;

  addProduct(newProduct, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result);
  });
});

module.exports = router;
