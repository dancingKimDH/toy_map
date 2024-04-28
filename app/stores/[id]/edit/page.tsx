'use client';

import AddressSearch from "@/components/AddressSearch";
import Loader from "@/components/Loader";
import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from "@/data/store";
import { StoreType } from "@/interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { useQuery } from "react-query";
import { toast } from "react-toastify";


export default function StoreEdit({params}: {params: {id: string}}) {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<StoreType>();

    const router = useRouter();
    const id = params.id;
    const fetchStore = async () => {
        const { data } = await axios(`/api/store?id=${id}`);
        return data as StoreType;
    }
    const { data: store, isFetching, isSuccess, isError } = useQuery(`store-${id}`, fetchStore,
        {
            onSuccess: (data) => {
                setValue("name", data.name); setValue("phone", data?.phone); setValue("lat", data.lat); setValue("lng", data.lng); setValue("address", data.address);
                setValue("foodCertifyName", data.foodCertifyName); setValue("storeType", data?.storeType); setValue("category", data.category); setValue("id", data.id);
            },
            refetchOnWindowFocus: false,
        });

    if (isError) {
        return <div className="w-full h-screen mx-auto pt-[10%] text-red-500 font-semibold">다시 시도해 주세요</div>
    }
    if (isFetching) {
        return <Loader className="mt-[20%]" />
    }


    return (
        <form className="px-4 md:max-w-4xl mx-auto py-8"

            // data : attributes given to each form input and how they are registered in the useForm hook with the register function
            // i.e. data.name ---> <input type="text" {...register("name", { required: true })} />
            onSubmit={handleSubmit(async (data) => {
                try {
                    const result = await axios.put("/api/store", data);

                    if (result.status === 200) {
                        toast.success("성공적으로 수정하였습니다")
                        router.replace(`/stores/${result?.data?.id}`)

                    } else {
                        toast.error("데이터 수정 중 문제가 발생하였습니다. 다시 시도해 주세요")
                    }

                } catch (e) {
                    console.log(e);
                    toast.error("데이터 수정 중 문제가 발생하였습니다. 다시 시도해 주세요")
                }
            })}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">맛집 수정</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">맛집 수정 하기</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                가게 명
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.name?.type === "required" &&
                                    <div className="pt-2 text-xs text-red-600">필수 입력 사항입니다</div>
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                카테고리
                            </label>
                            <div className="mt-2">
                                <select
                                    {...register("category", { required: true })}
                                    className="px-2 outline-none block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="">카테고리 선택</option>
                                    {CATEGORY_ARR?.map((category) => (
                                        <option value={category} key={category}>{category}</option>
                                    ))}
                                </select>
                                {errors.category?.type === "required" &&
                                    <div className="pt-2 text-xs text-red-600">필수 입력 사항입니다</div>
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                연락처
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("phone", { required: true })}
                                    className="block w-full outline-none px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.phone?.type === "required" &&
                                <div className="pt-2 text-xs text-red-600">필수 입력 사항입니다</div>
                            }
                        </div>

                        <AddressSearch setValue={setValue} register={register} errors={errors} />

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="foodCertifyName" className="block text-sm font-medium leading-6 text-gray-900">
                                식품 인증 구분
                            </label>
                            <div className="mt-2">
                                <select {...register("foodCertifyName", { required: true })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="">식품 인증 구분 선택</option>
                                    {FOOD_CERTIFY_ARR.map((data) => (
                                        <option value={data} key={data}>{data}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.foodCertifyName?.type === "required" &&
                                <div className="pt-2 text-xs text-red-600">필수 입력 사항입니다</div>
                            }
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="storeType" className="block text-sm font-medium leading-6 text-gray-900">
                                업종 구분
                            </label>
                            <div className="mt-2">
                                <select {...register("storeType", { required: true })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="">식품 인증 구분 선택</option>
                                    {STORE_TYPE_ARR.map((data) => (
                                        <option value={data} key={data}>{data}</option>
                                    ))}
                                </select>
                                {errors.storeType?.type === "required" &&
                                    <div className="pt-2 text-xs text-red-600">필수 입력 사항입니다</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={() => router.back()}
                    type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    뒤로 가기
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    제출
                </button>
            </div>
        </form >



    )
}