import express, { Router } from "express";
import authRouter from "./auth.route";
import companyRouter from "./company.route";
const router : Router = express.Router();


router.use("/auth",authRouter);
router.use("/company",companyRouter)
// Rol yönetim sistemi ekle
export default router