import Layout from "@/components/Layout";
import Link from "next/link"
import * as stores from "@/data/store_data.json"

// global kakao
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Home() {

  const loadKakaoMap = () => {
    // kakao Map 로드
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 3,
      }
      new window.kakao.maps.Map(mapContainer, mapOption);
    })
  }


  return (
    <>
    <Script strategy="afterInteractive" type="text/javascript" onReady={loadKakaoMap}
     src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}/>
    <div id="map" className="w-full h-screen"></div>
    </>

  );
}
