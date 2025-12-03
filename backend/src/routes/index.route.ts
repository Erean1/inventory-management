import express, { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import companyRouter from "../modules/company/company.route";
import warehouseRouter from "../modules/warehouse/warehouse.router";
import userRouter from "../modules/users/user.route";
const router : Router = express.Router();


router.use("/auth",authRouter);
router.use("/companies",companyRouter)
router.use("/warehouses",warehouseRouter)
router.use("/users",userRouter)
// Rol yönetim sistemi ekle
export default router