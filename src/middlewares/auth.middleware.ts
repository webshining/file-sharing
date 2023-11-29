import { NextFunction, Response } from "express";
import { User } from "../models/user.entity";
import AuthService from "../services/auth.service";
import ModelService from "../services/model.service";

export default async (req: any, res: Response, next: NextFunction) => {
	const authService = new AuthService();
	const userService = new ModelService<User>(User);

	const authorization: string | null = req.headers.authorization;
	if (!authorization || !authorization.startsWith("Bearer")) return res.status(401).json({ error: "Unauthorized" });
	const accessData = await authService.tokenDecode(authorization.split(" ")[1]);
	if (!accessData) return res.status(401).json({ error: "Unauthorized" });
	const user = await userService.getOne({ id: accessData.user.id });
	if (!user) return res.status(401).json({ error: "Unauthorized" });
	req.user = user;
	next();
};
