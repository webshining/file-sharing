import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import fileUpload from "express-fileupload";
import http from "http";
import "reflect-metadata";
import { PORT } from "./data/config";
import routes from "./routes";

const app: Application = express();
app.use(cookieParser());
app.use(express.json({ limit: "1000mb" }));
app.use(fileUpload({}));
app.use(
	cors({
		origin: ["https://webshining.fun", "localhost", "localhost:3000", "http://localhost:3000"],
		credentials: true,
	})
);
app.use("/api", routes);
const httpServer = http.createServer(app);

const start = async () => {
	httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
