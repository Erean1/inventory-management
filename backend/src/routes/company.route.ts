import express from "express";
import { ResponseHandler } from "../lib/response";
import { CompanyRepository } from "../repositories/company.repository";
import { CompanyService } from "../services/company.service";
import { CompanyController } from "../controllers/company.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

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
export default companyRouter;
