import db from "../models/index";
import { Request, Response } from "express";
import { ResponseBuilder } from "../utils/reponseBuilder";
import Author from "../models/author.model";

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await db.Book.findAll();
    res
      .status(200)
      .json(ResponseBuilder.success(books, "Books fetched successfully"));
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, authorId, publishedYear } = req.body;
    if (!title || !authorId || !publishedYear) {
      res
        .status(400)
        .json(
          ResponseBuilder.error(
            "Title, authorId, and publicationYear are required",
            400
          )
        );
      return;
    }
    if (typeof authorId !== "number" || typeof publishedYear !== "number") {
      res
        .status(400)
        .json(
          ResponseBuilder.error(
            "authorId and publishedYear must be numbers",
            400
          )
        );
      return;
    }

    // Check if the author exists
    const author = Author.findByPk(authorId);
    if (!author) {
      res.status(404).json(ResponseBuilder.error("Author not found", 404));
      return;
    }

    const newBook = await db.Book.create({
      title,
      author_id: authorId,
      published_year: publishedYear,
    });

    res
      .status(201)
      .json(ResponseBuilder.success(newBook, "Book created successfully"));
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;
    const { title, authorId, publishedYear } = req.body;

    if (!title || !authorId || !publishedYear) {
      res
        .status(400)
        .json({ message: "Title, authorId, and publishedYear are required" });
      return;
    }

    const book = await db.Book.findByPk(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    // Check if the author exists
    const author = Author.findByPk(authorId);
    if (!author) {
      res.status(404).json(ResponseBuilder.error("Author not found", 404));
      return;
    }

    book.title = title;
    book.author_id = authorId;
    book.published_year = publishedYear;

    await book.save();

    res
      .status(200)
      .json(ResponseBuilder.success(book, "Book updated successfully"));
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;

    const book = await db.Book.findByPk(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    await book.destroy();

    res
      .status(200)
      .json(ResponseBuilder.success(undefined, "Book deleted successfully"));
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;

    const book = await db.Book.findByPk(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res
      .status(200)
      .json(ResponseBuilder.success(book, "Book fetched successfully"));
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};