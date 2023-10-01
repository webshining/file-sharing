import { Router } from "express";
import { body } from "express-validator";
import AuthController from "../controller/auth.controller";
import ErrorMiddleware from "../middlewares/error.middleware";

const router = Router();

const loginValidation = [
	body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Not valid email"),
	body("password").notEmpty().withMessage("Password is required").isLength({ min: 6, max: 17 }).withMessage("Password length must be from 6 to 17"),
	ErrorMiddleware,
];

const registerValidation = [
	body("name").notEmpty().withMessage("Name is required").isLength({ min: 6, max: 17 }).withMessage("Name length must be from 6 to 17"),
	...loginValidation,
];

router.get("/google", AuthController.oauth);
router.get("/github", AuthController.oauth);
router.get("/google/redirect", AuthController.redirect);
router.get("/github/redirect", AuthController.redirect);
router.post("/login", loginValidation, AuthController.login);
router.post("/register", registerValidation, AuthController.register);
router.get("/refresh", AuthController.refresh);
router.get("/logout", AuthController.logout);

export default router;
