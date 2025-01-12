"use client"

import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import Footer from "./components/Footer";
import { useState } from "react";

export default function Home() {

  const [selectedLanguage, setSelectedLanguage] = useState("english");

  return (
    <>
      <TopBar onLanguageSelect={setSelectedLanguage}></TopBar>
      <Hero></Hero>
      <Feature selectedLanguage={selectedLanguage}></Feature>
      <Footer></Footer>
    </>
  );
}
