'use client';

import React from 'react';

interface ClientInfoCardProps {
  clientId: string;
  clientName?: string;
}

const ClientInfoCard: React.FC<ClientInfoCardProps> = ({ clientId, clientName }) => {
  const displayName = clientName || clientId;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Informações do Cliente</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 text-sm">ID do Cliente</p>
          <p className="font-medium">{clientId}</p>
        </div>
        
        <div>
          <p className="text-gray-600 text-sm">Nome do Cliente</p>
          <p className="font-medium">{displayName}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientInfoCard;
