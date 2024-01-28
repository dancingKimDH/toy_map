import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import { Prisma, PrismaClient } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType>
) {
    const prisma = new PrismaClient;

    // pagination page setting
    const { page = "" }: { page?: string } = req.query;

    if (page) {

        // Converts page string to an integer and subtracts 1 ---> pagination in programming starts from 0
        const skipPage = parseInt(page) - 1;

        // Count the number of records in the store tables
        const count = await prisma.store.count();

        // Fetch directly
        // const stores = (await import("../../data/store_data.json"))["DATA"] as StoreType[];

        // Fetch through prisma + pagination
        const stores = await prisma.store.findMany({
            orderBy: { id: "asc" },
            take: 10,
            skip: skipPage * 10,
        });

        res.status(200).json({
            page: parseInt(page),
            data: stores,
            totalCount: count,
            // Math.ceil ---> rounds a number up to the nearest whole number
            totalPage: Math.ceil(count / 10)
        });

    } else {

        const { id }: { id?: string } = req.query;

        const stores = await prisma.store.findMany(
            {
                orderBy: { id: "asc" },
                where: { id: id ? parseInt(id) : {} }
            }
        )
        res.status(200).json(id ? stores[0] : stores);
    }


}