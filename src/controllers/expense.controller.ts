import { Request, Response } from "express";
import prismadb from "../../utils/prismadb";

export const getExpensesByCategory = async (req: Request, res: Response) => {
    try {
        const expenseByCategorySummaryRaw = await prismadb.expenseByCategory.findMany({ 
            orderBy: {
                date: "desc"
            }
        });

        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
            ...item,
            amount: item.amount.toString(),
        }));

        return res.status(200).json({
            success: true,
            expenseByCategorySummary,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving expenses" })
    }
}