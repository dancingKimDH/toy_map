import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "@/db"
import axios from "axios";

interface ResponseType {
    page?: string;
    limit?: string;
    q?: string;
    district?: string;
    id?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<StoreApiResponse | StoreType[] | StoreType | null>
) {

    // pagination page setting
    const { page = "", limit = "", q, district, id }: ResponseType = req.query;

    if (req.method === "POST") {

        const formData = req.body;

        // Kakao API
        const headers = {
            Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
        };

        const { data } = await axios.get(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(formData.address)}`, { headers })

        const result = await prisma.store.create({
            //     data : ---> key in the key-value pair, a key expected as per its API, a name of the property
            //     ...data ---> spread operator, represents the value (from the req.body) that is being assigned to the 'data' key
            data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
        });

        return res.status(200).json(result);

    } else if (req.method === "PUT") {

        const formData = req.body;

        // Kakao API
        const headers = {
            Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
        };

        const { data } = await axios.get(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(formData.address)}`, { headers })

        const result = await prisma.store.update({
            where: { id: formData.id },
            data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x }
        })

        return res.status(200).json(result);

    } else if (req.method === "DELETE") {

        if (id) {
            const result = await prisma.store.delete({
                where: { id: parseInt(id), }
            })
            return res.status(200).json(result);
        } else {
            return res.status(500).json(null);
        }

    } else {

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
                where: {
                    name: q ? { contains: q } : {},
                    address: district ? { contains: district } : {},
                },
                take: parseInt(limit),
                skip: skipPage * 10,
            });

            res.status(200).json({
                page: parseInt(page),
                data: stores,
                totalCount: count,
                // Math.ceil ---> rounds a number up to the nearest whole number
                totalPage: Math.ceil(count / 10)
            });

        }

        else {

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




}