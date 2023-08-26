import { Router } from "express";
import AuthRouter from "./auth.router";
import FileRouter from "./file.router";
import LinkRouter from "./link.router";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/files", FileRouter);
router.use("/links", LinkRouter);

export default router;
