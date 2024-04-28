'use client';

import { mapState } from "@/atom";
import { useState } from "react";

import { MdOutlineMyLocation } from "react-icons/md"
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

export default function CurrentLocationButton() {

    const map = useRecoilValue(mapState);

    const [loading, setLoading] = useState<boolean>(false);

    const handleCurrentPosition = () => {
        setLoading(true);

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }

        // getCurrentPosition not working!!s

        if (navigator.geolocation && map) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentPosition = new window.kakao.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude,
                    );
                    console.log(currentPosition);
                    if (currentPosition) {
                        setLoading(false);
                        map.panTo(currentPosition);
                        toast.success("현재 위치로 이동되었습니다");
                    }
                    return currentPosition;
                },
                (error) => {
                    toast.error("현재 위치를 가져올 수 없습니다");
                    setLoading(false);
                },
                options
            )

        }
    }

    return (

        <>

            {loading &&

                <div className="fixed w-full top-0 inset-x-0 h-screen flex flex-col justify-center bg-black/60 z-50">
                    <div className="animate-spin w-10 h-10 text-blue-400 rounded-full border-[4px] m-auto border-t-transparent border-current"/>
                </div>}

            <button type="button" className="fixed z-10 p-2 shadow right-10 bottom-20 bg-blue-100 rounded-md hover:shadow-lg focus:shadow-lg hover:bg-blue-200"
                onClick={() => handleCurrentPosition()}><MdOutlineMyLocation className="w-5 h-5" /></button>

        </>

    )
}