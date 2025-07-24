'use client';

import React, { useState } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  color: 'blue' | 'green' | 'red' | 'purple' | 'amber' | 'indigo';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  color,
  trend
}) => {
  const [showInfo, setShowInfo] = useState(false);
  
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      hover: 'hover:bg-blue-100'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      hover: 'hover:bg-green-100'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      hover: 'hover:bg-red-100'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      hover: 'hover:bg-purple-100'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      hover: 'hover:bg-amber-100'
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      hover: 'hover:bg-indigo-100'
    }
  };
  
  return (
    <div className={`${colorClasses[color].bg} p-4 rounded-md relative ${colorClasses[color].hover} transition-colors`}>
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-600">{title}</p>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className={`${colorClasses[color].text} hover:opacity-80 transition-opacity`}
          aria-label="Mostrar informações sobre esta métrica"
        >
          <IoInformationCircleOutline size={18} />
        </button>
      </div>
      
      <p className="text-2xl font-bold mt-1">{value}</p>
      
      {trend && (
        <div className={`mt-1 flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
          <span className="text-gray-500 ml-1 text-xs">vs. período anterior</span>
        </div>
      )}
      
      {showInfo && (
        <div className="absolute left-0 right-0 top-full mt-2 p-3 bg-white shadow-lg rounded-md z-10 border border-gray-200">
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
