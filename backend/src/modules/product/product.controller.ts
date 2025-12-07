import { Request, Response } from "express"
import { ResponseHandler } from "../../core/lib/response"
import { ProductService } from "./product.service"
import { addProductSchema } from "./product.validation"

export class ProductController {
    private responseHandler : ResponseHandler
    private productService : ProductService
    constructor(responseHandler : ResponseHandler,productService : ProductService){
        this.responseHandler = responseHandler
        this.productService = productService
    }
    getProducts = async(req:Request, res : Response) => {
        const companyId = req.params.companyId;
        const user = req.user
        try {
            const products = await this.productService.getProductsService(Number(companyId),user.id,req.ip);
            this.responseHandler.successResponse(res,"Get Products successfully!",200,products)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }   
    }
    addProduct = async (req:Request,res:Response) => {
        const user = req.user
        const companyId = req.params.companyId
        const body = addProductSchema.parse({
            ...req.body
        })
        try {
            await this.productService.addProductService(Number(companyId),user.id,body,req.ip)
            this.responseHandler.successResponse(res,"Product added successfully!",201)

        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    deleteProduct = async(req:Request,res:Response) => {
        const user = req.user;
        const {companyId,productId} = req.params
        try {
            await this.productService.deleteProductService(Number(companyId),user.id,Number(productId),req.ip)
            this.responseHandler.successResponse(res,"Product deleted successfull!",204)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    
}