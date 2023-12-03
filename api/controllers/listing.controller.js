import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({ message: "API route is working" });
};

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
