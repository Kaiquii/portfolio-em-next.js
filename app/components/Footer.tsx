"use client";

import Link from "next/link";
import { Coffee, Heart, Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navLinks = [
    { name: "Home", href: "#person" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Recomendações", href: "#testimonials" },
    { name: "Contatos", href: "#contacts" },
  ];

  return (
    <footer className="bg-white/80 dark:bg-[#050506] pt-10 pb-6 border-t border-black/5 dark:border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(209,47,122,0.02),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(209,47,122,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-300 mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-linear-to-r from-pink to-blue bg-clip-text text-transparent">
              kaiqui.dev
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              Desenvolvedor Full Stack apaixonado por tecnologia e inovação.
              Transformando ideias em realidade digital.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-linear-to-r after:from-pink after:to-blue">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 relative group flex items-center"
                  >
                    <span className="w-0 h-px bg-pink-600 dark:bg-pink-500 mr-0 group-hover:w-3 group-hover:mr-2"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-linear-to-r after:from-pink after:to-blue">
              Conecte-se
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://www.linkedin.com/in/kaiqui-lucas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#0077B5]"
                >
                  <FaLinkedin className="w-5" aria-hidden="true" /> LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Kaiquii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <FaGithub className="w-5" aria-hidden="true" /> GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/kaiqui_luucas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#E1306C]"
                >
                  <FaInstagram className="w-5" aria-hidden="true" /> Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:kaiqui.lucaskaiquiluc@gmail.com"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500"
                >
                  <Mail className="w-5" size={18} aria-hidden="true" /> E-mail
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} Kaiqui Lucas. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            Feito com{" "}
            <Heart
              className="text-red-500 animate-pulse"
              size={16}
              fill="currentColor"
              aria-hidden="true"
            />{" "}
            e muito{" "}
            <Coffee
              className="text-yellow-600 animate-bounce"
              size={16}
              aria-hidden="true"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
