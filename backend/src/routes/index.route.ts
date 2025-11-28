import express, { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import companyRouter from "../modules/company/company.route";
import warehouseRouter from "../modules/warehouse/warehouse.router";
const router : Router = express.Router();


router.use("/auth",authRouter);
router.use("/companies",companyRouter)
router.use("/warehouse",warehouseRouter)
// Rol yönetim sistemi ekle
export default router