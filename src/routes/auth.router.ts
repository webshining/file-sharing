import { Router } from "express";
import AuthController from "../controller/auth.controller";

const router = Router();

router.get("/google", AuthController.oauth);
router.get("/github", AuthController.oauth);
router.get("/google/redirect", AuthController.redirect);
router.get("/github/redirect", AuthController.redirect);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/refresh", AuthController.refresh);
router.get("/logout", AuthController.logout);

export default router;
