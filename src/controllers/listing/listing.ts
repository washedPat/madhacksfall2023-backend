import { Request, Response } from "express";
import { connectToDatabase } from "../../models/connect";
import { Listing } from "../../models/listing";
import {v4 as uuid}  from "uuid"
import { z } from "zod";


async function createListingController(req: Request, res: Response){
	try {
		const client = await connectToDatabase(process.env.DB_CONN_STRING as string);
		const database = client.db(process.env.DB_NAME);

		const listings = database.collection<Listing>("Listings");

		const body = Listing.parse(req.body);

		body.id = uuid();

		await listings.insertOne(body);

		return res.status(200).json({
			"message": "OK"
		})
	} catch(e) {
		console.log(e);
		res.status(500).json({
			"message": "Error while creating listing"
		})
	}
}

const QueryFields = z.object({
	maxPrice: z.number().positive(),
	minPrice: z.number().positive()
});

type QueryFields = z.infer<typeof QueryFields>;

async function queryListingsController(req: Request, res: Response) {
	try {
		const client = await connectToDatabase(process.env.DB_CONN_STRING as string);
		const database = client.db(process.env.DB_NAME);

		const listings = database.collection<Listing>("Listings");

		const body = QueryFields.parse(req.body);

		const cursor = listings.find({
			"price": {
				$lt: body.maxPrice,
				$gt: body.minPrice
			}
		});

		let results: Listing[] = [];
		for await (const doc of cursor) {
			console.log(doc);
			results.push(doc)
		}

		res.status(200).json(results);
	}catch(e) {
		console.log(e);
		return res.status(500).json({
			"message": "Error while querying listings"
		});
	}
}

export { createListingController, queryListingsController };
