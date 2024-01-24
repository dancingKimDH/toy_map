import type { NextApiRequest, NextApiResponse } from "next";
import { StoreType } from "@/interface";
import { Prisma, PrismaClient } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<StoreType[]>
) {
    const prisma = new PrismaClient;
    
    // 직접 import 하는 방법
    // const stores = (await import("../../data/store_data.json"))["DATA"] as StoreType[];

    // prisma로 가져오는 방법
    const stores = await prisma.store.findMany();

    res.status(200).json(stores);
}