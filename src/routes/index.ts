import { Router } from "express";
import { indexController, registerController, loginController  } from "../controllers";

const router = Router();

router.get("/", indexController);
router.post("/api/register", registerController);
router.post("/api/login", loginController);

export { router };
