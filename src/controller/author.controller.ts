import db from "../models/index";
import { Request, Response } from "express";
import { ResponseBuilder } from "../utils/reponseBuilder";

export const getAuthors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authors = await db.Author.findAll();
    res
      .status(200)
      .json(ResponseBuilder.success(authors, "Authors fetched successfully"));
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { name, birthYear } = req.body;
    if (!name || !birthYear) {
      res
        .status(400)
        .json(ResponseBuilder.error("Name and birthYear are required", 400));
      return;
    }
    birthYear = parseInt(birthYear, 10);
    const newAuthor = await db.Author.create({ name, birth_year: birthYear });
    res
      .status(201)
      .json(ResponseBuilder.success(newAuthor, "Author created successfully"));
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { authorId } = req.params;
    const { name, birthYear } = req.body;

    if (!name || !birthYear) {
      res.status(400).json({ message: "Name and birthYear are required" });
      return;
    }

    const author = await db.Author.findByPk(authorId);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    author.name = name;
    author.birth_year = parseInt(birthYear, 10);
    await author.save();

    res
      .status(200)
      .json(ResponseBuilder.success(author, "Author updated successfully"));
  } catch (error) {
    console.error("Error updating author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { authorId } = req.params;

    const author = await db.Author.findByPk(authorId);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    await author.destroy();
    res
      .status(200)
      .json(ResponseBuilder.success(undefined, "Author deleted successfully"));
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAuthorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { authorId } = req.params;

    const author = await db.Author.findByPk(authorId);
    if (!author) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    res
      .status(200)
      .json(ResponseBuilder.success(author, "Author fetched successfully"));
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};