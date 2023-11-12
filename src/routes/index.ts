import { Router } from "express";
import { indexController, registerController, loginController, createListingController  } from "../controllers";

const router = Router();

router.get("/", indexController);

router.post("/api/register", registerController);
router.post("/api/login", loginController);

router.post("/api/createListing", createListingController);

export { router };
