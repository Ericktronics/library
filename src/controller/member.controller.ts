import db from "../models";
import { Request, Response } from "express";
import { ResponseBuilder } from "../utils/reponseBuilder";
import { epochToDate } from "../utils/epochToDateConverter";
import { Op } from "sequelize";

export const getMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const members = await db.Member.findAll({
      attributes: [["member_id", "id"], "name", "join_date"],
      include: [
        {
          model: db.Loan,
          where: {
            return_date: {
              [Op.is]: null,
            },
          },
          required: false, // This makes the join optional
          attributes: [
            ["loan_id", "id"],
            "book_id",
            "loan_date",
            "return_date",
          ],
        },
      ],
    });
    res
      .status(200)
      .json(ResponseBuilder.success(members, "Members fetched successfully"));
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, joinDate } = req.body;
    if (!name || !joinDate) {
      res.status(400).json({ message: "name and joinDate are required" });
      return;
    }

    const newMember = await db.Member.create({
      name,
      join_date: new Date(epochToDate(joinDate)),
    });

    res
      .status(201)
      .json(ResponseBuilder.success(newMember, "Member created successfully"));
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { memberId } = req.params;
    const { name, joinDate } = req.body;

    if (!name || !joinDate) {
      res.status(400).json({ message: "name and joinDate are required" });
      return;
    }

    const member = await db.Member.findByPk(memberId);

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    member.name = name;
    member.join_date = new Date(epochToDate(joinDate));
    await member.save();

    res
      .status(200)
      .json(ResponseBuilder.success(member, "Member updated successfully"));
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { memberId } = req.params;

    const member = await db.Member.findByPk(memberId);

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    await member.destroy();

    res
      .status(200)
      .json(ResponseBuilder.success(undefined, "Member deleted successfully"));
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMemberById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { memberId } = req.params;

    const member = await db.Member.findByPk(memberId, {
      include: [
        {
          model: db.Loan,
        },
      ],
    });

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    res
      .status(200)
      .json(ResponseBuilder.success(member, "Member fetched successfully"));
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
