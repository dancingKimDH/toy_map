import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/db";
import { authOptions } from "./auth/[...nextauth]";
import { LikeApiInterface, LikeInterface } from "@/interface";

interface Responsetype {
    page?: string,
    limit?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LikeApiInterface | LikeInterface>) {

    const session = await getServerSession(req, res, authOptions);
    // check if the user is authenticated
    if (!session?.user) {
        return res.status(401);
    }
    if (
        req.method === 'POST'
    ) {
        // Destructuring the request body to extract the storeId prop
        const { storeId }: { storeId: number } = req.body;
        let like = await prisma.like.findFirst({
            where: {
                // Check if the storeId is present and the present userId matches session?.user?.id
                storeId,
                userId: session?.user?.id
            }
        })

        if (like) {
            like = await prisma.like.delete({
                where: {
                    id: like.id,
                }
            })
            return res.status(204).json(like);
        }

        else {
            like = await prisma.like.create({
                data: {
                    storeId,
                    userId: session?.user?.id,
                }
            })
            return res.status(201).json(like)
        }

    } else {

        const { page = "1", limit = "10" }: Responsetype = req.query;
        const skipPage = parseInt(page) - 1;
        const count = await prisma.like.count({
            where: {
                userId: session.user.id
            }
        });

        const likes = await prisma.like.findMany({
            orderBy: { createdAt: "desc" },
            where: {
                userId: session?.user?.id
            },
            include: {
                store: true,
            },
            skip: skipPage * parseInt(limit),
            take: parseInt(limit),
        })

        return res.status(200).json({
            data: likes,
            page: parseInt(page),
            totalPage: Math.ceil(count / parseInt(limit))
        })
    }


}

