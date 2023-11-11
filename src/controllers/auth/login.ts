import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../../models/user";
import { connectToDatabase } from "../../models/connect";

const LoginBody = z.object({
	username: z.string(),
	password: z.string()
});

type LoginBody = z.infer<typeof LoginBody>; 

async function loginController(req: Request, res: Response) {
	try {

		const client = await connectToDatabase(process.env.DB_CONN_STRING as string);
		const database = client.db(process.env.DB_NAME);

		const users = database.collection<User>(process.env.USERS_COLLECTION_NAME as string);

		const body: LoginBody = LoginBody.parse(req.body);

		const result = await users.findOne({
			"username": body.username,
			"password": body.password
		});

		if(!result) {
			return res.status(400).json({
				"message": "User does not exist, or username or password is incorrect"
			})
		}

		res.status(200).json({
			"message": "OK",
			"data" : {
				"username": body.username
			}
		})
	} catch {
		return res.status(500).json({
			"message": "Error occurred while logging in user"
		})
	}
}

export { loginController };
