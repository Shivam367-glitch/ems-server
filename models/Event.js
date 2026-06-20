import mongoose from 'mongoose';


const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [ true, "Title of the event is required"],
    trim: true
  },
  description: {    
   type: String,
    required: [true,"Description of the event is required"],
    trim: true
  }, 
  dateTime: {
    type: "String",
    required: [true,"Date and time of the event is required"]
},
  venue: {
    type: String, 
    required: [true,"Venue of the event is required"],
    trim: true
  },
  entryFee: {
    type: Number,
    required: true,
    min: [0, "Entry fee cannot be negative"]
  },
  totalSeats: {
    type: Number,
    required: true,
    min: [1, "Total seats must be at least 1"]
  },
  status:{
    type: String,
    enum: ["Draft", "Published", "Cancelled"],
    default: "Draft"
  }
}, { timestamps: true });       

const Event = mongoose.model('Event', eventSchema);

export default Event;
