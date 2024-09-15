import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import 'dotenv/config'
import dashboardRoutes from "./routes/dashboard.routes";
import productRoutes from "./routes/product.routes";
import userRoutes from "./routes/user.routes";
import expenseRoutes from "./routes/expense.routes";
const app:Application = express();

const PORT: Number = Number(process.env.PORT ?? "3001");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));

// ROUTES
app.use("/dashboard", dashboardRoutes)
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);


// SERVER
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
