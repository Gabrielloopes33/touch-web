'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface PerformanceChartProps {
  clientId: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ clientId }) => {
  // Dados mockados para demonstração
  const data = [
    { name: 'Jan', impressions: 4000, clicks: 240, amt: 2400 },
    { name: 'Fev', impressions: 3000, clicks: 198, amt: 2210 },
    { name: 'Mar', impressions: 2000, clicks: 120, amt: 2290 },
    { name: 'Abr', impressions: 2780, clicks: 308, amt: 2000 },
    { name: 'Mai', impressions: 1890, clicks: 248, amt: 2181 },
    { name: 'Jun', impressions: 2390, clicks: 380, amt: 2500 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Performance ao longo do tempo</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="impressions" name="Impressões" fill="#8884d8" />
            <Bar dataKey="clicks" name="Cliques" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
