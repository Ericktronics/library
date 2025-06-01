import { getLoans } from "./../controller/loan.controller";
import { Router } from "express";

const router = Router();

router.get("/", getLoans);

export default router;
