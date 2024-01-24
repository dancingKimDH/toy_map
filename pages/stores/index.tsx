import Loading from "@/components/Loading";
import { StoreType } from "@/interface";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "react-query";

export default function StoreListPage() {

    const { isLoading, isError, data: stores } = useQuery("stores", async () => {
        const { data } = await axios("/api/store");
        return data as StoreType[];
    })

    if (isError) {
        return <div className="w-full h-screen mx-auto pt-[10%] text-red-500 font-semibold">다시 시도해 주세요</div>
    }

    return (
        <div className="px-4 md:max-w-4xl mx-auto py-8">
            <ul role="list" className="divide-y divide-gray-100">
                {isLoading ? <Loading/> : stores?.map((store, index) => (
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
            </ul>
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