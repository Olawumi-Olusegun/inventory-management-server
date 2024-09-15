import { Request, Response } from "express";
import prismadb from "../../utils/prismadb";

export const getUsers = async (req: Request, res: Response) => {
    try {
        
        const users = await prismadb.users.findMany({});

        return res.status(200).json({ success: true, users });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving users" })
    }
}