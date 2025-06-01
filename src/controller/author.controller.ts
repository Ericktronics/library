import db from "../models/index";
import { Request, Response } from "express";

export const getAuthors = async (req: Request, res: Response): Promise<void> => {
  try {
    const authors = await db.Author.findAll();
    res.status(200).json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
