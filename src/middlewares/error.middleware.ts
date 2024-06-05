import { NextFunction } from "express";
import { validationResult } from "express-validator";

export default async (req: any, res: any, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ detail: errors.array()[0].msg });
	else next();
};
