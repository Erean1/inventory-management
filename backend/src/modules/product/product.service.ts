import { CustomError } from "../../core/lib/customError"
import { auditLogHelper } from "../auditLogs/auditLogHelper"
import { IAddProductDto } from "./dtos/product.dto"
import { ProductRepository } from "./product.repository"

export class ProductService {
    private productRepository : ProductRepository
    constructor(productRepository : ProductRepository) {
        this.productRepository = productRepository
    }
    isProductOnCompany = async(companyId : number,productId : number) => {
        const isExists = await this.productRepository.isProductOnCompany(companyId,productId) 
        if (!isExists) throw new CustomError("Product not found at company",404)
    }
    getProductsService = async(companyId : number,userId : number,ip?:any) => {
        auditLogHelper("Get products",userId,ip,"Products",0)
        return await this.productRepository.getProducts(companyId);
    }
    addProductService = async(companyId : number,userId : number,body: IAddProductDto,ip?:any) => {
        auditLogHelper("Add product",userId,ip,"Products",0)
        return await this.productRepository.addProduct(body,companyId)
    }
    deleteProductService = async(companyId : number,userId : number,productId : number,ip?:any) => {
        auditLogHelper("Delete product",userId,ip,"Products",productId)
        return await this.productRepository.deleteProduct(productId)
    }
    
}