import express from "express";
import { ProductRepository } from "./product.repository";
import { ResponseHandler } from "../../core/lib/response";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import limiter from "../../middlewares/rateLimit";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleGuard } from "../../middlewares/roleGuard.middleware";

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

productRouter.get("/",limiter,authMiddleware,roleGuard(["admin.product.view","moderator.product.view","user.product.view"]),productController.getProducts)
productRouter.post("/",limiter,authMiddleware,roleGuard(["admin.product.create","moderator.product.create","user.product.create"]),productController.addProduct)
productRouter.delete("/:productId",limiter,authMiddleware,roleGuard(["admin.product.delete","moderator.product.delete","user.product.delete"]),productController.deleteProduct)

export default productRouter