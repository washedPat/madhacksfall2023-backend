import { Request, Response } from "express";
import { connectToDatabase } from "../../models/connect";
import { Listing } from "../../models/listing";
import { v4 as uuid } from "uuid"
import axios from 'axios';
import { z } from "zod";
import { euclideanDistance } from "./distance";



async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
	const url = 'https://maps.googleapis.com/maps/api/geocode/json';

	// Parameters for the request
	const params = {
		address,
		key: process.env.MAPS,
	};

	try {
		const response = await axios.get(url, { params });

		if (response.status === 200) {
			const result = response.data;

			if (result.status === 'OK') {
				const location = result.results[0].geometry.location;
				const lat = location.lat;
				const lng = location.lng;

				if (lat !== undefined && lng !== undefined) {
					return { lat, lng };
				} else {
					console.log(`Geocoding failed. Status: ${result.status}`);
				}
			} else {
				console.log(`Request failed with status code: ${response.status}`);
			}
		}
	} catch (error) {
		console.error('Error:');
	}

	return null;
}


async function getLatLng(listing: Listing): Promise<{ lat: number, long: number } | null> {
	const fullAddress = `${listing.address.street}, ${listing.address.city}, ${listing.address.state}, ${listing.address.country}, ${listing.address.zip}`;
	const apiKey = process.env.MAPS;
	const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

	try {
		const response = await axios.get(apiUrl, {
			params: {
				address: fullAddress,
				key: apiKey,
			},
		});

		const results = response.data.results;

		if (results && results.length > 0) {
			const location = results[0].geometry.location;
			let latlong = {
				lat: location.lat,
				long: location.lng,
			};
			return latlong;
		} else {
			console.error('No results found for the address.');
			return null;
		}
	} catch (error) {
		console.error('Error fetching data from Google Maps API:', error);
		return null;
	}
}

async function createListingController(req: Request, res: Response) {
	try {
		const client = await connectToDatabase(process.env.DB_CONN_STRING as string);
		const database = client.db(process.env.DB_NAME);

		const listings = database.collection<Listing>("Listings");

		const body = Listing.parse(req.body);

		let location = await getLatLng(body);
		if (!location) {
			return res.status(400).json({
				"message": "Error getting location for listing"
			})
		}
		body.location = location;
		body.id = uuid();
		body.booked = false;

		await listings.insertOne(body);

		return res.status(200).json({
			"message": "OK"
		})
	} catch (e) {
		console.log(e);
		res.status(500).json({
			"message": "Error while creating listing",
			"error": e
		})
	}
}

const QueryFields = z.object({
	maxPrice: z.number().positive(),
	city: z.string(),
	address: z.string(),
	distance: z.number().positive(),
	spotType: z.union([
		z.literal("Tight"),
		z.literal("Normal"),
		z.literal("Wide"),
	])
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
			},
			"booked": false,
			"parkingSize": body.spotType
		});

		const user_addy = body.address + ", " + body.city

		let coords = await geocodeAddress(user_addy);
		if (coords !== null) {
			const cords = coords;

			let results: Listing[] = [];
			for await (const doc of cursor) {
				let eucld_dist = euclideanDistance(cords.lat, cords.lng, doc.location?.lat!, doc.location?.long!);
				if (eucld_dist <= body.distance && body.spotType == doc.parkingSize) {
					results.push(doc)
				}
			}

			res.status(200).json(results);
		}
		return res.status(200).json([]);
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			"message": "Error while querying listings"
		});
	}
}

export { createListingController, queryListingsController };
