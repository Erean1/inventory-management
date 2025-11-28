import { Request, response, Response } from "express"
import { ResponseHandler } from "../../core/lib/response"
import { WarehouseService } from "./warehouse.service"
import { createWarehouseSchema, updateWarehouseSchema } from "./warehouse.validation"

// create,delete,update,get warehouse 
export class WarehouseController{
    private warehouseService : WarehouseService
    private responseHandler : ResponseHandler

    constructor(warehouseService : WarehouseService,responseHandler:ResponseHandler){
        this.warehouseService = warehouseService
        this.responseHandler = responseHandler
    }

    createWarehouse = async(req:Request,res:Response): Promise<void> => {
        const body = createWarehouseSchema.parse({
            ...req.body
        })
        const user = req.user
        const {companyId} = req.params
        try {
            const createdWarehouse = await this.warehouseService.createWarehouse(user.id,body,Number(companyId))
            
            this.responseHandler.successResponse(res,"Warehouse created Successfully!",201,createdWarehouse)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    } 
    getWareHouseList = async(req:Request,res:Response): Promise<void> => {
        const companyId = req.params.companyId
        const user = req.user
        try {
            const warehouses = await this.warehouseService.getWareHouseList(user.id,Number(companyId))

            this.responseHandler.successResponse(res,"List here",200,warehouses)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    deleteWarehouse = async(req:Request,res:Response) : Promise<void> => {
        const {companyId,warehouseId} = req.params
        const user = req.user
        try {
            await this.warehouseService.deleteWarehouse(user.id,Number(companyId),Number(warehouseId));
            this.responseHandler.successResponse(res,"Warehouse deleted successfully!",204)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    updateWarehouse = async(req:Request,res:Response) : Promise<void>=> {
        const {companyId,warehouseId} = req.params
        const body = updateWarehouseSchema.parse({
            ...req.body
        });
        try {
            await this.warehouseService.updateWarehouse(body,Number(warehouseId),Number(companyId))
            this.responseHandler.successResponse(res,"Warehouse updated succesfully",200)
            
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    addManager = async(req:Request,res:Response): Promise<void> => {
        const {companyId,warehouseId} = req.params;
        const {managerId,role} = req.body
        const user = req.user
        try {
            await this.warehouseService.addManager(Number(companyId),Number(warehouseId),user.id,Number(managerId))
            this.responseHandler.successResponse(res,"Manager added successfully!",200)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    removeManager = async (req:Request,res : Response) => {
        const {companyId,warehouseId} = req.params
        const user = req.user;
        const managerId = req.body.managerId;
        try {
            await this.warehouseService.removeManager(Number(companyId),Number(warehouseId),user.id,Number(managerId))
            this.responseHandler.successResponse(res,"Manager removed sucessfully!",200)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    getWarehouseDetails = async (req:Request,res:Response) => {
        const {companyId,warehouseId} = req.params
        const user = req.user;
        try {
            const warehouse = await this.warehouseService.getWarehouseDetails(Number(companyId),Number(warehouseId),user.id)
            this.responseHandler.successResponse(res,"Get Warehouse Details successfully!",200,warehouse)
        } catch(error : any){
            this.responseHandler.errorResponse(res,error.message)
        }
    } 
    getManagers = async(req:Request,res:Response) : Promise<void>=> {
        const {warehouseId,companyId} = req.params
        const user = req.user
        try {
            const managers = await this.warehouseService.getManagers(Number(companyId),Number(warehouseId),user.id)
            this.responseHandler.successResponse(res,"Get Managers successfully!",200,managers)
        } catch(error:any){
            this.responseHandler.errorResponse(res,error.message)
        }
    }
    giveRole = async(req:Request,res:Response) : Promise<void> => {
        const {warehouseId,companyId} = req.params
        const user = req.user
        const {role,managerId} = req.body
        try {
           await this.warehouseService.giveRole(Number(companyId),Number(warehouseId),user.id,role,Number(managerId))
           this.responseHandler.successResponse(res,"Role operation success!",200)
        } catch(error : any){
           this.responseHandler.errorResponse(res,error.message)
        }
    }
}