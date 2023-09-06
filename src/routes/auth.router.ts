import { Router } from "express";
import AuthController from "../controller/auth.controller";
import RequiredMiddleware from "../middlewares/required.middleware";

const router = Router();

const required = [
	{ key: "name", reg: /.{4,20}/ },
	{ key: "email", reg: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
	{ key: "password", reg: /.{6, 17}/ },
];

router.get("/google", AuthController.oauth);
router.get("/github", AuthController.oauth);
router.get("/google/redirect", AuthController.redirect);
router.get("/github/redirect", AuthController.redirect);
router.post("/login", AuthController.login);
router.post("/register", RequiredMiddleware(required), AuthController.register);
router.get("/refresh", AuthController.refresh);
router.get("/logout", AuthController.logout);

export default router;
