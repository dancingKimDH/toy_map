import React, { useCallback, useEffect, useRef } from "react";

import Loading from "@/components/Loading";
import { StoreApiResponse, StoreType } from "@/interface";
import axios from "axios";
import Image from "next/image";
import { useQuery, useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";


export default function StoreListPage() {

    const router = useRouter();

    // destructure page from router.query ---> /store?page=2 ---> page:"2"
    const { page = "1" }: any = router.query;

    // useQuery Hook: Manage and cache asynchronous data in React app
    // `stores-${page}`: Query Key ---> unique identifier for the query ... Each page with own cache entry
    // const { isLoading, isError, data: stores } = useQuery(`stores-${page}`, async () => {

    // The res from axios is awaited and destructured to get the 'data' prop
    // const { data } = await axios(`/api/store?page=${page}`);

    // axios makes HTTP requests and returns a Promise, an object representing the eventual completion/failure of an asynchronous operation
    // The await keyword pauses the execution of the function until the Promise is resolved or rejected.

    // return data as StoreApiResponse;
    // })

    // -------------------------

    // useInfiniteQuery

    // Create a ref using useRef hook
    const ref = useRef<HTMLDivElement | null>(null);

    // An empty object as the second argument ---> the default values(threshold, root, ...) will be used for configuration
    const pageRef = useIntersectionObserver(ref, {});

    const isPageEnd = !!pageRef?.isIntersecting;

    const fetchStores = async ({ pageParam = 1 }) => {
        const { data } = await axios("/api/store?page=" + pageParam,
            {
                params: {
                    limit: 10,
                    page: pageParam
                }
            });
        return data;
    }

    // lastPage : most recently loaded page of data
    const { data: stores, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery("stores", fetchStores,
        { getNextPageParam: (lastPage: any) => lastPage.data?.length > 0 ? lastPage.page + 1 : undefined });


    const fetchNext = useCallback(async () => {
        const res = await fetchNextPage();
        if(res.isError) {
            console.log(res.error);
        }
    }, [fetchNextPage])


    useEffect(() => {
        let timerId: NodeJS.Timeout | undefined;
        if (isPageEnd && hasNextPage) {
            timerId = setTimeout(() => {
                fetchNext();
            }, 500)
        }
        return () => clearTimeout(timerId);
    }, [fetchNextPage, isPageEnd, hasNextPage])

    // The result of useQuery destructured into three props ---> isLoading, isError, data(data returned from the query, later renamed as stores)
    if (isError) {
        return <div className="w-full h-screen mx-auto pt-[10%] text-red-500 font-semibold">다시 시도해 주세요</div>
    }

    if (isFetching) {
        return <Loader className="mt-[20%]"/>
    }

    return (
        <div className="px-4 md:max-w-4xl mx-auto py-8">
            <ul role="list" className="divide-y divide-gray-100">
                {isLoading ? <Loading /> : stores?.pages.map((page, index) => (
                    <React.Fragment key={index}>
                        {page.data.map((store: StoreType, i: number) => (
                            <li className="flex justify-between gap-x-6 py-5" key={index}>
                                <div className="flex gap-x-4">
                                    <Image width={48} height={48} alt="image"
                                        src={store?.category ? `/images/markers/${store?.category}.png` : "/images/markers/default.png"} />
                                    <div className="">
                                        <div className="text-sm font-semibold leading-6 text-gray-900">
                                            {store?.name}
                                        </div>
                                        <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                                            {store?.storeType}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <div className="text-sm font-semibold leading-6 text-gray-900">
                                        {store?.address}
                                    </div>
                                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                                        {store?.phone || "번호 없음"} | {store?.foodCertifyName} | {store?.category}
                                    </div>
                                </div>
                            </li>
                        ))}

                    </React.Fragment>
                ))}
            </ul>

            {/* Pagination 작업 */}
            {/* {stores?.totalPage &&
                <Pagination total={stores?.totalPage} page={page} />
            } */}

            {isFetching && hasNextPage && <Loader />}

            <div className="w-full touch-none h-10 mb-10" ref={ref} />

        </div>
    )
}

// react query 사용 전
// export async function getServerSideProps() {

//     // data fetch
//     // const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store`).then((res) => res.json());
//     // return {
//     //     props: { stores },
//     // }

//     // data fetch through axios
//     const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/store`);
//     return {
//         props: { stores: stores.data },
//     }
// }