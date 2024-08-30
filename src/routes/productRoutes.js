const express = require("express");
const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

const { db } = require("../models/product");

// Obtener productos con stock mayor a 10 unidades
router.get("/productos", (req, res) => {
  getProducts(req, res);
});

// Añadir un nuevo producto
router.post("/productos", (req, res) => {
  const newProduct = req.body;
  addProduct(newProduct, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result);
  });
});

// Eliminar un producto por ID
router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  deleteProduct(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
});

// Modificar un producto por ID
router.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  updateProduct(id, updatedProduct, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Producto actualizado correctamente!" });
  });
});

module.exports = router;
