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
import ProblemSection from "@/components/problem-section";
import SolutionSection from "@/components/solution-section";
import JourneySection from "@/components/journey-section";
import BenefitsSection from "@/components/benefits-section";
import LargeTestimonial from "@/components/large-testimonial";
import PackagesSection from "@/components/packages-section";
import FAQSection from "@/components/faq-section";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <ChatwootWidget />
      <Hero />
      <BusinessCategories />
      <FeaturesPlanet />
      <ProblemSection />
      <SolutionSection />
      <JourneySection />
      <BenefitsSection />
      <LargeTestimonial />
      <PackagesSection />
      <FAQSection />
      <Cta />
    </>
  );
}
