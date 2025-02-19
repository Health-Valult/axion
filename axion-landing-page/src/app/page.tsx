import Image from "next/image";
import {TopBar} from "./components/TopBar";
import Hero from "./components/Hero";
import { StakeholderSection } from "./components/StakeholderSection";
import {Feature} from "./components/Feature";
import {HowItWorks} from "./components/HowItWorks";
import { Security } from "./components/Security";
import {Testimonials} from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import MedicalDataChart from "./components/MedicalDataChart";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <TopBar></TopBar>
      <Hero></Hero>
      <StakeholderSection></StakeholderSection>
      <MedicalDataChart></MedicalDataChart>
      <Feature></Feature>
      <HowItWorks></HowItWorks>
      <Security></Security>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
      <Footer></Footer>
    </>
  );
}