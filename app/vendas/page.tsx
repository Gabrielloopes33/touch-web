"use client";

import React, { useState } from "react";
import StickyHeader from "@/components/vendas/sticky-header";
import HeroSection from "@/components/vendas/hero-section";
import VideoSection from "@/components/vendas/video-section";
import OfferSection from "@/components/vendas/offer-section";
import GuaranteeSection from "@/components/vendas/guarantee-section";
import TimelineSection from "@/components/vendas/timeline-section";
import LargeTestimonial from "@/components/large-testimonial";
import FAQSection from "@/components/faq-section";
import FinalCtaSection from "@/components/vendas/final-cta-section";
import LeadFormModal from "@/components/vendas/lead-form-modal";

export default function VendasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="overflow-hidden">
      {/* Sticky Header */}
      <StickyHeader onCtaClickAction={handleOpenModal} />

      {/* Hero Section */}
      <HeroSection onCtaClickAction={handleOpenModal} />

      {/* Video + Steps Section */}
      <VideoSection />

      {/* Offer Section (Pricing) */}
      <OfferSection onCtaClickAction={handleOpenModal} />

      {/* Guarantee Section */}
      <GuaranteeSection />

      {/* Social Proof - using existing LargeTestimonial component */}
      <LargeTestimonial />

      {/* Timeline Section */}
      <TimelineSection />

      {/* FAQ Section - using existing component */}
      <FAQSection />

      {/* Final CTA */}
      <FinalCtaSection onCtaClickAction={handleOpenModal} />

      {/* Lead Form Modal */}
      <LeadFormModal isOpen={isModalOpen} onCloseAction={handleCloseModal} />
    </div>
  );
}
