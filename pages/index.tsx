import Layout from "@/components/Layout";
import Link from "next/link"
import store from "@/data/store_data.json"
import Map from "@/components/Map"
import StoreBox from "@/components/StoreBox";
import { useState } from "react";

// global kakao
import Script from "next/script";
import Markers from "@/components/Markers";
import { StoreType } from "@/interface";

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Home({ stores }: { stores: StoreType[] }) {

  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
 
  return (
    <>
      <Map setMap={setMap} />
      <Markers stores={stores} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>

  );
}

export async function getStaticProps() {
  const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store`).then((res) => res.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  }
}