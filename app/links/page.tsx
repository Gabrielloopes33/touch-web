"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

const links = [
    {
        title: "Instagram",
        url: "https://www.instagram.com/agencia.touch",
        bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
        hoverColor: "hover:from-purple-700 hover:to-pink-700"
    },
    {
        title: "WhatsApp",
        url: "https://wa.me/5531997153646",
        bgColor: "bg-gradient-to-r from-green-500 to-green-600",
        hoverColor: "hover:from-green-600 hover:to-green-700"
    },
    {
        title: "Website",
        url: "/",
        bgColor: "bg-gradient-to-r from-gray-700 to-gray-800",
        hoverColor: "hover:from-gray-800 hover:to-gray-900"
    }
];

const LinksPage = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    return (
        <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: {
                        color: {
                            value: "#F2F2F2",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 100,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: ["#9d4edd", "#c77dff", "#e0aaff"],
                        },
                        links: {
                            color: "#7b2cbf",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1.5,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 100,
                        },
                        opacity: {
                            value: 0.7,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                        glow: {
                            enable: true,
                            color: "#9d4edd",
                            radius: 2
                        }
                    },
                    detectRetina: true,
                }}
            />
            
            <div className="relative min-h-screen flex items-start justify-center pt-[40vh]">
                <div className="max-w-md w-full px-4">
                    {/* Logo e Perfil */}
                    <div className="text-center mb-8">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <Image
                                src="/images/logo-full.svg"
                                alt="Touch Logo"
                                width={96}
                                height={96}
                                className="rounded-full"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-purple-900 mb-2">Agência Touch</h1>
                        <p className="text-purple-600">Impulsionando o Crescimento do Seu Negócio</p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4 mb-8">
                        {links.map((link, index) => (
                            <Link 
                                href={link.url} 
                                key={index}
                                className={`block ${link.bgColor} ${link.hoverColor} text-white py-4 px-6 rounded-xl 
                                    text-center font-semibold transition-all duration-300 
                                    transform hover:scale-105 hover:shadow-lg backdrop-blur-sm`}
                                target={link.url.startsWith('http') ? '_blank' : '_self'}
                                rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Agência Touch. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LinksPage; 