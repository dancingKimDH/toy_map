import axios from "axios";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface CommentFormProps {
    storeId: number;
}

export default function CommentForm({ storeId }: CommentFormProps) {

    const { register, handleSubmit, resetField, formState: { errors } } = useForm()

    const { status } = useSession();

    return (
        <form className="flex flex-col space-y-2"
            onSubmit={handleSubmit(async (data) => {
                const result = await axios.post('/api/comment', {
                    ...data,
                    storeId
                })
                console.log(result)

                if (result.status === 200) {
                    toast.success("댓글을 성공적으로 등록하였습니다");
                    resetField("body");
                } else {
                    toast.error("다시 시도해 주세요");
                }

            })} action="">

            {errors?.body?.type === "required" && (
                <div className="text-xs text-red-600">필수 입력 사항입니다</div>
            )}

            <textarea rows={3} placeholder="댓글 작성하기"
                {...register("body", { required: true })}
                className="block w-full min-h-[120px] resize-none border-2 rounded-md bg-transparent py-2.5 px-4
text-black placeholder:text-gray-400 text-sm leading-6"></textarea>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-sm
float-right mt-2 rounded-md">댓글 등록하기</button>
        </form>
    )
}