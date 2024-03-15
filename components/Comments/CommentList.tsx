import { CommentApiResponse } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface CommentListProps {
    comments?: CommentApiResponse;
}



export default function CommentList({comments}: CommentListProps) {
   
    const { status, data: session } = useSession();

    const handleDeleteComment = async (id: number) => {
        const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
        if(confirm) {
            try {
                const result = await axios.delete(`/api/comments?id=${id}`)
                if(result.status === 200){
                    toast.success("성공적으로 삭제하였습니다")
                } else {
                    toast.error("다시 시도해 주세요")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
   
    return(
        <div className="my-10">
        {comments?.data && comments?.data?.length > 0 ?
            (
                comments?.data?.map((comment) => (
                   <div key={comment.id} className="flex items-center space-x-4 text-sm text-gray-500 mb-8 border-b border-gray-300 pb-4">
                        <div>
                            <img className="rounded-full bg-gray-10 h-10 w-10" alt="profile image" 
                            width={40} height={40}  src={comment?.user?.image || '/images/markers/default.png'}/>
                        </div>
                        <div className="flex flex-col flex-1 space-y-2">
                            <div>
                                {comment?.user?.name ?? "사용자"} | {comment?.user?.email}
                            </div>
                            <div >
                                {new Date(comment?.createdAt)?.toLocaleDateString()}
                            </div>
                            <div className="text-black font-medium mt-1">
                                {comment?.body}
                            </div>
                        </div>
                        <div>
                            {comment.userId === session?.user.id && (
                                <button onClick={()=> handleDeleteComment(comment.id)} 
                                type="button" className="underline text-gray-500 hover:text-gray-400">삭제하기</button>
                            )}
                        </div>
                   </div> 
                ))
            )
            :
            <div className="p-4 border border-gray-200 rounded-md text-sm"> 댓글이 없습니다 </div>}
    </div>
    )
}