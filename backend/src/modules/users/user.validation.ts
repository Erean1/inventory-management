import z from "zod"

export const updateUserSchema = z.object({
    username : z.string().min(3).max(50).optional(),
    email : z.email().optional(),
    password : z.string().optional(),   
    isVerified : z.boolean().optional()
})