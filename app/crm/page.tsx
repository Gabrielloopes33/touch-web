'use client';

import { useState } from 'react';
import Hero from '../../components/crm/hero';
import Storytelling from '../../components/crm/storytelling';
import Features from '../../components/crm/features';
import HowItWorks from '../../components/crm/how-it-works';
import Results from '../../components/crm/results';
import Pricing from '../../components/crm/pricing';
import FAQ from '../../components/crm/faq';
import ChatwootSimple from '../../components/crm/chatwoot-simple';

export default function CrmPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Storytelling and Solution Section */}
      <Storytelling />
      
      {/* Features Section */}
      <Features />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Results Section */}
      <Results />
      
      {/* Pricing Section */}
      <Pricing />
      
      {/* FAQ Section */}
      <FAQ />

      {/* Chatwoot Simple */}
      <ChatwootSimple />
      
    </div>
  );
}
