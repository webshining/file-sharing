import { Router } from "express";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/", AuthMiddleware);
router.delete("/", AuthMiddleware);

export default router;
