import cookieParser from 'cookie-parser';
import cors from "cors";
import express, { Application } from "express";
import https from 'https';
import "reflect-metadata";
import { CERT, KEY, PORT } from "./data/config";
import routes from "./routes";


const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: ['http://localhost:3000', 'https://localhost:3000'], credentials: true}));
app.use("/api", routes);
const httpsServer = https.createServer({
	key: KEY,
	cert: CERT,
}, app);

const start = async () => {
	httpsServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
