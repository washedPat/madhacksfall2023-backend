import { Request, Response } from "express";
import { z } from "zod";

const LoginBody = z.object({
	username: z.string(),
	password: z.string()
});

type LoginBody = z.infer<typeof LoginBody>; 

function loginController(req: Request, res: Response) {
	const body: LoginBody = LoginBody.parse(req.body);
	console.log(body);
	res.status(200).json({
		"message": "OK"
	})
}

export { loginController };
