import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'


class ProductManager{
    constructor(){
        this.path = "./src/models/products.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }
   
    writeProducts = async (product) => {
        await fs.writeFile (this.path, JSON.stringify(product, null, 2))
    }

    exist = async (id) =>{
        let products = await this.readProducts()
        return products.find(prod => prod.id === id)
    }


    addProducts = async (product) =>{
        let productsOld = await this.readProducts()
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Producto agregado"
    }

    getProducts = async () =>{
        return await this.readProducts()
    }

    getProductsById = async (id) =>{
        let ProductById = await this.exist(id)
        if(!ProductById) return "Producto inexistente"
        return ProductById
    }

    updateProducts = async (id, product) =>{
        let ProductById = await this.exist(id)
        if(!ProductById) return "Producto inexistente"
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id }, ...productOld]
        await this.writeProducts(products)
        return "Producto Acualizado"
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts()
        let existProduct = products.some(prod => prod.id === id)
        if(existProduct) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto Eliminado"
        }
        return "Producto a eliminar inexistente"
    }
    
}

export default ProductManager



