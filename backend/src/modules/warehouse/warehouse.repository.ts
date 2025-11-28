import { Warehouse, WarehouseManager, WarehouseRole } from "../../generated/prisma"
import { prisma } from "../../lib/prisma"
import { ICreateWarehouse, IUpdateWarehouse } from "./dtos/warehouse.dto"

export class WarehouseRepository {
    
    findByName = async(name : string) => {
        return await prisma.warehouse.findFirst({where :{name:name}})
    }
    createWarehouse = async(body : ICreateWarehouse,companyId : number,userId:number) => {
        return await prisma.warehouse.create({
            data  : {
                ...body,
                company_id : companyId,
                managers : {
                    create:{
                        user_id : userId,
                        role : "ADMIN"
                    }
                }
            }
        })
    }
    getWarehouses = async(companyId : number) : Promise <Warehouse[]>=> {
        return await prisma.warehouse.findMany({
            where :{
                company_id : companyId
            }
        })
    }
    deleteWarehouse = async(warehouseId : number) => { 
        return await prisma.warehouse.delete({
            where : {
                id : warehouseId
            }
        })
    }   
    updateWarehouse = async(body : IUpdateWarehouse,warehouseId : number) => {
        return await prisma.warehouse.update({
            where : {
                id : warehouseId
            },
            data : body
        })
    }
    addManager = async(warehouseId : number,managerId : number) => {
        return await prisma.warehouseManager.create({
            data : {
                user_id : managerId,
                warehouse_id : warehouseId,
                role : "MEMBER"
            }
        })
    }
    removeManager = async (warehouseId : number,managerId : number) => {
        return await prisma.warehouseManager.delete({
            where : {
                // delete falan unique işlemden arar o yüzden prisma arkada @@id yaptığımız sütundan bunu oluşturur böyle buluruz where ile tekil key olmalı 
                user_id_warehouse_id : {
                    user_id : managerId,
                    warehouse_id : warehouseId
                }
            }
        })
    }
    isManager = async(warehouseId : number,managerId : number) => {
        console.log(warehouseId,managerId)
        return await prisma.warehouseManager.findUnique({
            where : {
                user_id_warehouse_id : {
                    warehouse_id : warehouseId,
                    user_id : managerId
                }
            }
        })
    }
    getWarehouseDetails = async(warehouseId : number) => {
        return await prisma.warehouse.findUnique({
            where : {
                id : warehouseId
            }
        })
    }
    getManagers = async(warehouseId:number) : Promise<WarehouseManager[]> => {
        return await prisma.warehouseManager.findMany({
            where : {
                warehouse_id : warehouseId
            }
        })
    }
    giveRole = async(warehouseId:number,role:string,managerId:number) => {

        return prisma.warehouseManager.update({
            where : {
                user_id_warehouse_id:{
                    user_id : managerId,
                    warehouse_id : warehouseId
                }
            },
            data : {
                role : role as WarehouseRole
            }
        })
    }
}