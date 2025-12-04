import express from "express";
import { ResponseHandler } from "../../core/lib/response";
import { CompanyRepository } from "./company.repository";
import { CompanyService } from "./company.service";
import { CompanyController } from "./company.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import warehouseRouter from "../warehouse/warehouse.router";
import companyMemberRouter from "./members/member.route";
import productRouter from "../product/product.route";
import { roleGuard } from "../../middlewares/roleGuard.middleware";

const companyRouter = express.Router();

const companyRepository = new CompanyRepository();
const responseHandler = new ResponseHandler();

const companyService = new CompanyService(companyRepository);

const companyController = new CompanyController(
  companyService,
  responseHandler
);
companyRouter.get("/",authMiddleware,roleGuard(["admin.company.view","moderator.company.view","user.company.view"]),companyController.getOwnCompanies)
companyRouter.post("/",authMiddleware,roleGuard(["admin.company.create","user.company.create","moderator.company.create"]),companyController.createCompany)
companyRouter.delete("/:id",authMiddleware,roleGuard(["admin.company.delete","user.company.delete","moderator.company.delete"]),companyController.deleteOwnCompany)
companyRouter.put("/:id",authMiddleware,roleGuard(["admin.company.update","user.company.update","moderator.company.update"]),companyController.updateOwnCompany)

// warehouses
companyRouter.use("/:companyId/warehouses",warehouseRouter)

// companyMembers
companyRouter.use("/:companyId/members",companyMemberRouter)

// products

companyRouter.use("/:companyId/products",productRouter)

export default companyRouter;
