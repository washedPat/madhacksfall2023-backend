import { Request, Response } from "express";
import { z } from "zod";
import { connectToDB } from "../../util";

const RegisterBody = z.object({
	username: z.string(),
	password: z.string()
})

type RegisterBody = z.infer<typeof RegisterBody>;

const User = z.object({
	username: z.string(),
	password: z.string()
})

type User = z.infer<typeof User>;

async function registerController(req: Request, res: Response) {
	try {
		const client = await connectToDB();
		await client.db("admin").command({ ping: 1 });
		const body: RegisterBody = RegisterBody.parse(req.body); 
		console.log(body);

		// check if registrant is already a user
		
		const database = client.db("parking-app");
		const users = database.collection<User>("users");

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
			"message": "OK"
		})
	} catch {
		return res.status(500).json({
			"message": "Error occurred while registering user"
		})
	}
}

export { registerController } ;
