import { prisma } from "../../core/lib/prisma"
import { Product } from "../../generated/prisma"
import { IAddProductDto } from "./dtos/product.dto"

export class ProductRepository {
        getProducts = async(companyId : number): Promise <Product[]> => {
            return await prisma.product.findMany({
                where : {
                    company_id : companyId
                }
            })
        }
        addProduct = async (body : IAddProductDto,companyId : number) => {
            return await prisma.product.create({
                data : {
                    ...body,
                    company_id : companyId
                }
            })
        }
        deleteProduct = async (productId : number)=> {
            return await prisma.product.delete({
                where : {
                    id : productId
                }
            })
        }
}