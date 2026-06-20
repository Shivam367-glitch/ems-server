import mongoose from "mongoose";
import Event from "../models/Event.js";


// middleware to check valid id and event

export const validateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event id"
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    req.event = event;
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};