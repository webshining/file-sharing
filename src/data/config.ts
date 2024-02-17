import dotenv from "dotenv";
import path from "path";
dotenv.config();

// server
export const PORT = process.env.PORT || 4000;

export const DIR = path.resolve();

// database
export const DB_NAME: string = process.env.DB_NAME || "database";

export const DB_USER: string | undefined = process.env.DB_USER;
export const DB_PASS: string | undefined = process.env.DB_PASS;
export const DB_PORT: number | undefined = Number(process.env.DB_PORT);
export const DB_HOST: string | undefined = process.env.DB_HOST;

export const LOGGING: boolean = process.env.LOGGING === "true";

// redis
export const REDIS_URI: string = String(process.env.REDIS_URI) || "redis://localhost:6379";

// auth
export const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET || "secret_access_key";
export const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || "secret_refresh_key";
export const JWT_ACCESS_MINUTES: number = Number(process.env.JWT_ACCESS_MINUTES) || 30;
export const JWT_REFRESH_MINUTES: number = Number(process.env.JWT_REFRESH_MINUTES) || 60 * 24 * 7;
// Google oauth
export const GOOGLE_CLIENT_ID: string = String(process.env.GOOGLE_CLIENT_ID);
export const GOOGLE_CLIENT_SECRET: string = String(process.env.GOOGLE_CLIENT_SECRET);
export const GOOGLE_SCOPES: string[] = ["openid", "profile", "email"];
export const GOOGLE_AUTH_URI: string = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_TOKEN_URI: string = "https://oauth2.googleapis.com/token";
export const GOOGLE_REDIRECT_URI: string = String(process.env.GOOGLE_REDIRECT_URI);
// GitHub oauth
export const GITHUB_CLIENT_ID: string = String(process.env.GITHUB_CLIENT_ID);
export const GITHUB_CLIENT_SECRET: string = String(process.env.GITHUB_CLIENT_SECRET);
export const GITHUB_SCOPES: string[] = ["user:email", "read:user"];
export const GITHUB_AUTH_URI: string = "https://github.com/login/oauth/authorize";
export const GITHUB_TOKEN_URI: string = "https://github.com/login/oauth/access_token";
export const GITHUB_REDIRECT_URI: string = String(process.env.GITHUB_REDIRECT_URI);
export const GITHUB_USER_INFO_URI: string = "https://api.github.com/user";
