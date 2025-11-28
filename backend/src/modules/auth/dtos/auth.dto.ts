export interface RegisterUserDto {
    username : string,
    email : string,
    password : string
}
export interface verifyUserDto{
    verifyOtp : string,
    email : string,
}
export interface resetPasswordDto {
    resetOtp : string
    newPassword : string,
    confirmNewPassword : string
}
