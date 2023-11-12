import { Request, Response } from "express";
import { connectToDatabase } from "../../models/connect";
import { z } from "zod";
import { Listing } from "../../models/listing";

const GetUserListingsBody = z.object({
	username: z.string()
});
type GetUserListingsBody = z.infer<typeof GetUserListingsBody>;

async function getUserListingsController(req: Request, res: Response){
	const body = GetUserListingsBody.parse(req.query);
	const client = await connectToDatabase(process.env.DB_CONN_STRING as string);
	const database = client.db(process.env.DB_NAME);

	const listings = database.collection<Listing>("Listings");

	const cursor = listings.find({
		createdBy: body.username
	});

	let results: Listing[] = [];
	for await (const doc of cursor) {
		results.push(doc);
	}

	return res.status(200).json(results);
}

export { getUserListingsController };
