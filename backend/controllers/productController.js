import ProductModel from "../models/productModel.js";
import ProductRepositorySQLite from "../repositories/product/ProductRepositorySQLite.js";

const productRepository = new ProductRepositorySQLite();
const productModel = new ProductModel(productRepository);

class ProductController {
  static async addProduct(req, res) {
    const { idSeller, name, description, price, category } = req.body;
    try {
      const result = await productModel.addProduct(
        idSeller,
        name,
        description,
        price,
        category
      );
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getProducts(req, res) {
    try {
      const products = await productModel.getProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await productModel.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getProductByName(req, res) {
    const { name } = req.params;
    try {
      const product = await productModel.getProductByName(name);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const updatedProduct = req.body;
    try {
      await productModel.updateProduct(id, updatedProduct);
      res.json({ message: "Producto actualizado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      await productModel.deleteProduct(id);
      res.json({ message: "Producto eliminado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async productExistsById(req, res) {
    const { id } = req.params;
    try {
      const exists = await productModel.productExistsById(id);
      if (!exists) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json({ message: "Producto encontrado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async productExistsByName(req, res) {
    const { name } = req.params;
    try {
      const exists = await productModel.productExistsByName(name);
      if (!exists) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json({ message: "Producto encontrado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ProductController;
