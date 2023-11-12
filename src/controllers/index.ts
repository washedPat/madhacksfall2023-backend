import { registerController } from "../controllers/auth/register";
import { loginController } from "../controllers/auth/login";
import { Request, Response } from "express";
import { createListingController, queryListingsController } from "./listing/listing";

function indexController(req: Request, res: Response){
	return res.send("hello");
}

export { indexController, registerController, loginController, createListingController, queryListingsController };
