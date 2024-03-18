/* eslint-disable @next/next/no-img-element */
import CommentList from "@/components/Comments/CommentList";
import Pagination from "@/components/Pagination";

import { CommentApiResponse } from "@/interface";
import axios from "axios";
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { useQuery } from "react-query";

interface CommentProps {
    storeId: number;
}

export default function MyPage() {

    const router = useRouter();
    const { page = "1" }: any = router.query;

    const fetchComments = async () => {
        const { data } = await axios.get(`/api/comments?&limit=5&page=${page}&user=${true}`);
        return data as CommentApiResponse;
    }

    const { data: comments, refetch }: any = useQuery(`comments-${page}`, fetchComments)


    const { data: session } = useSession()

    return (
        <div className="md:max-w-5xl mx-auto px-4 py-8">
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">마이페이지</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">사용자 기본 정보</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">이름</dt>
                        {/* ??: Nullish coalescing operator: if the variable is null or undefined, it provides a default value */}
                        {/* ? : Optional chaining operator: const result = obj?.method();
                              : Ternary conditional operator: const result = condition ? trueValue : falseValue */}
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session?.user.name ?? "사용자"}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">이메일</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session?.user.email}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">프로필</dt>
                        {/* ||: Logical or operator: if the value is falsy, will be replaced with the default value */}
                        <img width={48} height={48} className="w-12 h-12 rounded-full" src={session?.user.image || "/images/markers/default.png"} alt="이미지 프로필" />
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">설정</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <button onClick={() => signOut()} type="button" className="underline hover:text-gray-500">로그아웃</button>
                        </dd>
                    </div>
                    <div className="mt-4 px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">내가 쓴 댓글 보기</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">댓글 리스트</p>
                    </div>
                    <CommentList comments={comments} displayStore={true} />
                    <Pagination total={comments?.totalPage} page={page} pathName="/users/mypage" />

                </dl>
            </div>
        </div>
    )
}