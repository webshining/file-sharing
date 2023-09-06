import { Router } from "express";
import LinkController from "../controller/link.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import RequiredMiddleware from "../middlewares/required.middleware";

const router = Router();

const required = [
	{
		key: "href",
		reg: /.{3,}/,
	},
];

router.get("/", AuthMiddleware, LinkController.get);
router.post("/", AuthMiddleware, RequiredMiddleware(required), LinkController.create);
router.put("/:id", AuthMiddleware, RequiredMiddleware(required), LinkController.update);
router.delete("/:id", AuthMiddleware, LinkController.delete);

export default router;
