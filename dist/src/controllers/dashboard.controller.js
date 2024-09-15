"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const prismadb_1 = __importDefault(require("../../utils/prismadb"));
const getDashboardMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularProducts = yield prismadb_1.default.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: "desc"
            }
        });
        const salesSummary = yield prismadb_1.default.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        });
        const purchaseSummary = yield prismadb_1.default.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        });
        const expenseSummary = yield prismadb_1.default.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        });
        const expenseByCategorySummaryRaw = yield prismadb_1.default.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: "desc"
            }
        });
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => (Object.assign(Object.assign({}, item), { amount: item.amount.toString() })));
        return res.status(200).json({
            success: true,
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving dashboard metrics" });
    }
});
exports.getDashboardMetrics = getDashboardMetrics;
