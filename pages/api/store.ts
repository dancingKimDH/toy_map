import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import { Prisma, PrismaClient } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<StoreApiResponse>
) {
    const prisma = new PrismaClient;

    // pagination page setting
    const { page = "1" }: { page?: string } = req.query;
    const skipPage = parseInt(page) - 1;
    const count = await prisma.store.count();

    // 직접 import 하는 방법
    // const stores = (await import("../../data/store_data.json"))["DATA"] as StoreType[];

    // prisma로 가져오는 방법 + pagination
    const stores = await prisma.store.findMany({
        orderBy: { id: "asc" },
        take: 10,
        skip: skipPage * 10,
    });

    res.status(200).json({
        page: parseInt(page),
        data: stores,
        totalCount: count,
        totalPage: Math.ceil(count / 10)
    });
}