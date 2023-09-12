import { Router } from "express";
import { body, param } from "express-validator";
import FileController from "../controller/file.controller";
import ErrorMiddleware from "../middlewares/error.middleware";

const router = Router();

const filesValidation = [
	body("files")
		.notEmpty()
		.withMessage("Not is required")
		.isArray()
		.withMessage("Not valid files")
		.custom((value) => value.every(Number.isInteger))
		.withMessage("Not valid files"),
	ErrorMiddleware,
];
const hrefValidation = [param("href").isString().withMessage("Not valid href"), ErrorMiddleware];
const idValidation = [param("id").isInt().withMessage("Not valid id"), ErrorMiddleware];

router.get("/:href/:id", hrefValidation, idValidation, FileController.get);
router.post("/:id", idValidation, FileController.create);
router.delete("/:id", idValidation, filesValidation, FileController.delete);

export default router;
