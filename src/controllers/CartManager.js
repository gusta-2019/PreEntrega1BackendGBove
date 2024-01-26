import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from './ProductManager.js'

const productAll = new ProductManager

class CartManager{
    constructor(){
        this.path = "./src/models/carts.json"
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    writeCarts = async (carts) => {
        await fs.writeFile (this.path, JSON.stringify(carts, null, 2))
    }

    exist = async (id) =>{
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartsConcat = [{id:id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito agregado"
    }

    getCartsById = async (id) => {
        let CartById = await this.exist(id)
        if(!CartById) return "Carrito inexistente"
        return CartById
    }

    addProductInCart = async (cartId, productId) => {
        let CartById = await this.exist(cartId)
        if(!CartById) return "Carrito inexistente"
        let productById = await productAll.exist(productId)
        if(!CartById) return "Producto inexistente"
        
        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter((cart) => cart.id != cartId)

        if(CartById.products.some((prod) => prod.id === productId)){
            let moreproductInCart = CartById.products.find((prod) => prod.id === productId)
            moreproductInCart.quantity++
            console.log(moreproductInCart.quantity)
            let cartsConcat = [CartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto sumado al carrito"
        }
        CartById.products.push({id:productById.id, quantity: 1})
        
        let cartsConcat = [CartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto Agregado al carrito"
    }
   
}

export default CartManager

