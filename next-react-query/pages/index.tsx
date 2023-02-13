import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import type { NextPage } from "next";
const inter = Inter({ subsets: ["latin"] });
import { dehydrate, hydrate, QueryClient, useQuery } from "react-query";

type spaceXData = {
  name: String;
  links: {
    patch: {
      large: String;
    };
  };
};
const getSpaceXData = async () => await (await fetch("https://api.spacexdata.com/v5/launches/latest")).json();

const Home: NextPage = () => {
  const { data, isLoading } = useQuery<spaceXData>("spaceX", getSpaceXData);
  console.log(isLoading);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <h2>{data?.name}</h2>
      {/* <Image src={data?.links.patch.large} alt="path-image" width={500} height={500} /> */}
    </div>
  );
};
export default Home;

export async function getStaticProps() {
  const query = new QueryClient();
  await query.prefetchQuery("spaceX", getSpaceXData);
  return {
    props: {
      dehydrateState: dehydrate(query),
    },
  };
}
