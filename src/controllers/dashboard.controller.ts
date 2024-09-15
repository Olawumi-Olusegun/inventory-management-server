import { Request, Response } from "express";
import prismadb from "../../utils/prismadb";

export const getDashboardMetrics = async (req: Request, res: Response) => {
    try {
        const popularProducts = await prismadb.products.findMany({ 
            take: 15,
            orderBy: {
                stockQuantity: "desc"
            } 
        });

        const salesSummary = await prismadb.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        });

        
        const purchaseSummary = await prismadb.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        });

        const expenseSummary = await prismadb.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        });

        const expenseByCategorySummaryRaw = await prismadb.expenseByCategory.findMany({
            take: 5,
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
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving dashboard metrics" })
    }
}