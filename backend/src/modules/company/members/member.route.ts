import express from "express"
import { CompanyMemberController } from "./member.controller";
import { CompanyMemberService } from "./member.service";
import { CompanyMemberRepository } from "./member.repository";
import { ResponseHandler } from "../../../core/lib/response";
import { CompanyRepository } from "../company.repository";
import limiter from "../../../middlewares/rateLimit";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { CompanyService } from "../company.service";

const companyMemberRouter = express.Router({mergeParams:true});
const companyRepository = new CompanyRepository()
const companyService = new CompanyService(companyRepository)

const companyMemberRepository = new CompanyMemberRepository()
const responseHandler = new ResponseHandler()

const companyMemberService = new CompanyMemberService(
    companyMemberRepository,
    companyService
)

const companyMemberController = new CompanyMemberController(
    companyMemberService,
    responseHandler
)

companyMemberRouter.get("/",limiter,authMiddleware,companyMemberController.memberList)
companyMemberRouter.post("/add",limiter,authMiddleware,companyMemberController.addMember)
companyMemberRouter.post("/remove",limiter,authMiddleware,companyMemberController.removeMember)
companyMemberRouter.post("/role",limiter,authMiddleware,companyMemberController.memberRole)



export default companyMemberRouter