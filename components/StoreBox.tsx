import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface StoreBoxProps {
    store: any;
    setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }) {
    return (
        <>
            <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
                {store && (
                    <div>
                        <Image width={50} height={50} alt="아이콘 이미지"
                        src={store?.bizcnd_code_nm ? `/images/markers/${store?.bizcnd_code_nm}.png` : "/images/markers/default.png"} />
                    </div>
                )}
            </div>

        </>)
}