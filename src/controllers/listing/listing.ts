import { Request, Response } from "express";
import { connectToDatabase } from "../../models/connect";
import { Listing } from "../../models/listing";

import {v4 as uuid}  from "uuid"

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
	} catch {
		res.status(500).json({
			"message": "Error while creating listing"
		})
	}
}

export { createListingController };
