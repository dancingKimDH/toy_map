import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/db";
import { authOptions } from "./auth/[...nextauth]";
import { CommentApiInterface, CommentInterface } from "@/interface";

interface Responsetype {
    page?: string,
    limit?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CommentApiInterface | CommentInterface>) {

        const session = await getServerSession(req, res, authOptions);
        
        if(!session?.user) {
            return res.status(401)
        }
        
        const {storeId, body}: {storeId: string, body: string} = req.body;
        const comment = await prisma.comment.create({
            data: {
                storeId,
                body,
                userId: session?.user.id,
            }
        })

        if(req.method === "POST") {
            // create comment
        } else if (req.method === "DELETE") {
            // delete comment
        } else {
            // get comment
        }
}