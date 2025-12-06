import { CustomError } from "../../core/lib/customError"
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
    createWarehouse = async(userId : number,body : ICreateWarehouse,companyId : number) => {

        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)

        const isExists = await this.warehouseRepository.findByName(body.name)
        if (isExists) throw new CustomError("Warehouse exists!")
        const createdWarehouse = await this.warehouseRepository.createWarehouse(body,companyId,userId)
        return createdWarehouse
    }
    getWareHouseList = async(userId : number,companyId : number) => {
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)
        return await this.warehouseRepository.getWarehouses(companyId)
    }
    deleteWarehouse = async(userId : number,companyId : number,warehouseId : number) => {
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)

        await this.warehouseRepository.deleteWarehouse(warehouseId)
    }
    updateWarehouse = async(body : IUpdateWarehouse,warehouseId : number,companyId : number) => {
        
        let updateData : IUpdateWarehouse= {}
        if (body.name) updateData.name = body.name
        if (body.address) updateData.address = body.address
        
        return await this.warehouseRepository.updateWarehouse(updateData,warehouseId)
    }
    addManager = async(companyId : number,warehouseId : number,userId : number,managerId : number) => {
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)

        return await this.warehouseRepository.addManager(warehouseId,managerId)
    }
    removeManager = async(companyId:number,warehouseId : number,userId : number,managerId:number) => {
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)
        return await this.warehouseRepository.removeManager(warehouseId,managerId)
    }
    getWarehouseDetails = async(companyId:number,warehouseId:number,userId:number)=>{
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)
        return await this.warehouseRepository.getWarehouseDetails(warehouseId)
    }
    getManagers = async(companyId : number,warehouseId : number,userId : number) => {
        await this.companyService.isCompanyExists(companyId);
        await this.companyService.isOwner(userId,companyId)
        return await this.warehouseRepository.getManagers(warehouseId)
    }
    giveRole = async(companyId : number,warehouseId:number,userId:number,role:string,managerId:number) : Promise<void> => {
        await this.companyService.isOwner(userId,companyId)
        await this.warehouseRepository.giveRole(warehouseId,role,managerId)
    }
}