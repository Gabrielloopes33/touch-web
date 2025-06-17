import React from "react";
import ChatwootWidget from "@/components/ChatwootWidget";

export const metadata = {
  title: "Agência Touch",
  description:
    "Sua marca precisa ser vista. Nós mostramos com imagem, som e resultado.",
};

import Hero from "@/components/hero-home";
import BusinessCategories from "@/components/business-categories";
import FeaturesPlanet from "@/components/features-planet";
import LargeTestimonial from "@/components/large-testimonial";
import Cta from "@/components/cta";
import Banner from "@/components/banner";

// 👇 novo import
import AgentsDebug from "@/components/agents-debug";

export default function Home() {
  return (
    <>
      <ChatwootWidget />
      <Hero />
      <BusinessCategories />
      <FeaturesPlanet />
      <LargeTestimonial />
      <Cta />

      
    </>
  );
}
