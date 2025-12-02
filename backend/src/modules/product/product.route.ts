import express from "express";
import { ProductRepository } from "./product.repository";
import { ResponseHandler } from "../../core/lib/response";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import limiter from "../../middlewares/rateLimit";
import { authMiddleware } from "../../middlewares/auth.middleware";

const productRouter = express.Router({mergeParams:true});

const productRepository = new ProductRepository();
const responseHandler = new ResponseHandler();
const productService = new ProductService(
    productRepository
)
const productController = new ProductController(
    responseHandler,
    productService
)
// Get Product,addProduct,deleteProduct olacak

productRouter.get("/",limiter,authMiddleware,productController.getProducts)
productRouter.post("/",limiter,authMiddleware,productController.addProduct)
productRouter.delete("/:productId",limiter,authMiddleware,productController.deleteProduct)

export default productRouter