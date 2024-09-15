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
exports.createProduct = exports.getProducts = void 0;
const prismadb_1 = __importDefault(require("../../utils/prismadb"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString();
        const products = yield prismadb_1.default.products.findMany({
            where: {
                name: { contains: search }
            }
        });
        return res.status(200).json({ products, success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving products" });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, name, price, rating, stockQuantity } = req.body;
    try {
        const product = yield prismadb_1.default.products.create({
            data: { productId, name, price, rating, stockQuantity }
        });
        return res.status(201).json({ success: true, product });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error creating product" });
    }
});
exports.createProduct = createProduct;
