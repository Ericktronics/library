import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from "../controller/author.controller";

const router = Router();

router.get("/", getAuthors);
router.post("/", createAuthor);
router.put("/:authorId", updateAuthor);
router.delete("/:authorId", deleteAuthor);
router.get("/:authorId", getAuthorById);

export default router;
