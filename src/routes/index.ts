import { Router } from "express";
import AuthRouter from "./auth.router";
import LinksRouter from "./links.router";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/links", LinksRouter);

export default router;
