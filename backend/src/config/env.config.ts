import dotenv from "dotenv";
dotenv.config();

export const {
    DATABASE_URL,
    PORT,
    EMAIL_USER,
    EMAIL_PASSWORD,
    ACCESS_SECRET,
    REFRESH_SECRET
} = process.env;