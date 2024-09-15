import express from "express";
import { getExpensesByCategory } from "../controllers/expense.controller";


const router = express.Router();

router.get("/", getExpensesByCategory)

export default router;