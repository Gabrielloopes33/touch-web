"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircleIcon, ChatBubbleLeftRightIcon, CurrencyDollarIcon, ClockIcon, UserGroupIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import AsciiHero from "@/components/ui/ascii-hero";

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

export default function AtendimentoAutomaticoPage() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    return (
        <div className="bg-[#050505] min-h-screen font-inter text-white overflow-x-hidden selection:bg-purple-500/30">

            {/* Background Gradients Parallax */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div style={{ y: y1 }} className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
                <motion.div style={{ y: y2 }} className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            {/* 1. Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
                            >
                                <SparklesIcon className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium text-purple-200">Nova Tecnologia 2.0</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
                            >
                                Venda no <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 animate-gradient-x">
                                    Piloto Automático
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xl text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                            >
                                Transforme seu WhatsApp e Instagram em uma máquina de vendas 24/7 com nossa Inteligência Artificial avançada.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            >
                                <Link
                                    href="https://wa.me/5511999999999?text=Quero%20aumentar%20minhas%20vendas%20com%20IA!"
                                    target="_blank"
                                    className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative z-10 group-hover:text-white transition-colors">Quero ver funcionando</span>
                                </Link>
                                <button className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-all">
                                    Como funciona?
                                </button>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2 relative perspective-1000">
                            <motion.div
                                initial={{ opacity: 0, rotateY: -10, scale: 0.9 }}
                                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                transition={{ duration: 1, type: "spring" }}
                                className="relative z-10"
                            >
                                <div className="relative w-full aspect-square max-w-[600px] mx-auto ">
                                    <AsciiHero />

                                    {/* Floating Cards */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -left-4 top-1/4 bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-20"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                                <CurrencyDollarIcon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400">Venda Realizada</div>
                                                <div className="font-bold text-white">R$ 297,00</div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        className="absolute -right-4 bottom-1/4 bg-black/40 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-20"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400">Lead Qualificado</div>
                                                <div className="font-bold text-white">Agendado</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. O Problema */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="text-center mb-20"
                    >
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-6">O "Custo Invisível" do <br />Atendimento Manual</motion.h2>
                        <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Você investe em tráfego, mas seu funil vaza na hora de atender.
                        </motion.p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            { title: "Demora na Resposta", desc: "O cliente esfria em 5 minutos. Se você demora, ele compra do concorrente.", icon: ClockIcon, color: "text-orange-400", bg: "bg-orange-400/10" },
                            { title: "Baixa Conversão", desc: "Atendentes humanos cansam, esquecem follow-ups e perdem o timing da venda.", icon: CurrencyDollarIcon, color: "text-red-400", bg: "bg-red-400/10" },
                            { title: "Equipe Cara", desc: "Escalar atendimento com humanos custa caro e traz dor de cabeça com gestão.", icon: UserGroupIcon, color: "text-blue-400", bg: "bg-blue-400/10" },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 3. A Solução */}
            <section className="py-24 bg-white/5 border-y border-white/5 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInLeft}
                            className="lg:w-1/2"
                        >
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                                <Image
                                    src="/images/creative-ad.png"
                                    alt="Solução de Atendimento"
                                    width={800}
                                    height={800}
                                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInRight}
                            className="lg:w-1/2"
                        >
                            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                                Sua melhor vendedora <br />
                                <span className="text-purple-400">nunca dorme.</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                                Nossa IA não é um chatbot burro. É uma assistente treinada para persuadir, quebrar objeções e fechar vendas, mantendo o tone de voz da sua marca.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Disponibilidade 24/7 sem feriados",
                                    "Integração nativa com CRM e Planilhas",
                                    "Upsell inteligente baseado no histórico",
                                    "Transbordo para humano quando necessário"
                                ].map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                        </div>
                                        <span className="text-gray-200 font-medium">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Como Funciona */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Fluxo de Vendas</h2>
                        <p className="text-gray-400">Do clique no anúncio até o dinheiro na conta.</p>
                    </motion.div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent -translate-y-1/2 z-0"></div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-4 gap-8 relative z-10"
                        >
                            {[
                                { step: "01", title: "Tráfego", desc: "Cliente clica no anúncio" },
                                { step: "02", title: "Engajamento", desc: "IA inicia conversa imediata" },
                                { step: "03", title: "Conversão", desc: "Quebra de objeções e venda" },
                                { step: "04", title: "Escala", desc: "Dados salvos e notificação enviada" },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    className="group relative bg-[#0B0B1E] p-8 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-center"
                                >
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. Resultados */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-900/20"></div>
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20 bg-center"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInLeft}
                        >
                            <h2 className="text-4xl font-bold mb-10">Resultados que <br />falam por si.</h2>
                            <div className="space-y-6">
                                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
                                    <div className="flex gap-1 mb-4">
                                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-yellow-400"></div>)}
                                    </div>
                                    <p className="text-lg italic text-gray-300 mb-6">“Implementamos a IA no nosso delivery e o ticket médio subiu 20% porque ela sempre oferece bebida e sobremesa. Genial.”</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                                        <div>
                                            <div className="font-bold">Ricardo Silva</div>
                                            <div className="text-sm text-gray-500">Dono de Hamburgueria</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid grid-cols-2 gap-6"
                        >
                            <motion.div variants={scaleIn} className="p-8 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-900 border border-white/10 text-center transform translate-y-8">
                                <div className="text-5xl font-bold mb-2">+32%</div>
                                <div className="text-xs font-medium uppercase tracking-widest text-purple-200">Em Vendas</div>
                            </motion.div>
                            <motion.div variants={scaleIn} className="p-8 rounded-3xl bg-[#0B0B1E] border border-white/10 text-center">
                                <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">-80%</div>
                                <div className="text-xs font-medium uppercase tracking-widest text-gray-400">Tempo de Resposta</div>
                            </motion.div>
                            <motion.div variants={scaleIn} className="p-8 rounded-3xl bg-[#0B0B1E] border border-white/10 text-center transform translate-y-8">
                                <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">24/7</div>
                                <div className="text-xs font-medium uppercase tracking-widest text-gray-400">Disponibilidade</div>
                            </motion.div>
                            <motion.div variants={scaleIn} className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-900 border border-white/10 text-center">
                                <div className="text-5xl font-bold mb-2">10x</div>
                                <div className="text-xs font-medium uppercase tracking-widest text-blue-200">ROI Médio</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 6. Recursos */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Tecnologia de Ponta</h2>
                        <p className="text-gray-400">O que faz nossa IA ser diferente.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Treinamento Customizado", desc: "Alimentamos a IA com seus PDFs, cardápios e histórico de conversas para ela falar como você." },
                            { title: "Humanização Extrema", desc: "Usa gírias, emojis e áudios (em breve) para parecer uma pessoa real do outro lado." },
                            { title: "Integração Universal", desc: "Conecta com qualquer CRM, Gateway de Pagamento ou ERP via API/Webhooks." },
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Para Quem é */}
            <section className="py-24 bg-white/5 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Para quem construímos isso?</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { title: "Restaurantes", desc: "Automatize pedidos e reservas sem pagar comissão para apps." },
                                { title: "Clínicas & Estética", desc: "Agende consultas e tire dúvidas de procedimentos automaticamente." },
                                { title: "Infoprodutores", desc: "Recupere carrinhos abandonados e faça upsell de alunos." },
                                { title: "Imobiliárias", desc: "Qualifique leads antes de passar para o corretor humano." },
                                { title: "E-commerce", desc: "Tire dúvidas de produtos e rastreio de pedidos instantaneamente." },
                                { title: "Serviços Locais", desc: "Orçamentos rápidos para quem precisa de solução imediata." },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col p-6 rounded-2xl bg-[#0B0B1E] border border-white/10 hover:border-purple-500/30 transition-all">
                                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                        <CheckCircleIcon className="w-5 h-5 text-purple-500" />
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Preços */}
            <section className="py-24 bg-white/5 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Planos Flexíveis</h2>
                        <p className="text-gray-400">Escolha o ideal para o seu momento.</p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    >
                        {/* Starter */}
                        <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="p-8 rounded-3xl bg-[#0B0B1E] border border-white/10 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-400 mb-2">Starter</h3>
                            <p className="text-sm text-gray-500 mb-4">Tráfego + Resposta Automática</p>
                            <div className="text-4xl font-bold text-white mb-6">R$ 1.497<span className="text-lg font-normal text-gray-500">/mês</span></div>
                            <p className="text-xs text-gray-500 mb-6">Ideal para: Pequenos negócios (50-200 atendimentos/mês)</p>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-gray-300"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Gestão de Tráfego Pago (Meta Ads)</li>
                                <li className="flex items-center gap-3 text-gray-300"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Automação WhatsApp Básica</li>
                                <li className="flex items-center gap-3 text-gray-300"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Dashboard com métricas</li>
                                <li className="flex items-center gap-3 text-gray-300"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Suporte por chat (48h)</li>
                            </ul>
                            <button className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-colors">Começar Agora</button>
                        </motion.div>

                        {/* Growth */}
                        <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/50 to-[#0B0B1E] border border-purple-500/50 relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-purple-900/20">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">MAIS POPULAR</div>
                            <h3 className="text-xl font-bold text-purple-400 mb-2 flex items-center gap-2"><SparklesIcon className="w-5 h-5" /> Growth</h3>
                            <p className="text-sm text-gray-400 mb-4">Conversão Acelerada</p>
                            <div className="text-4xl font-bold text-white mb-6">R$ 1.897<span className="text-lg font-normal text-gray-500">/mês</span></div>
                            <p className="text-xs text-gray-400 mb-6">Ideal para: Crescimento (200-1.000 atendimentos/mês)</p>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-white"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" /> <strong>Tudo do Starter</strong></li>
                                <li className="flex items-center gap-3 text-white"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" /> Tráfego Multicanal (Meta + Google)</li>
                                <li className="flex items-center gap-3 text-white"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" /> Automação COMPLETA</li>
                                <li className="flex items-center gap-3 text-white"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" /> Integração CRM/Planilhas</li>
                                <li className="flex items-center gap-3 text-white"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" /> Chatbot com IA</li>
                                <li className="flex items-center gap-3 text-white"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" /> Relatórios Semanais</li>
                                <li className="flex items-center gap-3 text-white"><CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" /> Suporte Priority (24h)</li>
                            </ul>
                            <button className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold transition-colors shadow-lg shadow-purple-600/20">Escolher Growth</button>
                        </motion.div>

                        {/* Enterprise */}
                        <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="p-8 rounded-3xl bg-[#0B0B1E] border border-white/10 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-400 mb-2">Enterprise</h3>
                            <p className="text-sm text-gray-500 mb-4">Máquina de Vendas Completa</p>
                            <div className="text-4xl font-bold text-white mb-6">R$ 2.499+<span className="text-lg font-normal text-gray-500">/mês</span></div>
                            <p className="text-xs text-gray-500 mb-6">Ideal para: Consolidadas (1.000+ atendimentos/mês)</p>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-gray-300"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> <strong>Tudo do Growth</strong></li>
                                <li className="flex items-center gap-3 text-gray-300"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> IA Generativa Humanizada</li>
                                <li className="flex items-center gap-3 text-gray-300"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Social Media Estratégica</li>
                                <li className="flex items-center gap-3 text-gray-300"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Site / Landing Pages</li>
                                <li className="flex items-center gap-3 text-gray-300"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Produção Audiovisual</li>
                                <li className="flex items-center gap-3 text-gray-300"><CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Consultoria Semanal</li>
                            </ul>
                            <button className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-colors">Falar com Consultor</button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 9. CTA Secundário */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-3xl p-12 md:p-20 text-center border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-30 bg-center"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">Pronto para automatizar suas vendas?</h2>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Não deixe dinheiro na mesa. Implemente a IA que trabalha 24 horas por dia para o seu negócio.</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ boxShadow: ["0 0 0 0 rgba(147, 51, 234, 0)", "0 0 0 20px rgba(147, 51, 234, 0)"] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl shadow-purple-900/20"
                            >
                                Quero Implementar Agora
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 10. FAQ */}
            <section className="py-24 bg-white/5 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-3xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-4"
                    >
                        {[
                            { q: "A IA substitui totalmente meus atendentes?", a: "Ela assume 80-90% do trabalho repetitivo e de qualificação, deixando sua equipe focada apenas no fechamento complexo ou suporte avançado." },
                            { q: "Funciona no meu nicho?", a: "Sim. A IA é treinada com as informações do seu negócio, seja e-commerce, serviços, infoprodutos ou local." },
                            { q: "É difícil de configurar?", a: "Não. Nossa equipe faz todo o setup inicial e treinamento da IA. Você recebe pronto para usar." },
                            { q: "E se o cliente quiser falar com humano?", a: "A IA detecta essa intenção e transfere a conversa automaticamente para um atendente humano disponível." },
                        ].map((item, idx) => (
                            <motion.div key={idx} variants={fadeInUp}>
                                <Disclosure>
                                    {({ open }) => (
                                        <div className="bg-[#0B0B1E] border border-white/10 rounded-2xl overflow-hidden">
                                            <Disclosure.Button className="flex w-full justify-between px-6 py-5 text-left font-medium text-white hover:bg-white/5 transition-colors">
                                                <span>{item.q}</span>
                                                <ChevronUpIcon
                                                    className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500 transition-transform`}
                                                />
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-100 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-75 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                            >
                                                <Disclosure.Panel className="px-6 pb-5 text-gray-400 leading-relaxed">
                                                    {item.a}
                                                </Disclosure.Panel>
                                            </Transition>
                                        </div>
                                    )}
                                </Disclosure>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 11. Footer Links */}
            <footer className="py-12 border-t border-white/10 bg-[#020202]">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-8">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">WhatsApp</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                        <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
