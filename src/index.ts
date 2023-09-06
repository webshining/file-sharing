import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import http from "http";
import "reflect-metadata";
import { PORT } from "./data/config";
import routes from "./routes";

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: ["https://webshining.fun"],
		credentials: true,
	})
);
app.use("/api", routes);
const httpServer = http.createServer(app);

const start = async () => {
	httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
