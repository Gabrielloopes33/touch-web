import React, { useState } from "react";

// Mapeie seus agentes para seus respectivos Agent ID e API Key
const AGENTS = [
  {
    label: "Produtor de conteúdo",
    id: "840d7dc8-b129-4ec9-90e0-86ce93d5222d",
    apiKey: "b55d4c0d-f93d-407e-91db-da8064d235d0"
  },
  {
    label: "Produtor de site",
    id: "AGENT_ID_PRODUTOR_SITE",
    apiKey: "API_KEY_PRODUTOR_SITE"
  },
  {
    label: "Engenheiro",
    id: "AGENT_ID_ENGENHEIRO",
    apiKey: "API_KEY_ENGENHEIRO"
  },
  // ...adicione os outros agentes
];

export default function EvoAIChatEmbed() {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);

  // Supondo que você customize o frontend do EvoAI para aceitar agentId e apiKey via query string
  // Exemplo: https://seu-evoai.com/shared-chat?agentId=...&apiKey=...
  const evoAIBaseUrl = "https://seu-evoai.com/shared-chat";
  const iframeSrc = `${evoAIBaseUrl}?agentId=${selectedAgent.id}&apiKey=${selectedAgent.apiKey}`;

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {AGENTS.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: selectedAgent.id === agent.id ? "2px solid #10b981" : "1px solid #ccc",
              background: selectedAgent.id === agent.id ? "#10b981" : "#fff",
              color: selectedAgent.id === agent.id ? "#fff" : "#222",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {agent.label}
          </button>
        ))}
      </div>
      <iframe
        src={iframeSrc}
        title="EvoAI Chat"
        style={{ width: "100%", height: 600, border: "none", borderRadius: 12 }}
        allow="clipboard-write; clipboard-read; camera; microphone"
      />
    </div>
  );
}
