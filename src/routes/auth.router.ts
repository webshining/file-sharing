import { Router } from "express";
import { body } from "express-validator";
import AuthController from "../controller/auth.controller";
import ErrorMiddleware from "../middlewares/error.middleware";

const router = Router();

const loginValidation = [
	body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Not valid email"),
	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.custom((value: string) => value.replace(/\s*/, ""))
		.isLength({ min: 6, max: 17 })
		.withMessage("Not valid password"),
];

const registerValidation = [body("name").notEmpty().withMessage("Name is required").isLength({ min: 6 }).withMessage("Not valid name"), ...loginValidation];

router.get("/google", AuthController.oauth);
router.get("/github", AuthController.oauth);
router.get("/google/redirect", AuthController.redirect);
router.get("/github/redirect", AuthController.redirect);
router.post("/login", loginValidation, ErrorMiddleware, AuthController.login);
router.post("/register", registerValidation, ErrorMiddleware, AuthController.register);
router.get("/refresh", AuthController.refresh);
router.get("/logout", AuthController.logout);

export default router;
