import Layout from "@/components/Layout";
import Link from "next/link"
import store from "@/data/store_data.json"
import Map from "@/components/Map"
import StoreBox from "@/components/StoreBox";
import { useState } from "react";

// global kakao
import Script from "next/script";
import Markers from "@/components/Markers";

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Home() {

  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = store['DATA'];

  return (
    <>
      <Map setMap={setMap} />
      <Markers storeDatas={storeDatas} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>

  );
}
