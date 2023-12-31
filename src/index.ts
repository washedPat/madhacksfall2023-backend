import express from "express";
import { router } from "./routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const port = 8080;

app.use(express.json())

app.use(cors());

app.use(router);

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});
