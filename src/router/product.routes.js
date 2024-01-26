//product.routes.js
import { Router} from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProductRouter = Router() 
const product = new ProductManager()


// Listado de todos los productos con límit
ProductRouter.get("/", async (req, res) => {
    const limit = req.query.limit; // Obtener el valor del query parameter 'limit'
    let products = await product.getProducts();
  
    if (limit) {
      // Si se proporciona un límite, aplicar la limitación
      products = products.slice(0, parseInt(limit));
    }
  
    res.send({ products });
  });

ProductRouter.get("/:id", async(req, res) =>{
    let id = req.params.id
    res.send(await product.getProductsById(id))
})

ProductRouter.post("/", async(req, res) =>{
    let newProduct = req.body
    res.send(await product.addProducts(newProduct)) 
})

ProductRouter.put("/:id", async(req, res) =>{
    let id = req.params.id
    let updateProducts = req.body
    res.send(await product.updateProducts(id, updateProducts))
})

ProductRouter.delete("/:id",async(req, res) =>{
    let id = req.params.id
    res.send(await product.deleteProducts(id))
})

export default ProductRouter;