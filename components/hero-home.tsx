"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import PageIllustration from "@/components/page-illustration";
import WavyText from "./WavyText";

export default function HeroHome() {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src="/images/avatar-01.jpg"
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src="/images/avatar-02.jpg"
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src="/images/avatar-03.jpg"
                  width={32}
                  height={32}
                  alt="Avatar 02"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src="/images/avatar-04.jpg"
                  width={32}
                  height={32}
                  alt="Avatar 03"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src="/images/avatar-05.jpg"
                  width={32}
                  height={32}
                  alt="Avatar 04"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src="/images/avatar-06.jpg"
                  width={32}
                  height={32}
                  alt="Avatar 05"
                />
              </div>
            </div>

            <h1
              className="tracking-in-expand mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl text-gray-900 dark:text-white"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Impulsionando o Crescimento
              <br className="max-lg:hidden" />
              do Seu Negócio
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700 dark:text-gray-300"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Na Touch, criamos soluções personalizadas para conectar sua marca ao público certo e transformar desafios em oportunidades.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  {/* Botão do WhatsApp */}
                  <a
                    className="btn group mb-4 w-full bg-gradient-to-t from-purple-600 to-purple-800 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:50%_350%] sm:mb-0 sm:w-auto"
                    href="https://api.whatsapp.com/send?phone=5531997153646&text=Vim%20do%20site%20de%20voc%C3%AAs%20e%20queria%20conversar%20mais!%20" // Substitua "seu_numero" pelo número correto do WhatsApp
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative inline-flex items-center">
                      Entre em contato{" "}
                      <span className="ml-1 tracking-normal text-purple-300 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>

                  {/* Botão "Sobre a Touch" */}
                  <a
                    className="btn w-full bg-white text-gray-800 shadow hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="/sobre" // Link para a página interna
                  >
                    Sobre a Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
          {showLoader && (
            <div
              className="relative flex justify-center items-center mt-12"
              style={{ minHeight: 120 }}
            >
              <div className="loader"></div>
              <div className="loader"></div>
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
