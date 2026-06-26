"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Download, Mail, Send } from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

const email = "kaiqui.lucaskaiquiluc@gmail.com";

export default function Contacts() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id="contacts"
      className="pt-10 pb-10 lg:pt-12 lg:pb-12 bg-white/70 dark:bg-black/30 relative border-t border-black/5 dark:border-white/5 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-pink-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mx-auto w-full rounded-lg border border-black/10 bg-white/85 p-5 shadow-md shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-[#111216]/90 dark:shadow-none lg:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex gap-4 text-left">
              <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-600 dark:bg-pink-500/15 dark:text-pink-300">
                <Send size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-3xl font-bold bg-linear-to-r from-pink to-blue bg-clip-text text-transparent sm:text-4xl">
                  Vamos conversar?
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                  Estou disponível para oportunidades Full-Stack, Front-End,
                  Back-End, Mobile e projetos freelance.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
              <Link
                href="https://wa.me/5511933673435"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#25D366]/20"
              >
                <FaWhatsapp size={17} aria-hidden="true" />
                WhatsApp
              </Link>
              <Link
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-pink to-blue px-4 py-2.5 text-sm font-bold text-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-pink-500/15"
              >
                <Mail size={17} aria-hidden="true" />
                E-mail
              </Link>
              <Link
                href="https://www.linkedin.com/in/kaiqui-lucas/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm font-bold text-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#0077B5]/20"
              >
                <FaLinkedin size={17} aria-hidden="true" />
                LinkedIn
              </Link>
              <Link
                href="/document/CV Dev Kaiqui.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-bold text-gray-900 hover:-translate-y-0.5 hover:border-pink-500/35 hover:text-pink-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-pink-300"
              >
                <Download size={17} aria-hidden="true" />
                CV
              </Link>
            </div>
          </div>

          <div className="mt-4 flex max-w-2xl flex-col items-stretch gap-2 rounded-lg border border-black/10 bg-black/3 p-1.5 dark:border-white/10 dark:bg-white/4 sm:flex-row sm:items-center">
            <span className="min-w-0 flex-1 truncate px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {email}
            </span>
            <button
              type="button"
              onClick={copyEmail}
              className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-bold ${
                copied
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-900 hover:bg-gray-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
              }`}
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy size={16} aria-hidden="true" />
                  Copiar e-mail
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
