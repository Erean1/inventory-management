import express from "express";
import { ResponseHandler } from "../../../core/lib/response";
import { WarehouseProductRepository } from "./warehouseProduct.repository";
import { WarehouseProductService } from "./warehouseProduct.service";
import { WarehouseProductController } from "./warehouseProduct.controller";
import limiter from "../../../middlewares/rateLimit";
import { authMiddleware } from "../../../middlewares/auth.middleware";


const warehouseProductRouter = express.Router({mergeParams:true});

const responseHandler = new ResponseHandler()
const warehouseProductRepository = new WarehouseProductRepository()
const warehouseProductService = new WarehouseProductService(
    warehouseProductRepository
)

const warehouseProductController = new WarehouseProductController(
    responseHandler,
    warehouseProductService
)
warehouseProductRouter.get("/",limiter,authMiddleware,warehouseProductController.getProducts)
warehouseProductRouter.post("/",limiter,authMiddleware,warehouseProductController.addProduct)
warehouseProductRouter.put("/:productId",limiter,authMiddleware,warehouseProductController.updateProduct)
warehouseProductRouter.delete("/:productId",limiter,authMiddleware,warehouseProductController.deleteProduct)
export default warehouseProductRouter