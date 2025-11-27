import z from "zod";

export const createCompanySchema = z.object({
    name : z.string().min(3).max(50),
    description : z.string().max(255)
})
export const updateCompanySchema = z.object({
    name : z.string().min(3).max(50).optional(),
    description : z.string().max(255).optional(),
    owner_id : z.number().optional()
})