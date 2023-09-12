import { Router } from "express";
import { body, param } from "express-validator";
import LinkController from "../controller/link.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import ErrorMiddleware from "../middlewares/error.middleware";

const router = Router();

const hrefBodyValidation = [
	body("href")
		.notEmpty()
		.withMessage("Href is required")
		.customSanitizer((value: string) => value.replace(/\s*/g, "")),
	ErrorMiddleware,
];
const hrefParamValidation = [param("href").isString().withMessage("Not valid href"), ErrorMiddleware];
const idValidation = [param("id").isInt().withMessage("Not valid id"), ErrorMiddleware];

router.get("/", AuthMiddleware, LinkController.get);
router.get("/:href", hrefParamValidation, LinkController.getOne);
router.post("/", AuthMiddleware, hrefBodyValidation, LinkController.create);
router.put("/:id", AuthMiddleware, idValidation, hrefBodyValidation, LinkController.update);
router.delete("/:id", AuthMiddleware, idValidation, LinkController.delete);

export default router;
