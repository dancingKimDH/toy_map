import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/db";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { CommentApiResponse, CommentInterface } from "@/interface";

interface Responsetype {
    page?: string,
    limit?: string,
    storeId?: string,
    id?: string;
    user?: boolean;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CommentApiResponse | CommentInterface>) {

    const session = await getServerSession(req, res, authOptions);

    const { id = "", page = "1", limit = "10", storeId = "", user = false }: Responsetype = req.query;

    if (req.method === "POST") {

        // create comment

        if (!session?.user) {
            return res.status(401)
        }

        const { storeId, body }: { storeId: number, body: string } = req.body;
        const comment = await prisma.comment.create({
            data: {
                storeId,
                body,
                userId: session?.user.id,
            }
        })

        return res.status(200).json(comment);

    } else if (req.method === "DELETE") {
        // delete comment

        if (!session?.user || !id) {
            return res.status(401);
        }

        const result = await prisma.comment.delete({
            where: {
                id: parseInt(id),
            }
        })

        return res.status(200).json(result);

    } else {
        // get comment

        const skipPage = parseInt(page) - 1;

        const count = await prisma.comment.count({
            where: {
                storeId: storeId ? parseInt(storeId) : {},
                userId: user ? session?.user.id : {},
            }
        })

        const comments = await prisma.comment.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                storeId: storeId ? parseInt(storeId) : {},
                userId: user ? session?.user.id : {},
            },
            skip: skipPage * parseInt(limit),
            take: parseInt(limit),
            include: {
                user: true,
                store: true,
            }
        });

        return res.status(200).json({
            data: comments,
            page: parseInt(page),
            totalPage: Math.ceil(count / parseInt(limit))
        })
    }
}