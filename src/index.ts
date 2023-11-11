import express from "express";
import { router } from "./routes";
import { connectToDatabase } from "./models/connect";

async function main() {
	const app = express();

	const port = 8080;
	
	app.use(router);
	
	let conn = await connectToDatabase(process.env.DB_CONN_STRING!)
	let result = await conn.db("admin").command({ ping: 1 });
	console.log(result)
	
	app.listen(8080, () => {
		console.log(`Listening on http://localhost:${port}`);
	});
	
}
main()
