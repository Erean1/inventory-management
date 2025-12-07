import { Request, response, Response } from "express";
import { ResponseHandler } from "../../../core/lib/response";
import { WarehouseProductService } from "./warehouseProduct.service";
import { createWarehouseProductSchema, updateWarehouseProductSchema } from "./warehouseProduct.validation";

export class WarehouseProductController {
    private responseHandler : ResponseHandler
    private warehouseProductService : WarehouseProductService
    constructor(responseHandler : ResponseHandler,warehouseProductService : WarehouseProductService){
        this.responseHandler = responseHandler
        this.warehouseProductService = warehouseProductService
    }
    getProducts = async(req:Request,res:Response) => {
        const user = req.user
        const warehouseId = req.params.warehouseId
        try {
            const warehouseProducts = await this.warehouseProductService.getProductsService(Number(warehouseId),user.id,req.ip)
            this.responseHandler.successResponse(res,"Get Product Successfully!",200,warehouseProducts)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)   
        }
    }
    addProduct = async(req:Request,res:Response) => {
        const  body = createWarehouseProductSchema.parse({
            ...req.body
        })
        const user = req.user;
        const warehouseId = req.params.warehouseId
        try {
            await this.warehouseProductService.addProductService(user.id,Number(warehouseId),body,req.ip)
            this.responseHandler.successResponse(res,"Add Product Successfully!",201)

        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)   
        }
    }
    updateProduct = async(req:Request,res:Response) => {
        const body = updateWarehouseProductSchema.parse({
            ...req.body
        })
        const {warehouseId,productId} = req.params
        const user = req.user
        try {
            await this.warehouseProductService.updateProductService(user.id,Number(warehouseId),Number(productId),body,req.ip)
            this.responseHandler.successResponse(res,"Update Product Successfully!",200)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    deleteProduct = async(req:Request,res:Response) => {
        const {warehouseId,productId} = req.params
        const user = req.user
        try {
            await this.warehouseProductService.deleteProductService(user.id,Number(warehouseId),Number(productId),req.ip)
            this.responseHandler.successResponse(res,"Delete Product Successfully!",200)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
}