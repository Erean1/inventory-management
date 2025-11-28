export interface ICreateCompany{
    name : string,
    description : string
    createdAt? : Date,
    owner_id? : number
}
export interface IUpdateCompany{
    name? : string,
    description? : string,
    owner_id? : number
}