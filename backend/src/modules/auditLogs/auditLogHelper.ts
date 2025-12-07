import { auditLogService } from "."

export const auditLogHelper = (action : string,actor_id : number,ip : any,entity : string,entity_id:number,old_data?:any,new_data?:any) =>{
    return auditLogService.createLog({
        action,
        actor_id,
        entity,
        entity_id,
        old_data,
        new_data
    })
}