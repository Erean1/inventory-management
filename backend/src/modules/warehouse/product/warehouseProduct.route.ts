import express from "express";
import { ResponseHandler } from "../../../core/lib/response";
import { WarehouseProductRepository } from "./warehouseProduct.repository";
import { WarehouseProductService } from "./warehouseProduct.service";
import { WarehouseProductController } from "./warehouseProduct.controller";
import limiter from "../../../middlewares/rateLimit";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { WarehouseService } from "../warehouse.service";
import { WarehouseRepository } from "../warehouse.repository";
import { CompanyRepository } from "../../company/company.repository";
import { ProductService } from "../../product/product.service";
import { ProductRepository } from "../../product/product.repository";
import { CompanyService } from "../../company/company.service";


const warehouseProductRouter = express.Router({mergeParams:true});

const warehouseRepository = new WarehouseRepository()
const companyRepository = new CompanyRepository()
const companyService = new CompanyService(companyRepository)
const warehouseService = new WarehouseService(warehouseRepository,companyService)
const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)

const responseHandler = new ResponseHandler()
const warehouseProductRepository = new WarehouseProductRepository()
const warehouseProductService = new WarehouseProductService(
    warehouseProductRepository,
    warehouseService,
    productService
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