'use client';

import { currentStoreState, locationState, mapState } from "@/atom";
import { StoreType } from "@/interface";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";


interface MarkerProps {
    stores: StoreType[];
}

export default function Markers({ stores }: MarkerProps) {

    const map = useRecoilValue(mapState);
    const setCurrentStore = useSetRecoilState(currentStoreState);

    const [location, setLocation] = useRecoilState(locationState);

    const loadKakaoMarkers = useCallback(() => {

        // 식당 데이터 마커
        if (map) {
            stores?.map((store) => {

                var imageSrc = store?.category ? `/images/markers/${store?.category}.png` : "/images/markers/default.png",
                    imageSize = new window.kakao.maps.Size(40, 40),
                    imageOption = { offset: new window.kakao.maps.Point(27, 69) };

                var markerImage = new window.kakao.maps.MarkerImage(
                    imageSrc, imageSize, imageOption
                )

                var markerPosition = new window.kakao.maps.LatLng(
                    store?.lat, store?.lng
                )

                var marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage
                })

                marker.setMap(map);

                // info window
                var content = `<div class="infowindow"> ${store?.name} </div>`;

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
                    setLocation({
                        ...location,
                        lat: store.lat,
                        lng: store.lng,
                    })
                })

            })
        }
    }, [map, stores]);

    useEffect(() => {
        loadKakaoMarkers();
    }, [loadKakaoMarkers, map]);


    return <></>
}