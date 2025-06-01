import express, { Request, Response } from "express";
import authorRoutes from "./routes/author.routes";
import bookRoutes from "./routes/book.routes";
import loansRoutes from "./routes/loan.routes";
import memberRoutes from "./routes/member.routes";

const app = express();
app.use(express.json());

app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loansRoutes);
app.use("/api/members", memberRoutes);

export default app;
