"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv/config");
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const expense_routes_1 = __importDefault(require("./routes/expense.routes"));
const app = (0, express_1.default)();
const PORT = Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "3001");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
// ROUTES
app.use("/dashboard", dashboard_routes_1.default);
app.use("/products", product_routes_1.default);
app.use("/users", user_routes_1.default);
app.use("/expenses", expense_routes_1.default);
// SERVER
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
