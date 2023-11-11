import { Request, Response } from "express";
import { z } from "zod";
import { connectToDatabase } from "../../models/connect";
import { User } from "../../models/user";

const RegisterBody = z.object({
	username: z.string(),
	password: z.string()
})

type RegisterBody = z.infer<typeof RegisterBody>;


async function registerController(req: Request, res: Response) {
	try {
		const client = await connectToDatabase(process.env.DB_CONN_STRING as string);

		const body: RegisterBody = RegisterBody.parse(req.body); 

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

		// insert user otherwise
		await users.insertOne(body);
		
		// return OK
		
		return res.status(200).json({
			"message": "OK",
			"data": {
				"username": req.body
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
