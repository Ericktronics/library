import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
  getBookById,
} from "./../controller/book.controller";

const router = Router();

router.get("/", getBooks);
router.post("/", createBook);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);
router.get("/:bookId", getBookById);

export default router;
