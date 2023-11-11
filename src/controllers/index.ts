import { Request, Response } from "express";

function indexController(req: Request, res: Response){
	return res.send("hello");
}

export { indexController };
