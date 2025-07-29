'use client';

import React, { useState } from "react";
import ClientHeader from './metrics/client/ClientHeader';
import ClientInfoCard from './metrics/client/ClientInfoCard';
import MetricsSummary from './metrics/client/MetricsSummary';
import PerformanceChart from './metrics/client/PerformanceChart';
import CampaignList from './metrics/client/CampaignList';
import ClientSummary from './metrics/client/ClientSummary';
import PrincipaisMetricas from './metrics/client/PrincipaisMetricas';
import DatePicker from './DatePicker';

interface ClientAnalysisProps {
  clientId: string;
}

const ClientAnalysis: React.FC<ClientAnalysisProps> = ({ clientId }) => {
  // Estados para o filtro de data
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateFilterKey, setDateFilterKey] = useState(0); // Para forçar re-render dos componentes filhos
  
  // Aqui você poderia ter lógica para processar o nome do cliente baseado no ID
  // Por exemplo, um mapeamento de IDs para nomes ou uma chamada de API
  const clientName = clientId === 'CA Rosi Camba' ? clientId : undefined;
  
  // Funções para o filtro de data
  const handleApplyDateFilter = () => {
    setDateFilterKey(prev => prev + 1); // Força re-render dos componentes filhos
  };

  const handleClearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setDateFilterKey(prev => prev + 1); // Força re-render dos componentes filhos
  };

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ClientHeader clientId={clientId} clientName={clientName} />
      
      {/* Date Picker */}
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onApplyFilter={handleApplyDateFilter}
        onClearFilter={handleClearDateFilter}
      />
      
      <div className="grid grid-cols-1 gap-6">
        <ClientInfoCard clientId={clientId} clientName={clientName} />
        <PrincipaisMetricas 
          key={`principais-${dateFilterKey}`} 
          clientId={clientId} 
          startDate={startDate} 
          endDate={endDate} 
        />
        <ClientSummary 
          key={`summary-${dateFilterKey}`} 
          clientId={clientId} 
          startDate={startDate} 
          endDate={endDate} 
        />
        <MetricsSummary 
          key={`metrics-${dateFilterKey}`} 
          clientId={clientId} 
          startDate={startDate} 
          endDate={endDate} 
        />
        <PerformanceChart 
          key={`performance-${dateFilterKey}`} 
          clientId={clientId} 
          startDate={startDate} 
          endDate={endDate} 
        />
        <CampaignList 
          key={`campaigns-${dateFilterKey}`} 
          clientId={clientId} 
          startDate={startDate} 
          endDate={endDate} 
        />
      </div>
    </div>
  );
};

export default ClientAnalysis;
