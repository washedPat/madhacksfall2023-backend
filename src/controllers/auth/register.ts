import { Request, Response } from "express";
import { z } from "zod";

const RegisterBody = z.object({
	username: z.string(),
	password: z.string()
})

type RegisterBody = z.infer<typeof RegisterBody>;

function registerController(req: Request, res: Response) {
	const body: RegisterBody = RegisterBody.parse(req.body); 
	console.log(body);

	// check if registrant is already a user
	
	// insert user otherwise
	
	// return OK
	
	return res.status(200).json({
		"message": "OK"
	})
}

export { registerController } ;
