import z from "zod";

export const registerSchema = z.object({
    username : z.string().min(3).max(25),
    email : z.email(),
    password : z.string()
})
export const loginSchema = z.object({
    username : z.string().min(3).max(25).optional(),
    password : z.string(),
    email : z.email().optional()
})
export const verifyOtpSchema = z.object({
    verifyOtp : z.string(),
    email : z.email()
})
export const resetPasswordSchema = z.object({
    resetOtp : z.string(),
    newPassword : z.string(),
    confirmNewPassword : z.string()
})