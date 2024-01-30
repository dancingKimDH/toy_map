import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from "@/data/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";


export default function StoreNewPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();

    return (
        <form className="px-4 md:max-w-4xl mx-auto py-8"
            onSubmit={handleSubmit(async (data) => {
                try {
                    const result = await axios.post("/api/store", data);

                    if(result.status === 200) {
                        toast.success("성공적으로 등록하였습니다")
                        router.replace(`/stores/${result?.data?.id}`)

                    } else {
                        toast.error("데이터 생성 중 문제가 발생하였습니다. 다시 시도해 주세요")
                    }

                } catch (e) {
                    console.log(e);
                    toast.error("데이터 생성 중 문제가 발생하였습니다. 다시 시도해 주세요")
                }
            })}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">맛집 등록</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">맛집 등록 하기</p>

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

                        <div className="col-span-full">
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                주소(검색 API)
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("address", { required: true })}
                                    className="block px-2 outline-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {errors.address?.type === "required" &&
                                <div className="pt-2 text-xs text-red-600">필수 입력 사항입니다</div>
                            }
                        </div>

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

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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