import express from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/eventController.js";
import { validateEvent } from "../middleware/validateEvent.js";

const router = express.Router();

router.route("/").get(getAllEvents).post(createEvent);

router
  .route("/:id")
  .get(validateEvent, getEventById)
  .put(validateEvent, updateEvent)
  .delete(validateEvent, deleteEvent);

export default router;
