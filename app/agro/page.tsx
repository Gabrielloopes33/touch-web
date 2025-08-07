'use client';

import AgroHero from '../../components/agro/hero';
import AgroFeatures from '../../components/agro/features';
import AgroResults from '../../components/agro/results';
import AgroPricing from '../../components/agro/pricing';
import AgroFAQ from '../../components/agro/faq';
import ChatwootSimple from '../../components/crm/chatwoot-simple';

export default function AgroPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AgroHero />
      
      {/* Features Section */}
      <AgroFeatures />
      
      {/* Results Section */}
      <AgroResults />
      
      {/* Pricing Section */}
      <AgroPricing />
      
      {/* FAQ Section */}
      <AgroFAQ />

      {/* Chat Widget */}
      <ChatwootSimple />
    </div>
  );
}
