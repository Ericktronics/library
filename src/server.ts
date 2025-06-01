import app from "./app";
import { Request, Response } from "express";
import dotenv from "dotenv";
import db from "./models";

dotenv.config();

const port = process.env.PORT || 3000;
// Test the connection
const connectToDB = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync(); // Sync models with the database
    console.log("Connection to PostgreSQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectToDB();

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScript Serverssss!" });
});

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
