import { Request, Response } from "express";
import { connectToDatabase } from "../../models/connect";
import { Listing } from "../../models/listing";

import {v4 as uuid}  from "uuid"
import axios from 'axios';

async function getLatLng(listing: Listing): Promise<{lat: number, long: number} | null> {
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



async function createListingController(req: Request, res: Response){
	try {
		const client = await connectToDatabase(process.env.DB_CONN_STRING as string);
		const database = client.db(process.env.DB_NAME);

		const listings = database.collection<Listing>("Listings");

		const body = Listing.parse(req.body);
		
		let location = await getLatLng(body);
		if(!location){
			return res.status(400).json({
				"message": "Error getting location for listing"
			})
		}
		body.location = location;
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
