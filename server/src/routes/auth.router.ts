import { Router } from "express";
import AuthController from "../controller/auth.controller";

const router = Router();

router.get("/google", AuthController.google);
router.get("/google/redirect", AuthController.googleRedirect);
router.get("/github", AuthController.github);
router.get("/github/redirect", AuthController.githubRedirect);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/refresh", AuthController.refresh);
router.get("/logout", AuthController.logout);

export default router;
