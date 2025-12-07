import { CustomError } from "../../core/lib/customError"
import { auditLogHelper } from "../auditLogs/auditLogHelper"
import { CompanyService } from "../company/company.service"
import { ICreateWarehouse, IUpdateWarehouse } from "./dtos/warehouse.dto"
import { WarehouseRepository } from "./warehouse.repository"

export class WarehouseService{
    private warehouseRepository : WarehouseRepository
    private companyService : CompanyService
    constructor(warehouseRepository : WarehouseRepository,companyService:CompanyService){
        this.warehouseRepository = warehouseRepository
        this.companyService = companyService
    }
    isCapacityFull = async(warehouseId : number) => {
        const warehouse = await this.warehouseRepository.getWarehouseDetails(warehouseId);
        if (warehouse?.products.length! > warehouse?.capacity!) throw new CustomError("Warehouse capacity full")
    }
    findCompanyId = async(warehouseId : number) => {
        return await this.warehouseRepository.getWarehouseDetails(warehouseId)
    }
    isManager = async(warehouseRepository : WarehouseRepository,userId : number,warehouseId:number) : Promise<void> => {
    const isManager = await warehouseRepository.isManager(warehouseId,userId)
    if (!isManager) throw new CustomError("U are not manager at this warehouse")
    }
    createWarehouse = async(userId : number,body : ICreateWarehouse,companyId : number,ip? : any) => {

        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)

        const isExists = await this.warehouseRepository.findByName(body.name)
        if (isExists) throw new CustomError("Warehouse exists!")
        const createdWarehouse = await this.warehouseRepository.createWarehouse(body,companyId,userId)
        auditLogHelper("Create Warehouse",userId,ip,"Warehouse",0)
        return createdWarehouse
    }
    getWareHouseList = async(userId : number,companyId : number,ip?: any) => {
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Get Warehouses",userId,ip,"Warehouse",0)
        
        return await this.warehouseRepository.getWarehouses(companyId)
    }
    deleteWarehouse = async(userId : number,companyId : number,warehouseId : number,ip?:any) => {
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Delete Warehouse",userId,ip,"Warehouse",warehouseId)

        await this.warehouseRepository.deleteWarehouse(warehouseId)
    }
    updateWarehouse = async(body : IUpdateWarehouse,warehouseId : number,companyId : number,userId:number,ip?:any) => {
        
        let updateData : IUpdateWarehouse= {}
        if (body.name) updateData.name = body.name
        if (body.address) updateData.address = body.address
        auditLogHelper("Delete Warehouse",userId,ip,"Warehouse",warehouseId)
        return await this.warehouseRepository.updateWarehouse(updateData,warehouseId)
    }
    addManager = async(companyId : number,warehouseId : number,userId : number,managerId : number,ip?:any) => {
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Manager added",userId,ip,"WarehouseManager",managerId)
        return await this.warehouseRepository.addManager(warehouseId,managerId)
    }
    removeManager = async(companyId:number,warehouseId : number,userId : number,managerId:number,ip?:any) => {
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Manager Removed",userId,ip,"WarehouseManager",managerId)
        return await this.warehouseRepository.removeManager(warehouseId,managerId)
    }
    getWarehouseDetails = async(companyId:number,warehouseId:number,userId:number,ip?:any)=>{
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Get warehouse details",userId,ip,"Warehouse",warehouseId)
        return await this.warehouseRepository.getWarehouseDetails(warehouseId)
    }
    getManagers = async(companyId : number,warehouseId : number,userId : number,ip?:any) => {
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Get managers",userId,ip,"WarehouseManager",warehouseId)
        return await this.warehouseRepository.getManagers(warehouseId)
    }
    giveRole = async(companyId : number,warehouseId:number,userId:number,role:string,managerId:number,ip?:any) : Promise<void> => {
        await this.companyService.isOwner(userId,companyId)
        auditLogHelper("Give role to manager",userId,ip,"WarehouseManager",managerId)
        await this.warehouseRepository.giveRole(warehouseId,role,managerId)
    }
}