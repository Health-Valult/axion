import Image from "next/image";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <TopBar></TopBar>
      <Hero></Hero>
      <Feature></Feature>
      <Footer></Footer>
    </>
  );
}
