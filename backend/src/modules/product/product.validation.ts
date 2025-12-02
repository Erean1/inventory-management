import z from "zod";

export const addProductSchema = z.object({
    name : z.string().min(3).max(255),
    description : z.string().max(255),
    price : z.number().nonnegative()
})

