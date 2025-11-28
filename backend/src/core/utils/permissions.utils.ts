import { CompanyRepository } from "../../modules/company/company.repository";
import { WarehouseRepository } from "../../modules/warehouse/warehouse.repository";
import { CustomError } from "../lib/customError";

export  const isCompanyExists = async(companyRepository : CompanyRepository,companyId : number) : Promise<void>=> {
    const company = await companyRepository.findById(companyId);
    if (!company) throw new CustomError("Company not found",404);
}
export const isOwner = async(companyRepository : CompanyRepository,userId : number,companyId : number) : Promise<void>=> {
    const company = await companyRepository.findById(companyId);
    if (!company) throw new CustomError("Company not found",404);
    if (company.owner_id !== userId) throw new CustomError("Only company owner can this operation")
}
export const isManager = async(warehouseRepository : WarehouseRepository,userId : number,warehouseId:number) : Promise<void> => {
    
    const isManager = await warehouseRepository.isManager(warehouseId,userId)
    if (!isManager) throw new CustomError("U are not manager at this warehouse")
}