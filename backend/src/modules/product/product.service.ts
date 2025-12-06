import { CustomError } from "../../core/lib/customError"
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
    getProductsService = async(companyId : number,userId : number) => {
        return await this.productRepository.getProducts(companyId);
    }
    addProductService = async(companyId : number,userId : number,body: IAddProductDto) => {
        return await this.productRepository.addProduct(body,companyId)
    }
    deleteProductService = async(companyId : number,userId : number,productId : number) => {
        return await this.productRepository.deleteProduct(productId)
    }
    
}