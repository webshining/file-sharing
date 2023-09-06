import { Router } from "express";
import AuthRouter from "./auth.router";
import LinkRouter from "./link.router";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/links", LinkRouter);

export default router;
