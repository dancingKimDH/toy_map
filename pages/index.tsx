import Layout from "@/components/Layout";
import Link from "next/link"
import stores from "@/data/store_data.json"

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
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 식당 데이터 마커
      stores?.["DATA"]?.map((store) => {
        
        var imageSrc = store?.bizcnd_code_nm ? `/images/markers/${store?.bizcnd_code_nm}.png` : "/images/markers/default.png",
            imageSize = new window.kakao.maps.Size(40, 40),
            imageOption = {offset: new window.kakao.maps.Point(27, 69)};
        
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
      })
    })
  }

  return (
    <>
      <Script strategy="afterInteractive" type="text/javascript" onReady={loadKakaoMap}
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`} />
      <div id="map" className="w-full h-screen"></div>
    </>

  );
}
