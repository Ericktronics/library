import { Router } from "express";
import {
  getMembers,
  createMembers,
  updateMember,
  deleteMember,
  getMemberById,
} from "../controller/member.controller";

const router = Router();

router.get("/", getMembers);
router.post("/", createMembers);
router.put("/:memberId", updateMember);
router.delete("/:memberId", deleteMember);
router.get("/:memberId", getMemberById);

export default router;
