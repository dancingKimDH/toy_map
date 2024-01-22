import { StoreType } from "@/interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";


interface MarkerProps {
    map: any;
    storeDatas: any[];
    setCurrentStore: Dispatch<SetStateAction<any>>
}

export default function Markers({ map, storeDatas, setCurrentStore }: MarkerProps) {

    const loadKakaoMarkers = useCallback(() => {

        // 식당 데이터 마커
        if (map) {
            storeDatas?.map((store) => {

                var imageSrc = store?.bizcnd_code_nm ? `/images/markers/${store?.bizcnd_code_nm}.png` : "/images/markers/default.png",
                    imageSize = new window.kakao.maps.Size(40, 40),
                    imageOption = { offset: new window.kakao.maps.Point(27, 69) };

                var markerImage = new window.kakao.maps.MarkerImage(
                    imageSrc, imageSize, imageOption
                )

                var markerPosition = new window.kakao.maps.LatLng(
                    store?.y_dnts, store?.x_cnts
                )

                var marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage
                })

                marker.setMap(map);

                // info window
                var content = `<div class="infowindow"> ${store?.upso_nm} </div>`;

                var customOverlay = new window.kakao.maps.CustomOverlay({
                    position: markerPosition,
                    content: content,
                    xAnchor: 0.6,
                    yAnchor: 0.91,
                });

                // mouse over
                window.kakao.maps.event.addListener(marker, "mouseover", function () {
                    customOverlay.setMap(map);
                })

                // mouse out
                window.kakao.maps.event.addListener(marker, "mouseout", function () {
                    customOverlay.setMap(null);
                })

                // set current store
                window.kakao.maps.event.addListener(marker, "click", function () {
                    setCurrentStore(store);
                })

            })
        }
    }, [map, setCurrentStore, storeDatas]);

    useEffect(() => {
        loadKakaoMarkers();
    }, [loadKakaoMarkers, map]);


    return <></>
}