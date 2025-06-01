import db from "../models";
import { Request, Response } from "express";
import { ResponseBuilder } from "../utils/reponseBuilder";

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
