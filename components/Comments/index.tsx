import { useForm } from "react-hook-form";

interface CommentProps {
    storeId: number;
}

export default function Comments({ storeId }: CommentProps) {

    const { register, handleSubmit, resetField, formState: { errors } } = useForm()

    return (
        <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">

            {/* comment form */}
            <div className="space-y-4">
                <form className="flex flex-col space-y-2"
                onSubmit={handleSubmit(async (data) => { console.log(data) })} action="">
                    
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


            </div>

        </div>
    )
}