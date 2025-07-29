'use client';

import React from 'react';

const InteractiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base background com grid texture */}
      <div className="min-h-screen w-full bg-[#f8fafc] relative">
        {/* Top Fade Grid Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: "20px 30px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
      </div>
      
      {/* Gradiente de fundo roxo sutil por cima */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-violet-50/20 to-indigo-50/30" />
      
      {/* Esferas animadas */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200/15 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '0s', animationDuration: '4s' }} />
      
      <div className="absolute top-1/3 right-16 w-96 h-96 bg-violet-200/10 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '2s', animationDuration: '6s' }} />
      
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-200/15 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '1s', animationDuration: '5s' }} />
      
      <div className="absolute bottom-32 right-1/3 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-pulse" 
           style={{ animationDelay: '3s', animationDuration: '7s' }} />
      
      {/* Elementos geométricos sutis */}
      <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-purple-400/20 rounded-full animate-ping" 
           style={{ animationDelay: '0s', animationDuration: '3s' }} />
      
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-violet-500/25 rounded-full animate-ping" 
           style={{ animationDelay: '1.5s', animationDuration: '4s' }} />
      
      <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-indigo-400/20 rounded-full animate-ping" 
           style={{ animationDelay: '2.5s', animationDuration: '3.5s' }} />
    </div>
  );
};

export default InteractiveBackground;
