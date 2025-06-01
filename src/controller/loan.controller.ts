import db from "../models";
import { Request, Response } from "express";
import { ResponseBuilder } from "../utils/reponseBuilder";
import { epochToDate } from "../utils/epochToDateConverter";

export const getLoans = async (req: Request, res: Response): Promise<void> => {
  try {
    const loans = await db.Loan.findAll({
      include: [
        { model: db.Book, as: "book" },
        { model: db.Member, as: "member" },
      ],
    });
    res
      .status(200)
      .json(ResponseBuilder.success(loans, "Loans fetched successfully"));
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createLoan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId, memberId, loanDate } = req.body;

    if (!bookId || !memberId || !loanDate) {
      res
        .status(400)
        .json({ message: "bookId, memberId and loanDate fields are required" });
      return;
    }

    // Validate bookId and memberId
    const book = await db.Book.findByPk(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    const member = await db.Member.findByPk(memberId);
    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    const loan = await db.Loan.create({
      book_id: bookId,
      member_id: memberId,
      loan_date: new Date(epochToDate(loanDate)),
    });

    res
      .status(201)
      .json(ResponseBuilder.success(loan, "Loan created successfully"));
  } catch (error) {
    console.error("Error creating loan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateLoan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { loanId } = req.params;
    const { bookId, memberId, loanDate, returnDate } = req.body;

    const loan = await db.Loan.findByPk(loanId);
    if (!loan) {
      res.status(404).json({ message: "Loan not found" });
      return;
    }

    if (bookId) {
      const book = await db.Book.findByPk(bookId);
      if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
      }
      loan.book_id = bookId;
    }

    if (memberId) {
      const member = await db.Member.findByPk(memberId);
      if (!member) {
        res.status(404).json({ message: "Member not found" });
        return;
      }
      loan.member_id = memberId;
    }

    if (loanDate) {
      loan.loan_date = new Date(epochToDate(loanDate));
      loan.return_date = null; // Reset return date if loan date is updated
    }

    if (returnDate) {
      loan.return_date = new Date(epochToDate(returnDate));
    }

    await loan.save();

    res
      .status(200)
      .json(ResponseBuilder.success(loan, "Loan updated successfully"));
  } catch (error) {
    console.error("Error updating loan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteLoan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { loanId } = req.params;

    const loan = await db.Loan.findByPk(loanId);
    if (!loan) {
      res.status(404).json({ message: "Loan not found" });
      return;
    }

    await loan.destroy();

    res
      .status(200)
      .json(ResponseBuilder.success(undefined, "Loan deleted successfully"));
  } catch (error) {
    console.error("Error deleting loan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLoanById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { loanId } = req.params;

    const loan = await db.Loan.findByPk(loanId, {
      include: [
        { model: db.Book, as: "book" },
        { model: db.Member, as: "member" },
      ],
    });

    if (!loan) {
      res.status(404).json({ message: "Loan not found" });
      return;
    }

    res
      .status(200)
      .json(ResponseBuilder.success(loan, "Loan fetched successfully"));
  } catch (error) {
    console.error("Error fetching loan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}