import { CustomError } from "../../../core/lib/customError"
import { auditLogHelper } from "../../auditLogs/auditLogHelper"
import { ProductService } from "../../product/product.service"
import { WarehouseService } from "../warehouse.service"
import { IAddWarehouseProduct, IUpdateWarehouseProduct } from "./dtos/warehouseProduct.dto"
import { WarehouseProductRepository } from "./warehouseProduct.repository"


export class WarehouseProductService {
    private wareouseProductRepository : WarehouseProductRepository
    private warehouseService : WarehouseService
    private productService : ProductService
    constructor(wareouseProductRepository : WarehouseProductRepository,warehouseService : WarehouseService,productService : ProductService){
        this.wareouseProductRepository = wareouseProductRepository
        this.warehouseService = warehouseService
        this.productService = productService 
    }

    isProductExists = async(warehouseId: number,productId : number) => {
        const isExists = await this.wareouseProductRepository.findProduct(warehouseId,productId)
        if (isExists) throw new CustomError("Product already in warehouse")
        return isExists
    }
    getProductsService = async(userId : number,warehouseId : number,ip?:any) => {
        auditLogHelper("Get Warehouse Products",userId,ip,"WarehouseProduct",warehouseId)
        return await this.wareouseProductRepository.getProductList(warehouseId)
    }
    addProductService = async(userId : number,warehouseId : number,body : IAddWarehouseProduct,ip?:any) => {
        this.warehouseService.isCapacityFull(warehouseId)
        await this.isProductExists(warehouseId,Number(body.productId))
        const warehouse = await this.warehouseService.findCompanyId(warehouseId);
        await this.productService.isProductOnCompany(warehouse?.company_id!,Number(body.productId))
        auditLogHelper("Add Warehouse Product",userId,ip,"WarehouseProduct",warehouseId)
        return await this.wareouseProductRepository.addProduct(warehouseId,body)
    }
    updateProductService = async(userId : number,warehouseId : number,productId : number,body:IUpdateWarehouseProduct,ip?:any) => {
        await this.isProductExists(warehouseId,productId)
        auditLogHelper("Update Warehouse Product",userId,ip,"WarehouseProduct",productId)
        return await this.wareouseProductRepository.updateProduct(warehouseId,productId,body)
    }
    deleteProductService = async(userId : number,warehouseId : number,productId : number,ip?:any) => {
        await this.isProductExists(warehouseId,productId)
        auditLogHelper("Delete Warehouse Product",userId,ip,"WarehouseProduct",productId)
        return await this.wareouseProductRepository.deleteProduct(warehouseId,productId)
    }
}