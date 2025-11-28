import express from "express";
import { ResponseHandler } from "../../core/lib/response";
import { CompanyRepository } from "./company.repository";
import { CompanyService } from "./company.service";
import { CompanyController } from "./company.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import warehouseRouter from "../warehouse/warehouse.router";
import companyMemberRouter from "./members/member.route";

const companyRouter = express.Router();

const companyRepository = new CompanyRepository();
const responseHandler = new ResponseHandler();

const companyService = new CompanyService(companyRepository);

const companyController = new CompanyController(
  companyService,
  responseHandler
);
companyRouter.get("/",authMiddleware,companyController.getOwnCompanies)
companyRouter.post("/",authMiddleware,companyController.createCompany)
companyRouter.delete("/:id",authMiddleware,companyController.deleteOwnCompany)
companyRouter.put("/:id",authMiddleware,companyController.updateOwnCompany)

// warehouses
companyRouter.use("/:companyId/warehouses",warehouseRouter)

// companyMembers
companyRouter.use("/:companyId/members",companyMemberRouter)

export default companyRouter;
