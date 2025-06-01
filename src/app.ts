import express, { Request, Response } from "express";
import authorRoutes from "./routes/author.routes";
import bookRoutes from "./routes/book.routes";
import loansRoutes from "./routes/loan.routes";
import memberRoutes from "./routes/member.routes";

// Create a new express application instance
const app = express();
app.use(express.json());

app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loansRoutes);
app.use("/api/members", memberRoutes);

export default app;
// Set the network port
// const port = process.env.PORT || 3000;

// Initialize Sequelize for PostgreSQL connection
// const sequelize = new Sequelize(
//   process.env.DB_NAME as string,
//   process.env.DB_USER as string,
//   process.env.DB_PASSWORD as string,
//   {
//     host: process.env.DB_HOST as string, // Replace with your database host
//     dialect: "postgres", // Specify PostgreSQL as the dialect
//   }
// );

// Test the connection
// const connectToDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection to PostgreSQL has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// connectToDB();

// // Define the root path with a greeting message
// app.get("/", (req: Request, res: Response) => {
//   res.json({ message: "Welcome to the Express + TypeScript Serverssss!" });
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`The server is running at http://localhost:${port}`);
// });
