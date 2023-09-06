import { Router } from "express";
import { body, query } from "express-validator";
import LinkController from "../controller/link.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import ErrorMiddleware from "../middlewares/error.middleware";

const router = Router();

const hrefValidation = [
	body("href")
		.notEmpty()
		.withMessage("Href is required")
		.custom((value: string) => value.replace(/\s*/, "")),
];

const idValidation = [query("id").isInt().withMessage("Not valid id")];

router.get("/", AuthMiddleware, LinkController.get);
router.post("/", AuthMiddleware, hrefValidation, ErrorMiddleware, LinkController.create);
router.put("/:id", AuthMiddleware, idValidation, ErrorMiddleware, LinkController.update);
router.delete("/:id", AuthMiddleware, idValidation, ErrorMiddleware, LinkController.delete);

export default router;
