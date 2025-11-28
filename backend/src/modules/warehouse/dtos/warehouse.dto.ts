export interface ICreateWarehouse{
    name : string,
    address : string,
    capacity : number
}
export interface IUpdateWarehouse {
    name? : string,
    address? : string
}