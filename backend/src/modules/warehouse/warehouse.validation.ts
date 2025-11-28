import z from "zod"

export const createWarehouseSchema = z.object({
    name : z.string().min(3),
    address : z.string().min(3),
    capacity : z.number()
})
export const updateWarehouseSchema = z.object({
    name : z.string().min(3).optional(),
    address : z.string().min(3).optional()
})