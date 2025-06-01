import db from "../models/index";
import { Request, Response } from "express";

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await db.Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
