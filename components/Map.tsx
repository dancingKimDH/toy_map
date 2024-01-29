import Layout from "@/components/Layout";
import Link from "next/link"
import stores from "@/data/store_data.json"

// Recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { mapState, locationState } from "@/atom";

// global kakao
import Script from "next/script";
import { Dispatch, SetStateAction } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

// const DEFAULT_LAT = 37.497625203;
// const DEFAULT_LNG = 127.03088379;
// const DEFAULT_ZOOM = 3;

export default function Map({ lat, lng, zoom }: MapProps) {

  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    // kakao Map 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat ?? location.lat, lng ?? location.lng),
        level: zoom ?? location.zoom,
      }
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      setMap(map);
    })
  }

  return (
    <>

      {/* Script : a special component for loading external JS files ---> include the Kakao Map SDk */}
      {/* strategy="afterInteractive" : to load the script after the page becomes interactive ---> the script won't block the rendering of the page */}
      {/* onReady : an event handler that will execute the loadKakaoMap once the script is loaded */}
      <Script strategy="afterInteractive" type="text/javascript" onReady={loadKakaoMap}
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`} />
      <div id="map" className="w-full h-screen"></div>
    </>

  );
}
