import { IAddWarehouseProduct, IUpdateWarehouseProduct } from "./dtos/warehouseProduct.dto"
import { WarehouseProductRepository } from "./warehouseProduct.repository"


export class WarehouseProductService {
    private wareouseProductRepository : WarehouseProductRepository
    constructor(wareouseProductRepository : WarehouseProductRepository){
        this.wareouseProductRepository = wareouseProductRepository
    }
    getProductsService = async(userId : number,warehouseId : number) => {
        return await this.wareouseProductRepository.getProductList(warehouseId)
    }
    addProductService = async(userId : number,warehouseId : number,body : IAddWarehouseProduct) => {
        return await this.wareouseProductRepository.addProduct(warehouseId,body)
    }
    updateProductService = async(userId : number,warehouseId : number,productId : number,body:IUpdateWarehouseProduct) => {
        return await this.wareouseProductRepository.updateProduct(warehouseId,productId,body)
    }
    deleteProductService = async(userId : number,warehouseId : number,productId : number) => {
        return await this.wareouseProductRepository.deleteProduct(warehouseId,productId)
    }
}