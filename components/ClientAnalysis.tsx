'use client';

import React from "react";
import ClientHeader from './metrics/client/ClientHeader';
import ClientInfoCard from './metrics/client/ClientInfoCard';
import MetricsSummary from './metrics/client/MetricsSummary';
import PerformanceChart from './metrics/client/PerformanceChart';
import CampaignList from './metrics/client/CampaignList';
import ClientSummary from './metrics/client/ClientSummary';
import PrincipaisMetricas from './metrics/client/PrincipaisMetricas';

interface ClientAnalysisProps {
  clientId: string;
}

const ClientAnalysis: React.FC<ClientAnalysisProps> = ({ clientId }) => {
  // Aqui você poderia ter lógica para processar o nome do cliente baseado no ID
  // Por exemplo, um mapeamento de IDs para nomes ou uma chamada de API
  const clientName = clientId === 'CA Rosi Camba' ? clientId : undefined;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ClientHeader clientId={clientId} clientName={clientName} />
      
      <div className="grid grid-cols-1 gap-6">
        <ClientInfoCard clientId={clientId} clientName={clientName} />
        <PrincipaisMetricas clientId={clientId} />
        <ClientSummary clientId={clientId} />
        <MetricsSummary clientId={clientId} />
        <PerformanceChart clientId={clientId} />
        <CampaignList clientId={clientId} />
      </div>
    </div>
  );
};

export default ClientAnalysis;
