import express from "express";
import { test, createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
router.post("/create", verifyToken, createListing);

export default router;
