import axios from "axios";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";

import { useRouter } from "next/router"
import { CommentApiResponse } from "@/interface";
import { useQuery } from "react-query";
import { cp } from "fs";
import CommentList from "./CommentList";
import Pagination from "../Pagination";

interface CommentProps {
    storeId: number;
}

export default function Comments({ storeId }: CommentProps) {

    const { status, data: session } = useSession();

    const router = useRouter();
    0
    const { page = "1" }: any = router.query;

    const fetchComments = async () => {
        const { data } = await axios.get(`/api/comments?storeId=${storeId}&limit=5&page=${page}`);
        return data as CommentApiResponse;
    }

    const { data: comments, refetch }: any = useQuery(`comments-${storeId}-${page}`, fetchComments)

    return (
        <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">

            {/* comment form */}
            <div className="space-y-4">
                {status === "authenticated" &&
                    <CommentForm storeId={storeId} refetch={refetch} />
                }

                {/* comment list */}

                <CommentList comments={comments} />

                {/* Pagination */}

                {comments?.totalPage && (
                    <Pagination total={comments.totalPage} page={page} pathName={`/stores/${storeId}`} />
                )}


            </div>

        </div>
    )
}