import express from "express";
import { router } from "./routes";
import { connectToDatabase } from "./models/connect";

async function main() {
	const app = express();

const port = 8080;

app.use(express.json())

app.use(router);

app.listen(8080, () => {
	console.log(`Listening on http://localhost:${port}`);
});
