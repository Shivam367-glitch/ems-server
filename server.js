import express from "express";
import { connectDb } from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors"; 
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(
    `<div><h1 style="color:red;text-align:center;">Building Something amazing with Node.js and MongoDB!</h1></div>`,
  );
}); 

app.use("/api/events", eventRoutes);


// catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


// central error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
});


connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });