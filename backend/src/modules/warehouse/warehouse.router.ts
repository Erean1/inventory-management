import express from "express";
import { ResponseHandler } from "../../core/lib/response";
import { WarehouseRepository } from "./warehouse.repository";
import { WarehouseService } from "./warehouse.service";
import { WarehouseController } from "./warehouse.controller";
import { CompanyRepository } from "../company/company.repository";
import { authMiddleware } from "../../middlewares/auth.middleware";
import limiter from "../../middlewares/rateLimit";
import warehouseProductRouter from "./product/warehouseProduct.route";
import { roleGuard } from "../../middlewares/roleGuard.middleware";

const warehouseRouter = express.Router({mergeParams:true}); // nested routes için gerekli başka router içinde başka bir router kullandığımda params diğerine geçmez geçmesi için bu lazım

const responseHandler = new ResponseHandler();
const warehouseRepository = new WarehouseRepository();

const companyRepository = new CompanyRepository()

const warehouseService = new WarehouseService(
    warehouseRepository,
    companyRepository
);

const warehouseController = new WarehouseController(
    warehouseService,
    responseHandler
)
warehouseRouter.get("/",limiter,authMiddleware,roleGuard(["admin.warehouse.view","moderator.warehouse.view","user.warehouse.view"]),warehouseController.getWareHouseList)
warehouseRouter.post("/",limiter,authMiddleware,roleGuard(["admin.warehouse.create","moderator.warehouse.create","user.warehouse.create"]),warehouseController.createWarehouse)
warehouseRouter.delete("/:warehouseId",limiter,authMiddleware,roleGuard(["admin.warehouse.delete","moderator.warehouse.delete","user.warehouse.delete"]),warehouseController.deleteWarehouse)
warehouseRouter.put("/:warehouseId",limiter,authMiddleware,roleGuard(["admin.warehouse.update","moderator.warehouse.update","user.warehouse.update"]),warehouseController.updateWarehouse)
warehouseRouter.get("/:warehouseId",limiter,authMiddleware,roleGuard(["admin.warehouse.view","moderator.warehouse.view","user.warehouse.view"]),warehouseController.getWarehouseDetails)
// managers
warehouseRouter.get("/:warehouseId/managers",limiter,authMiddleware,warehouseController.getManagers)
warehouseRouter.post("/:warehouseId/managers/add",limiter,authMiddleware,warehouseController.addManager)
warehouseRouter.post("/:warehouseId/managers/remove",limiter,authMiddleware,warehouseController.removeManager)
warehouseRouter.put("/:warehouseId/managers/role",limiter,authMiddleware,warehouseController.giveRole)

// Products
warehouseRouter.use("/:warehouseId/products",warehouseProductRouter)




export default warehouseRouter
