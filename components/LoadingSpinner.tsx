'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Carregando...', 
  className = '' 
}: LoadingSpinnerProps) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/loadingV2.json')
      .then(response => response.json())
      .then(data => {
        // Modificar as cores para roxo
        const modifiedData = JSON.parse(JSON.stringify(data));
        
        // Função recursiva para encontrar e modificar cores
        const modifyColors = (obj: any) => {
          if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
              obj.forEach(modifyColors);
            } else {
              Object.keys(obj).forEach(key => {
                if (key === 'c' && Array.isArray(obj[key])) {
                  // Cor roxa: RGB(147, 51, 234) normalizado para [0.576, 0.2, 0.918, 1]
                  obj[key] = [0.576, 0.2, 0.918, 1];
                } else {
                  modifyColors(obj[key]);
                }
              });
            }
          }
        };
        
        modifyColors(modifiedData);
        setAnimationData(modifiedData);
      })
      .catch(error => {
        console.error('Erro ao carregar animação:', error);
      });
  }, []);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg', 
    xl: 'text-xl'
  };

  if (!animationData) {
    // Fallback simples enquanto carrega a animação
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`${sizeClasses[size]} bg-purple-600 rounded-full animate-pulse mb-2`}></div>
        {text && (
          <p className={`text-gray-600 ${textSizeClasses[size]}`}>{text}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={sizeClasses[size]}>
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
        />
      </div>
      {text && (
        <p className={`text-gray-600 mt-2 ${textSizeClasses[size]}`}>{text}</p>
      )}
    </div>
  );
}
