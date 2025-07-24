"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "../../utils/supabase/client";
import EvoAIChat from "../EvoAIChat";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    let imageUrl: string | null = null;
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const { data, error } = await supabase.storage.from('chat-images').upload(fileName, imageFile);
      if (!error && data) {
        const { publicUrl } = supabase.storage.from('chat-images').getPublicUrl(data.path).data;
        imageUrl = publicUrl;
        newMessages = [...newMessages, { role: "user", type: "image", url: publicUrl }];
      }
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    if (input.trim()) {
      newMessages = [...newMessages, { role: "user", content: input }];
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
    <EvoAIChat />
  );
}
