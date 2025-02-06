import { Router } from "express";
import { getProduct, getProducts, deleteProduct, updateProducts,createProduct } from "../controllers/productsController.js";


const productRouter = Router()

productRouter.get('/',getProducts)
productRouter.get('/:pid',getProduct)
productRouter.get('/:pid',updateProducts)
productRouter.get('/',createProduct)
productRouter.get('/:pid',deleteProduct)

export default productRouter