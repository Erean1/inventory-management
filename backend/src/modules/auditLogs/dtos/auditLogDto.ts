export interface IAuditLogDto{
    action : string,
    actor_id : number,
    ip_address? : string,
    old_data? : any,
    new_data? : any,
    entity : string,
    entity_id : number
}