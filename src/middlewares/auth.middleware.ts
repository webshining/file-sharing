import { NextFunction, Response } from "express";
import AuthService from "../services/auth.service";

export default async (req: any, res: Response, next: NextFunction) => {
	const authService = new AuthService();

	const authorization: string | null = req.headers.authorization;
	if (!authorization) return res.json({ error: "Unauthorized" });
	const authorization_data = authorization.split(" ");
	if (authorization_data.length !== 2) return res.json({ error: "Unauthorized" });
	const accessData = await authService.tokenDecode(authorization_data[1]);
	if (!accessData) return res.json({ error: "Unauthorized" });
	req.body.user = { id: accessData.user.id };
	next();
};
