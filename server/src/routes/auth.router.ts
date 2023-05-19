import { Router } from "express";
import AuthController from "../controller/auth.controller";
const router = Router();


router.get('/google', AuthController.google)

export default router;
