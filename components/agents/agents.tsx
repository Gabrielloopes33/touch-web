"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Agents() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string>("produtor-site");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { role: "user", content: input }
    ]);
    setInput("");

    if (selectedAgent === "produtor-site") {
      setLoading(true);
      try {
        const res = await fetch("/api/agents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, { role: "user", content: input }], agent: selectedAgent })
        });
        const data = await res.json();
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: data.reply || "[Erro ao obter resposta da IA]" }
        ]);
      } catch (err) {
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: "[Erro ao conectar com a IA]" }
        ]);
      } finally {
        setLoading(false);
      }
    } else {
      // Simulação para outros agentes
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: "Esta é uma resposta simulada do agente." }
        ]);
      }, 800);
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[80vh] w-full mx-auto bg-base-100 rounded-xl shadow p-4">
      {/* Título e botões de agentes centralizados */}
      <div className="flex flex-col items-center mb-6">
        <span className="text-2xl font-bold mb-4">Agentes</span>
        <div className="flex gap-4 justify-center">
          <button
            className={`btn btn-block btn-lg rounded-xl shadow-md transition-all duration-200 font-semibold text-base border-2 border-primary bg-white hover:bg-black hover:text-white btn-outline btn-primary${selectedAgent === 'produtor-conteudo' ? ' !bg-black !text-white !border-black' : ''}`}
            onClick={() => setSelectedAgent('produtor-conteudo')}
            type="button"
          >
            Produtor de conteúdo
          </button>
          <button
            className={`btn btn-block btn-lg rounded-xl shadow-md transition-all duration-200 font-semibold text-base border-2 border-primary bg-white hover:bg-black hover:text-white btn-outline btn-primary${selectedAgent === 'produtor-site' ? ' !bg-black !text-white !border-black' : ''}`}
            onClick={() => setSelectedAgent('produtor-site')}
            type="button"
          >
            Produtor de site
          </button>
          <button
            className={`btn btn-block btn-lg rounded-xl shadow-md transition-all duration-200 font-semibold text-base border-2 border-primary bg-white hover:bg-black hover:text-white btn-outline btn-primary${selectedAgent === 'engenheiro' ? ' !bg-black !text-white !border-black' : ''}`}
            onClick={() => setSelectedAgent('engenheiro')}
            type="button"
          >
            Engenheiro
          </button>
          <button
            className={`btn btn-block btn-lg rounded-xl shadow-md transition-all duration-200 font-semibold text-base border-2 border-primary bg-white hover:bg-black hover:text-white btn-outline btn-primary${selectedAgent === 'arquiteto' ? ' !bg-black !text-white !border-black' : ''}`}
            onClick={() => setSelectedAgent('arquiteto')}
            type="button"
          >
            Arquiteto
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mb-4 pr-2">
        {messages.length === 0 && (
          <div className="text-center text-base-content/60 mt-10">Converse com seu agente.</div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full mb-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-base whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-primary text-black rounded-br-sm ml-auto"
                  : "bg-base-200 text-base-content rounded-bl-sm mr-auto"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          className="rounded-xl shadow-md input input-bordered flex-1"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button className="btn btn-primary" type="submit" disabled={!input.trim() || loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
