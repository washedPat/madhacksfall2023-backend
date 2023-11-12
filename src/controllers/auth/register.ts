import { Request, Response } from "express";
import { connectToDatabase } from "../../models/connect";
import { User } from "../../models/user";


async function registerController(req: Request, res: Response) {
	try {
		const client = await connectToDatabase(process.env.DB_CONN_STRING as string);

		const body: User = User.parse(req.body); 

		// check if registrant is already a user
		
		const database = client.db(process.env.DB_NAME);
		const users = database.collection<User>(process.env.USERS_COLLECTION_NAME as string);
		console.log(users.dbName);

		const result = await users.findOne({
			"username": body.username
		});

		if(result) {
			return res.status(400).json({
				"message": "User already exists"
			})
		}

		body.plotsRenting = [];
		// insert user otherwise
		await users.insertOne(body);
		
		// return OK
		
		return res.status(200).json({
			"message": "OK",
			"data": {
				"username": body.username 
			}
		})
	} catch(e) {
		console.log(e);
		return res.status(500).json({
			"message": "Error occurred while registering user"
		})
	}
}

export { registerController } ;
