import { Request, Response } from "express";
import prismadb from "../../utils/prismadb";


export const getProducts = async (req: Request, res: Response) => {
    try {
        const search = req.query.search?.toString();

        const products = await prismadb.products.findMany({
            where: {
                name: { contains: search }
            }
        });

        return res.status(200).json({products, success: true })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving products" })
    }
}

export const createProduct = async (req: Request, res: Response) => {

    const { productId, name, price, rating, stockQuantity } = req.body;

    try {

        const product = await prismadb.products.create({
            data: { productId, name, price, rating, stockQuantity }
        });

        return res.status(201).json({ success: true, product })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating product" })
    }
}