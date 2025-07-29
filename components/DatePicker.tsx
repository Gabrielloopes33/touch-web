'use client';

import React from 'react';

interface DatePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApplyFilter,
  onClearFilter,
}) => {
  // Função para obter a data atual no formato YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Função para obter a data de 30 dias atrás
  const getThirtyDaysAgoDate = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return thirtyDaysAgo.toISOString().split('T')[0];
  };

  const setPresetRange = (days: number) => {
    const endDate = getTodayDate();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    onEndDateChange(endDate);
    onStartDateChange(startDate.toISOString().split('T')[0]);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtro por Período</h2>
      
      {/* Layout Mobile - Estilo similar ao seletor de métricas */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtro por Período:
        </label>
        
        {/* Seletores de Data - Layout responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Data Inicial
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Data Final
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Períodos Rápidos - Layout horizontal no mobile */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Períodos Rápidos:
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPresetRange(7)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              7 dias
            </button>
            <button
              onClick={() => setPresetRange(30)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              30 dias
            </button>
            <button
              onClick={() => setPresetRange(90)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              90 dias
            </button>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-2">
          <button
            onClick={onApplyFilter}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
          >
            Aplicar Filtro
          </button>
          <button
            onClick={onClearFilter}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors text-sm"
          >
            Limpar Filtro
          </button>
        </div>
      </div>

      {/* Informação sobre o filtro ativo */}
      {(startDate || endDate) && (
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
          <p className="text-sm text-blue-800">
            <strong>Filtro Ativo:</strong> {' '}
            {startDate && `A partir de ${new Date(startDate).toLocaleDateString('pt-BR')}`}
            {startDate && endDate && ' até '}
            {endDate && `${new Date(endDate).toLocaleDateString('pt-BR')}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
