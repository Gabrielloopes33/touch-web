import React from "react";
import Image from "next/image";







export default function FeaturesPlanet() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-purple-900 border-none outline-none overflow-visible">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">
              Trabalhamos lado a lado com você para impulsionar o seu negócio
            </h2>
          </div>
          {/* Planet */}
          <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
            <div className="text-center">
              <div className="
      relative inline-flex rounded-full
      w-60 h-60 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px]
      before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] before:bg-gradient-to-b before:from-GRAY-900 before:to-sky-700/50 before:purple-3xl
      after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,theme(colors.purple.500),transparent)]
    ">
                <Image
                  className="rounded-full bg-gray-900 w-full h-full"
                  src="/images/planet.png"
                  width={400}
                  height={400}
                  alt="Planet"
                />
                <div className="pointer-events-none" aria-hidden="true">
                  <Image
                    className="absolute -right-64 -top-20 z-10 max-w-none"
                    src="/images/planet.svg"
                    width={789}
                    height={755}
                    alt="Planet decoration"
                  />
                  <div>
                    <Image
                      className="absolute -left-28 top-16 z-10 animate-[float_4s_ease-in-out_infinite_both] opacity-80 transition-opacity duration-500"
                      src="/images/planet-tag-01.png"
                      width={253}
                      height={56}
                      alt="Tag 01"
                    />
                    <Image
                      className="absolute left-56 top-7 z-10 animate-[float_4s_ease-in-out_infinite_1s_both] opacity-30 transition-opacity duration-500"
                      src="/images/planet-tag-02.png"
                      width={241}
                      height={56}
                      alt="Tag 02"
                    />
                    <Image
                      className="absolute -left-20 bottom-24 z-10 animate-[float_4s_ease-in-out_infinite_2s_both] opacity-25 transition-opacity duration-500"
                      src="/images/planet-tag-03.png"
                      width={243}
                      height={56}
                      alt="Tag 03"
                    />
                    <Image
                      className="absolute bottom-32 left-64 z-10 animate-[float_4s_ease-in-out_infinite_3s_both] opacity-80 transition-opacity duration-500"
                      src="/images/planet-tag-04.png"
                      width={251}
                      height={56}
                      alt="Tag 04"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Grid */}
          <div className="
  grid grid-cols-1 gap-10 md:gap-16 sm:grid-cols-2 lg:grid-cols-3
  [&>*]:relative
  [&>*:not(:nth-child(3n))]:after:content-['']
  [&>*:not(:nth-child(3n))]:after:absolute
  [&>*:not(:nth-child(3n))]:after:top-8
  [&>*:not(:nth-child(3n))]:after:right-0
  [&>*:not(:nth-child(3n))]:after:h-[calc(100%-4rem)]
  [&>*:not(:nth-child(3n))]:after:w-px
  [&>*:not(:nth-child(3n))]:after:bg-gradient-to-b
  [&>*:not(:nth-child(3n))]:after:from-purple-400/0
  [&>*:not(:nth-child(3n))]:after:via-purple-400/40
  [&>*:not(:nth-child(3n))]:after:to-purple-400/0
  [&>*:not(:nth-child(3n))]:after:animate-pulse
  md:[&>*:nth-child(n+4)]:before:content-['']
  md:[&>*:nth-child(n+4)]:before:absolute
  md:[&>*:nth-child(n+4)]:before:left-8
  md:[&>*:nth-child(n+4)]:before:top-0
  md:[&>*:nth-child(n+4)]:before:w-[calc(100%-4rem)]
  md:[&>*:nth-child(n+4)]:before:h-px
  md:[&>*:nth-child(n+4)]:before:bg-gradient-to-r
  md:[&>*:nth-child(n+4)]:before:from-purple-400/0
  md:[&>*:nth-child(n+4)]:before:via-purple-400/40
  md:[&>*:nth-child(n+4)]:before:to-purple-400/0
  md:[&>*:nth-child(n+4)]:before:animate-pulse
">
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200 leading-normal">
                <svg
                  className="fill-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                >
                  <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4Zm1 10a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                </svg>
                <span>Atendimento automatizado</span>
              </h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">
              Respostas instantâneas para perguntas frequentes e qualificação de leads. Atendimento 24/7 para aumentar a satisfação do cliente e reduzir o tempo de resposta.
              </p>
            </article>

             <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200 leading-normal">
                <svg
                  className="fill-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                >
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1.715-6.752a1 1 0 0 1 .57-1.916 8.014 8.014 0 0 1 5.383 5.383 1 1 0 1 1-1.916.57 6.014 6.014 0 0 0-4.037-4.037Zm4.037 7.467a1 1 0 1 1 1.916.57 8.014 8.014 0 0 1-5.383 5.383 1 1 0 1 1-.57-1.916 6.014 6.014 0 0 0 4.037-4.037Zm-7.467 4.037a1 1 0 1 1-.57 1.916 8.014 8.014 0 0 1-5.383-5.383 1 1 0 1 1 1.916-.57 6.014 6.014 0 0 0 4.037 4.037Z" />
                </svg>
                <span>Funis de vendas inteligentes</span>
              </h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">
               Sequências de mensagens que conduzem o cliente até a compra. Automatize fluxos de conversa para aumentar a taxa de conversão e otimizar o tempo do time de vendas.
              </p>
            </article>

            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200 leading-normal">
                <svg
                  className="fill-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                >
                  <path d="M8 0a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1Zm6 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1a1 1 0 1 1 0 2h-1a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h1a1 1 0 1 1 0 2h-1ZM1 1a1 1 0 0 0 0 2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 1 0 0 2h1a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H1Z" />
                </svg>
                <span>Integração com sistemas existentes</span>
              </h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">
               Conexão com planilhas, e-commerces ou CRMs. Automatize a entrada de dados e reduza o tempo de trabalho manual.
              </p>
            </article>
            
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200 leading-normal">
                <svg
                  className="fill-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                >
                  <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4Zm1 10a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                </svg>
                <span>Social Media</span>
              </h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">
              Gerenciamento completo das redes sociais do seu negócio, com foco em aumentar a visibilidade da marca, atrair novos clientes e fortalecer o relacionamento com o público atual.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200 leading-normal">
                <svg
                  className="fill-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                >
                  <path d="M14.29 2.614a1 1 0 0 0-1.58-1.228L6.407 9.492l-3.199-3.2a1 1 0 1 0-1.414 1.415l4 4a1 1 0 0 0 1.496-.093l7-9ZM1 14a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H1Z" />
                </svg>
                <span>Tráfego Pago</span>
              </h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">
              Cuidamos de todos os anúncios pagos, que tem foco de trazer mais volume e qualificação para as redes sociais da empresa. Gerando assim uma audiência nichada pro produto.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200 leading-normal">
                <svg
                  className="fill-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                >
                  <path
                    d="M2.248 6.285a1 1 0 0 1-1.916-.57A8.014 8.014 0 0 1 5.715.332a1 1 0 0 1 .57 1.916 6.014 6.014 0 0 0-4.037 4.037Z"
                    opacity=".3"
                  />
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1.715-6.752a1 1 0 0 1 .57-1.916 8.014 8.014 0 0 1 5.383 5.383 1 1 0 1 1-1.916.57 6.014 6.014 0 0 0-4.037-4.037Zm4.037 7.467a1 1 0 1 1 1.916.57 8.014 8.014 0 0 1-5.383 5.383 1 1 0 1 1-.57-1.916 6.014 6.014 0 0 0 4.037-4.037Zm-7.467 4.037a1 1 0 1 1-.57 1.916 8.014 8.014 0 0 1-5.383-5.383 1 1 0 1 1 1.916-.57 6.014 6.014 0 0 0 4.037 4.037Z" />
                </svg>
                <span>SEO &amp; Performance</span>
              </h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">
              Coletamos insights essenciais sobre como os visitantes estão usando seus canais de comunicação com métricas detalhadas de visualização de página, likes, engajamento e conversão.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200 leading-normal">
                <svg
                  className="fill-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                >
                  <path d="M8 0a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1Zm6 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1a1 1 0 1 1 0 2h-1a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h1a1 1 0 1 1 0 2h-1ZM1 1a1 1 0 0 0 0 2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 1 0 0 2h1a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H1Z" />
                </svg>
                <span>Produção de Site Profissional</span>
              </h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">
              Utilizamos as mais recentes tecnologias e práticas de desenvolvimento para criar sites que representam fielmente a identidade da sua marca e atendem às necessidades do seu público-alvo.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200 leading-normal">
                <svg
                  className="fill-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                >
                  <path d="M10.284.33a1 1 0 1 0-.574 1.917 6.049 6.049 0 0 1 2.417 1.395A1 1 0 0 0 13.5 2.188 8.034 8.034 0 0 0 10.284.33ZM6.288 2.248A1 1 0 0 0 5.718.33 8.036 8.036 0 0 0 2.5 2.187a1 1 0 0 0 1.372 1.455 6.036 6.036 0 0 1 2.415-1.395ZM1.42 5.401a1 1 0 0 1 .742 1.204 6.025 6.025 0 0 0 0 2.79 1 1 0 0 1-1.946.462 8.026 8.026 0 0 1 0-3.714A1 1 0 0 1 1.421 5.4Zm2.452 6.957A1 1 0 0 0 2.5 13.812a8.036 8.036 0 0 0 3.216 1.857 1 1 0 0 0 .574-1.916 6.044 6.044 0 0 1-2.417-1.395Zm9.668.04a1 1 0 0 1-.041 1.414 8.033 8.033 0 0 1-3.217 1.857 1 1 0 1 1-.571-1.917 6.035 6.035 0 0 0 2.415-1.395 1 1 0 0 1 1.414.042Zm2.242-6.255a1 1 0 1 0-1.946.462 6.03 6.03 0 0 1 0 2.79 1 1 0 1 0 1.946.462 8.022 8.022 0 0 0 0-3.714Z" />
                </svg>
                <span>Captação Audiovisual</span>
              </h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">
              Captação audiovisual de alta qualidade, utilizando equipamentos de última geração para garantir imagens nítidas e sons claros.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200 leading-normal">
                <svg
                  className="fill-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                >
                  <path d="M9 1a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V1ZM4.572 3.08a1 1 0 0 0-1.144-1.64A7.987 7.987 0 0 0 0 8a8 8 0 0 0 16 0c0-2.72-1.36-5.117-3.428-6.56a1 1 0 1 0-1.144 1.64A5.987 5.987 0 0 1 14 8 6 6 0 1 1 2 8a5.987 5.987 0 0 1 2.572-4.92Z" />
                </svg>
                <span>Acompanhamento</span>
              </h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">
              Na touch você tem reuniões periódicas para apresentação de métricas, resultados e planejamentos.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
