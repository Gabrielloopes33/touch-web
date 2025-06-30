"use client";

import { useState, useRef, useEffect } from "react";
import { HamsterLoader } from "./HamsterLoader";
import { supabase } from "../../utils/supabase/client";

interface Message {
  role: "user" | "assistant";
  content?: string;
  type?: "image";
  url?: string;
}

const AGENTS = [
  "produtor-conteudo",
  "produtor-site",
  "engenheiro",
  "arquiteto",
  "orcamentos",
  "planejamento-obra"
];

export default function Agents() {
  const [messagesByAgent, setMessagesByAgent] = useState<Record<string, Message[]>>({});
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string>("produtor-site");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages: Message[] = messagesByAgent[selectedAgent] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Busca o user_id do usuário autenticado
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      setUserId(data?.user?.id || null);
    }
    fetchUser();
  }, []);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if ((!input.trim() && !imageFile) || !userId) return;
    let newMessages: Message[] = [...messages];
    if (input.trim()) {
      newMessages = [...newMessages, { role: "user", content: input }];
    }
    if (imageFile) {
      // Upload da imagem para o Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data, error } = await supabase.storage.from('chat-images').upload(fileName, imageFile);
      if (!error && data) {
        const { publicUrl } = supabase.storage.from('chat-images').getPublicUrl(data.path).data;
        newMessages = [...newMessages, { role: "user", type: "image", url: publicUrl }];
      }
      setImageFile(null);
    }
    setMessagesByAgent((prev) => ({ ...prev, [selectedAgent]: newMessages }));
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, agent: selectedAgent, user_id: userId })
      });
      const data = await res.json();
      setMessagesByAgent((prev) => ({
        ...prev,
        [selectedAgent]: [
          ...newMessages,
          { role: "assistant", content: data.reply || "[Erro ao obter resposta da IA]" }
        ]
      }));
    } catch (err) {
      setMessagesByAgent((prev) => ({
        ...prev,
        [selectedAgent]: [
          ...newMessages,
          { role: "assistant", content: "[Erro ao conectar com a IA]" }
        ]
      }));
    } finally {
      setLoading(false);
    }
  }

  // Busca histórico do agente no Supabase ao trocar de agente
  async function handleAgentChange(agent: string) {
    setSelectedAgent(agent);
    setInput("");
    setLoading(true);
    try {
      if (!userId) return;
      const res = await fetch(`/api/agents?agent=${agent}&user_id=${userId}`);
      const data = await res.json();
      setMessagesByAgent((prev) => ({ ...prev, [agent]: data.messages || [] }));
    } catch (err) {
      setMessagesByAgent((prev) => ({ ...prev, [agent]: [] }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[80vh] w-full mx-auto bg-base-100 rounded-xl shadow p-4 md:p-6 md:max-w-3xl min-w-0">
      {/* Título e botões de agentes centralizados */}
      <div className="flex flex-col items-center mb-6">
        <span className="text-2xl font-bold mb-4">Agentes</span>
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center w-full">
          {AGENTS.map((agent) => (
            <button
              key={agent}
              className={`btn btn-block btn-lg rounded-xl shadow-md transition-all duration-200 font-semibold text-base border-2 border-primary bg-white hover:bg-black hover:text-white btn-outline btn-primary${selectedAgent === agent ? ' !bg-black !text-white !border-black' : ''}`}
              onClick={() => handleAgentChange(agent)}
              type="button"
            >
              {agent === 'produtor-conteudo' && 'Produtor de conteúdo'}
              {agent === 'produtor-site' && 'Produtor de site'}
              {agent === 'engenheiro' && 'Engenheiro'}
              {agent === 'arquiteto' && 'Arquiteto'}
              {agent === 'orcamentos' && 'Orçamentos'}
              {agent === 'planejamento-obra' && 'Planejamento de Obra'}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mb-4 pr-0 md:pr-2 min-w-0">
        {messages.length === 0 && (
          <div className="text-center text-base-content/60 mt-15">Converse com seu agente.</div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full mb-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[90vw] md:max-w-[70%] px-3 py-2 md:px-4 md:py-2 rounded-2xl shadow text-base whitespace-pre-line break-words ${
                msg.role === "user"
                  ? "bg-primary text-black rounded-br-sm ml-auto"
                  : "bg-base-200 text-base-content rounded-bl-sm mr-auto"
              }`}
            >
              {msg.type === "image" && msg.url ? (
                <img src={msg.url} alt="imagem enviada" className="max-w-xs max-h-60 rounded-lg mb-2" />
              ) : null}
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <HamsterLoader />}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2 flex-col sm:flex-row w-full">
        <textarea
          className="rounded-xl shadow-md input input-bordered flex-1 min-w-0 resize-none"
          placeholder="Fala comigo mai frend"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(e as any);
            }
          }}
          disabled={loading}
          rows={2}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files?.[0] || null)}
          disabled={loading}
          className="file-input file-input-bordered file-input-primary w-full sm:w-auto"
        />
        <button className="btn-primary text-black' : 'btn-outline btn-primary bg-white hover:bg-black hover:text-white border-2 border-primary btn btn-primary w-full sm:w-auto" type="submit" disabled={(!input.trim() && !imageFile) || loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
