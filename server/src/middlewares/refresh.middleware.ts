import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    const authService = new AuthService()
    const {refreshToken} = req.cookies
    next()
}