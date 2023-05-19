import dotenv from 'dotenv';
import path from 'path';
dotenv.config()


export const DIR = path.resolve()
export const STATIC = DIR + "/static"

export const PORT = process.env.PORT || 7000

export const DB_NAME: string = process.env.DB_NAME || 'database'

export const DB_USER: string | undefined = process.env.DB_USER
export const DB_PASS: string | undefined = process.env.DB_PASS
export const DB_PORT: number | undefined = Number(process.env.DB_PORT)
export const DB_HOST: string | undefined = process.env.DB_HOST

export const LOGGING: boolean = process.env.LOGGING === 'true'


// Auth
// Jwt
export const JWT_SECRET: string = process.env.JWT_SECRET || 'secret_key'
// Google oauth
export const GOOGLE_CLIENT_ID: string = String(process.env.GOOGLE_CLIENT_ID)
export const GOOGLE_CLIENT_SECRET: string = String(process.env.GOOGLE_CLIENT_SECRET)
export const GOOGLE_SCOPES: string[] = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]
export const GOOGLE_AUTH_URI: string = 'https://accounts.google.com/o/oauth2/v2/auth';
export const GOOGLE_TOKEN_URI: string = 'https://oauth2.googleapis.com/token';
export const GOOGLE_REDIRECT_URI: string = 'http://localhost:4000/api/auth/google';
export const GOOGLE_USER_INFO_URI: string = 'https://www.googleapis.com/oauth2/v2/userinfo';
