import axios from "axios";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";

import { useRouter } from "next/router"
import { CommentApiResponse } from "@/interface";
import { useQuery } from "react-query";

interface CommentProps {
    storeId: number;
}

export default function Comments({ storeId }: CommentProps) {

    const { status } = useSession();

    const router = useRouter();

    const { page = "1" } = router.query;

    const fetchComments = async () => {
        const { data } = await axios(`api/comment?storeId=${storeId}&limit=10&page=${page}`);
        return data as CommentApiResponse;
    }

    const {data: comments} = useQuery(`comments-${storeId}`, fetchComments)

    return (
        <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">

            {/* comment form */}
            <div className="space-y-4">
                {status === "authenticated" &&
                    <CommentForm storeId={storeId} />
                }

                {/* comment list */}

            </div>

        </div>
    )
}