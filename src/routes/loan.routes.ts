import {
  getLoans,
  createLoan,
  updateLoan,
  deleteLoan,
  getLoanById,
} from "./../controller/loan.controller";
import { Router } from "express";

const router = Router();

router.get("/", getLoans);
router.post("/", createLoan);
router.put("/:loanId", updateLoan);
router.delete("/:loanId", deleteLoan);
router.get("/:loanId", getLoanById);

export default router;
