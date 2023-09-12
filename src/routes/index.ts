import { Router } from "express";
import AuthRouter from "./auth.router";
import FilesRouter from "./files.router";
import LinksRouter from "./links.router";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/links", LinksRouter);
router.use("/files", FilesRouter);

export default router;
