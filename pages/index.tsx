import Link from "next/link"
import store from "@/data/store_data.json"
import Map from "@/components/Map"
import StoreBox from "@/components/StoreBox";
import { useState } from "react";
import axios from "axios";

// global kakao
import Script from "next/script";
import Markers from "@/components/Markers";
import { StoreType } from "@/interface";
import CurrentLocationButton from "@/components/CurrentLocationButton";

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Home({ stores }: { stores: StoreType[] }) {

  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton/>
    </>

  );
}

export async function getServerSideProps() {

  // data fetch 
  // const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store`).then((res) => res.json());
  // return {
  //   props: { stores },
  //   revalidate: 60 * 60,
  // }

  // data fetch through axios
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/store`);

  return {
    props: { stores: stores.data },
  }
}