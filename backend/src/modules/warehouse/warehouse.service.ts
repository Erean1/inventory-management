import { CustomError } from "../../core/lib/customError"
import { isCompanyExists, isManager, isOwner } from "../../core/utils/permissions.utils"
import { CompanyRepository } from "../company/company.repository"
import { ICreateWarehouse, IUpdateWarehouse } from "./dtos/warehouse.dto"
import { WarehouseRepository } from "./warehouse.repository"

export class WarehouseService{
    private warehouseRepository : WarehouseRepository
    private companyRepository : CompanyRepository
    constructor(warehouseRepository : WarehouseRepository,companyRepository:CompanyRepository){
        this.warehouseRepository = warehouseRepository
        this.companyRepository = companyRepository
    }


    createWarehouse = async(userId : number,body : ICreateWarehouse,companyId : number) => {

        await isCompanyExists(this.companyRepository,companyId);
        await isOwner(this.companyRepository,userId,companyId)

        const isExists = await this.warehouseRepository.findByName(body.name)
        if (isExists) throw new CustomError("Warehouse exists!")
        const createdWarehouse = await this.warehouseRepository.createWarehouse(body,companyId,userId)
        return createdWarehouse
    }
    getWareHouseList = async(userId : number,companyId : number) => {
        await isCompanyExists(this.companyRepository,companyId)
        await isOwner(this.companyRepository,userId,companyId)
        return await this.warehouseRepository.getWarehouses(companyId)
    }
    deleteWarehouse = async(userId : number,companyId : number,warehouseId : number) => {
        await isCompanyExists(this.companyRepository,companyId)
        await isOwner(this.companyRepository,userId,companyId)

        await this.warehouseRepository.deleteWarehouse(warehouseId)
    }
    updateWarehouse = async(body : IUpdateWarehouse,warehouseId : number,companyId : number) => {
        
        let updateData : IUpdateWarehouse= {}
        if (body.name) updateData.name = body.name
        if (body.address) updateData.address = body.address
        
        return await this.warehouseRepository.updateWarehouse(updateData,warehouseId)
    }
    addManager = async(companyId : number,warehouseId : number,userId : number,managerId : number) => {
        await isCompanyExists(this.companyRepository,companyId)
        await isOwner(this.companyRepository,userId,companyId)

        return await this.warehouseRepository.addManager(warehouseId,managerId)
    }
    removeManager = async(companyId:number,warehouseId : number,userId : number,managerId:number) => {
        await isCompanyExists(this.companyRepository,companyId);
        await isOwner(this.companyRepository,userId,companyId)
        return await this.warehouseRepository.removeManager(warehouseId,managerId)
    }
    getWarehouseDetails = async(companyId:number,warehouseId:number,userId:number)=>{
        await isCompanyExists(this.companyRepository,companyId)
        await isManager(this.warehouseRepository,userId,warehouseId)
        return await this.warehouseRepository.getWarehouseDetails(warehouseId)
    }
    getManagers = async(companyId : number,warehouseId : number,userId : number) => {
        await isCompanyExists(this.companyRepository,companyId);
        await isManager(this.warehouseRepository,userId,warehouseId)
        return await this.warehouseRepository.getManagers(warehouseId)
    }
    giveRole = async(companyId : number,warehouseId:number,userId:number,role:string,managerId:number) : Promise<void> => {
        await isOwner(this.companyRepository,userId,companyId);
        await this.warehouseRepository.giveRole(warehouseId,role,managerId)
    }
}