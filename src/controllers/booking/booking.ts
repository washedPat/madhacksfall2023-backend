import { Request, Response } from "express";
import { connectToDatabase } from "../../models/connect";
import { z } from "zod";
import { Listing } from "../../models/listing";

const GetUserListingsBody = z.object({
	username: z.string()
});
type GetUserListingsBody = z.infer<typeof GetUserListingsBody>;

async function getUserListingsController(req: Request, res: Response) {
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

const BookListingBody = z.object({
	username: z.string(),
	listingID: z.string()
});
type BookListingBody = z.infer<typeof BookListingBody>;
async function bookListing(req: Request, res: Response) {
	try {
		const body = BookListingBody.parse(req.body);
		const client = await connectToDatabase(process.env.DB_CONN_STRING as string);
		const database = client.db(process.env.DB_NAME);

		const listings = database.collection<Listing>("Listings");

		const result = await listings.findOneAndUpdate({
			"id": body.listingID
		},
			{
				"$set": {
					"booked": true,
					"bookedBy": body.username
				}
			})
		if (!result) {
			res.status(400).json({
				"message": "Could not book listing because listing could not be found"
			});
		}

		return res.status(200).json({
			"message": "OK"
		});

	} catch (e) {
		console.log(e);
		return res.status(500).json({
			"message": "Error could book listing due to an error",
			"error": e
		});
	}
}

const GetUserBookingsParams = z.object({
	username: z.string()
})
type GetUserBookingsParams = z.infer<typeof GetUserBookingsParams>;
async function getUserBookingsController(req: Request, res: Response) {
	try {
		const body = GetUserBookingsParams.parse(req.query);
		const client = await connectToDatabase(process.env.DB_CONN_STRING as string);
		const database = client.db(process.env.DB_NAME);

		const listings = database.collection<Listing>("Listings");

		const cursor = listings.find({
			bookedBy: body.username
		});

		let results: Listing[] = [];
		for await (const doc of cursor) {
			results.push(doc);
		}

		return res.status(200).json(results);
	} catch(e) {
		return res.status(500).json({
			"message": "Error while retrieving user bookings",
			"error": e
		});
	}
}
export { getUserListingsController, bookListing, getUserBookingsController };
