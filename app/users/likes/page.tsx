'use client';

import Loading from "@/components/Loading"
import Pagination from "@/components/Pagination"
import StoreListBox from "@/components/StoreListBox"
import { LikeApiInterface, LikeInterface } from "@/interface"
import axios from "axios"
import React from "react"
import { useQuery } from "react-query"

export default function LikesPage({ params }: { params: { page: string } }) {

    const page = params.page || "1";

    const fetchLikes = async () => {
        const { data } = await axios(`/api/likes?limit=10&page=${page}`)
        return data as LikeApiInterface
    }

    const { data: likes, isError, isLoading, isSuccess } = useQuery(`likes-${page}`, fetchLikes)

    return (
        <div className="px-4 md:max-w-4xl mx-auto py-8">
            <h3 className="text-lg font-semibold">찜한 맛집</h3>
            <div className="mt-1 text-gray-500 text-sm">
                찜한 가게 리스트를 찾아보세요!
            </div>

            <ul role="list" className="divide-y divide-gray-100">
                {isLoading ? <Loading /> :
                    likes?.data ? (likes?.data.map((like: LikeInterface, index: number) => (
                        <StoreListBox index={index} store={like.store} key={index} />
                    ))) : <div>데이터가 없습니다</div>
                }

                {isSuccess && !!!likes.data &&
                    < div className="p-4 border border-gray-200 rounded-md text-sm"> 찜한 가게가 없습니다 </div>
                }

            </ul >
    <Pagination total={likes?.totalPage} page={page} pathName="/users/likes" />
        </div >
    )
}