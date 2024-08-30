import ProductModel from "../models/product.js";

class ProductController {
  constructor(ProductModel) {
    this.ProductModel = ProductModel;
  }

  static async getProductsCT(req, res) {
    try {
      const products = await ProductModel.getProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getProductByIdCT(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductModel.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getProductsByStockCT(req, res) {
    const { stock } = req.params;
    try {
      const products = await ProductModel.getProductsByStock(stock);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async addProductCT(req, res) {
    const { name, price, stock } = req.body;
    try {
      const result = await ProductModel.addProduct(name, price, stock);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async deleteProductCT(req, res) {
    const { id } = req.params;
    try {
      await ProductModel.deleteProduct(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateProductCT(req, res) {
    const { id } = req.params;
    const updatedProduct = req.body;
    try {
      await ProductModel.updateProduct(id, updatedProduct);
      res.json({ message: "Producto actualizado correctamente!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default ProductController;
