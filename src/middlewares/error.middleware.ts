import { NextFunction } from "express";
import { validationResult } from "express-validator";

export default async (req: any, res: any, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.json({ error: errors.array()[0].msg });
	else next();
};
