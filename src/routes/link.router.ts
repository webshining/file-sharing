import { Router } from "express";
import LinkController from "../controller/link.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/", AuthMiddleware, LinkController.create);
router.delete("/", AuthMiddleware, LinkController.delete);

export default router;
