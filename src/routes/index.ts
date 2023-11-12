import { Router } from "express";
import { indexController, registerController, loginController, createListingController, queryListingsController, getUserListingsController  } from "../controllers";

const router = Router();

router.get("/", indexController);

router.post("/api/register", registerController);
router.post("/api/login", loginController);

router.post("/api/createListing", createListingController);
router.post("/api/queryListings", queryListingsController);

router.get("/api/getUserListings", getUserListingsController);

export { router };
