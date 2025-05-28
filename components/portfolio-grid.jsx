import React from "react";
import Image from "next/image";

const PortfolioGrid = () => {
  // Exemplo de dados (imagens e nomes dos projetos)
  const projects = [
    { id: 1, image: "/images/IMG_0012.avif", name: "Brazza Grill" },
    { id: 2, image: "/images/IMG_0061.avif", name: "Brazza Grill" },
    { id: 3, image: "/images/IMG_0333.avif", name: "Ganja Tabacaria" },
    { id: 4, image: "/images/multi1.webp", name: "Espaço Multi Aprendiz" },
    { id: 5, image: "/images/IMG_7521.webp", name: "Delícias da Roça de Minas" },
    { id: 6, image: "/images/IMG_7422.webp", name: "Delícias da Roça de Minas" },
    { id: 7, image: "/images/_MG_7570.webp", name: "Ative Gestão" },
    { id: 8, image: "/images/_MG_7565.webp", name: "Ative Gestão" },
    { id: 9, image: "/images/05.webp", name: "Ative Gestão" },
    { id: 10, image: "/images/IMG_0039.webp", name: "Cafezêras" },
    { id: 11, image: "/images/IMG_0168.webp", name: "Cafezêras" },
    { id: 12, image: "/images/IMG_0716.webp", name: "OAB - Sua Voz Ativa" },
    { id: 13, image: "/images/IMG_0147.webp", name: "Peaky Burguer" },
    { id: 14, image: "/images/_MG_0705.webp", name: "Peaky Burguer" },
    { id: 15, image: "/images/_MG_0699.webp", name: "Peaky Burguer" },
    { id: 16, image: "/images/_MG_3354.webp", name: "Empório da Serra" },
    { id: 17, image: "/images/_MG_3407.webp", name: "Empório da Serra" },
    { id: 18, image: "/images/_MG_3245.webp", name: "Empório da Serra" },
    
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {projects.map((project) => (
        <div key={project.id} className="group relative h-64 overflow-hidden rounded-lg">
          {/* Imagem do projeto */}
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          {/* Nome do projeto (aparece ao hover) */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <p className="text-white text-lg font-bold">{project.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioGrid;
