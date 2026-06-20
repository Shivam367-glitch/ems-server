import Event from "../models/Event.js";
import { validatUpdataData } from "../utility/utility.js";
import asyncHandler from "express-async-handler";
// create a new event
export const createEvent = asyncHandler(async (req, res) => {


    const {title,description,dateTime,venue,entryFee,totalSeats,status} = req.body ||{};

    if (!title ||!description ||!dateTime ||!venue ||entryFee === undefined ||totalSeats === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const event = await Event.create({title,description,dateTime,venue,entryFee,totalSeats,status});

    res
      .status(201)
      .json({
        success: true,
        message: "Event created successfully",
        data: event,
      });
});

// Get All Events with pagination and search and by status also
export const getAllEvents = asyncHandler(async (req, res) => { 

    const { search, status,page } = req.query ||{}; 

     const limit = process.env.LIMIT; 
     const skip = (page - 1) * limit;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const events = await Event.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Event.countDocuments(query); 

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total/limit),
      data: events,
    });
});

//Get Event Detail By ID 

export const getEventById = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.event
  });
});

// Update Event Details By ID

export const updateEvent = asyncHandler(async (req, res) => {


    const {id}=req.params; 
    
    const requestFields = Object.keys(req.body);

    validatUpdataData(req.body); 

    const updateData = {};
    requestFields.forEach((field) => {
      updateData[field] = req.body[field];
    });

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
      returnDocument: true,
      runValidators: true,
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Event updated successfully",
        data: updatedEvent,
      });
});


// delete Event By ID
export const deleteEvent=asyncHandler(async (req,res)=>{

       const { id } = req.params;
       await Event.findByIdAndDelete(id); 

       return res.status(200).json({ success: true, message: "Event deleted successfully" });
});
