import React, { useState } from "react";

// Preencha os links de compartilhamento de cada agente
const AGENTS = [
  { label: "Produtor de conteúdo", shareLink: "https://plane-evo-ai-frontend.mk9fkk.easypanel.host/shared-chat?agent=840d7dc8-b129-4ec9-90e0-86ce93d5222d&key=b55d4c0d-f93d-407e-91db-da8064d235d0" },
  { label: "Produtor de site", shareLink: "https://plane-evo-ai-frontend.mk9fkk.easypanel.host/shared-chat?agent=87ce2913-ac66-4123-baf0-64a0d166e9ed&key=9ae9f223-df1b-440e-abf8-a1236395d596" },
  { label: "Engenheiro", shareLink: "https://plane-evo-ai-frontend.mk9fkk.easypanel.host/shared-chat?agent=ffc814ef-ebaa-4d26-a1f3-d74779d0a0c5&key=1426c8b0-673b-4362-b5cc-e0044f6115ed" },
  { label: "Arquiteto", shareLink: "https://plane-evo-ai-frontend.mk9fkk.easypanel.host/shared-chat?agent=02837975-c482-4910-9e7d-4c2f0a7b1382&key=7511276b-c65c-4709-84a0-53e7783d4bfb" },
  { label: "Orçamentos", shareLink: "https://plane-evo-ai-frontend.mk9fkk.easypanel.host/shared-chat?agent=dde33180-71ad-4853-9bbe-0ff991240e5e&key=af61c20b-66d3-48b5-83e4-77210e7118fa" },
  { label: "Planejamento de Obra", shareLink: "https://plane-evo-ai-frontend.mk9fkk.easypanel.host/shared-chat?agent=eff0d2e8-d117-4f16-acbc-6a7bbb219150&key=eff25cb6-7b83-4647-b420-317fc8fe7e83" },
];

export default function EvoAIChat() {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);

  return (
    <div className="w-full max-w-3xl mx-auto ">
      <div className="flex flex-wrap gap-2 mb-4 justify-center ">
        {AGENTS.map((agent) => (
          <button
            key={agent.label}
            onClick={() => setSelectedAgent(agent)}
            className={`px-4 py-2 rounded-lg font-semibold cursor-pointer border transition-colors duration-200 ${selectedAgent.label === agent.label ? 'bg-[#7c3aed] border-[#7c3aed] text-white' : 'bg-white border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white'}`}
          >
            {agent.label}
          </button>
        ))}
      </div>
      <div className="w-full rounded-2xl overflow-hidden">
        <iframe
          src={selectedAgent.shareLink}
          title="EvoAI Chat"
          className="w-full min-h-[600px] h-[80vh] max-h-[80vh] border-none block"
          allow="clipboard-write; clipboard-read; camera; microphone"
        />
      </div>
    </div>
  );
}
