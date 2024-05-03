import { Router } from "express";
import { body, param } from "express-validator";
import LinkController from "../controller/link.controller";
import ErrorMiddleware from "../middlewares/error.middleware";

const router = Router();

const hrefBodyValidation = body("href")
	.notEmpty()
	.withMessage("Href is required")
	.isLength({ min: 3, max: 15 })
	.withMessage("isLength {min: 3, max: 15}")
	.customSanitizer((value: string) => value.replace(/\s*/g, ""));
const hrefParamValidation = param("href").isString().withMessage("Not valid href");
const idParamValidation = param("id").isInt().withMessage("Not valid id");

router.get("/", LinkController.getMy);
router.get("/:href", [hrefParamValidation, ErrorMiddleware], LinkController.getOne);
router.get("/:href/:id", [hrefParamValidation, idParamValidation, ErrorMiddleware], LinkController.getFile);
router.post("/", [hrefBodyValidation, ErrorMiddleware], LinkController.create);
router.put("/:id", [idParamValidation, hrefBodyValidation, ErrorMiddleware], LinkController.update);
router.delete("/:id", [idParamValidation, ErrorMiddleware], LinkController.delete);

export default router;
