import { prisma } from "../../../core/lib/prisma"
import { WarehouseProduct } from "../../../generated/prisma"
import { IAddWarehouseProduct, IUpdateWarehouseProduct } from "./dtos/warehouseProduct.dto"
export class WarehouseProductRepository {
    getProductList = async(warehouseId : number) : Promise<WarehouseProduct[]> => {
        return await prisma.warehouseProduct.findMany({
            where : {
                warehouse_id :warehouseId
            },
            include : {
                product : true
            }
        })
    }
    addProduct = async(warehouseId : number,body : IAddWarehouseProduct) => {
        return await prisma.warehouseProduct.create({
            data : {
                product_id : Number(body.productId),
                warehouse_id : warehouseId,
                stock : body.stock
            }
        })
    }
    findProduct = async(wareouseId : number,productId : number) => {
        return await prisma.warehouseProduct.findFirst({
            where : {
                warehouse_id: wareouseId,
                product_id : productId 
            }
        })
    }
    updateProduct = async(warehouseId : number,productId : number,body : IUpdateWarehouseProduct) => {
        return await prisma.warehouseProduct.update({
            where : {
                product_id_warehouse_id : {
                    product_id : productId,
                    warehouse_id : warehouseId
                }
            },
            data : {
                ...body
            }
        })
    }
    deleteProduct = async(warehouseId : number,productId:number) => {
        return await prisma.warehouseProduct.delete({
            where : {
                product_id_warehouse_id : {
                    product_id : productId,
                    warehouse_id : warehouseId
                }
            }
        })
    }
}