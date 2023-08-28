import { Router } from "express";
import LinkController from "../controller/link.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", AuthMiddleware, LinkController.get);
router.post("/", AuthMiddleware, LinkController.create);
router.put("/:id", AuthMiddleware, LinkController.update);
router.delete("/:id", AuthMiddleware, LinkController.delete);

export default router;
