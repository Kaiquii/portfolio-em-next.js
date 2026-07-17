"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import {
  FaArrowRight,
  FaDownload,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const techs = [
  { name: "HTML5", src: "https://skillicons.dev/icons?i=html" },
  { name: "CSS3", src: "https://skillicons.dev/icons?i=css" },
  { name: "JavaScript", src: "https://skillicons.dev/icons?i=js" },
  { name: "TypeScript", src: "https://skillicons.dev/icons?i=ts" },
  { name: "React", src: "https://skillicons.dev/icons?i=react" },
  { name: "NextJS", src: "https://skillicons.dev/icons?i=nextjs" },
  { name: "Tailwind", src: "https://skillicons.dev/icons?i=tailwind" },
  { name: "NodeJS", src: "https://skillicons.dev/icons?i=nodejs" },
  { name: "Java", src: "https://skillicons.dev/icons?i=java" },
  { name: "Kotlin", src: "https://skillicons.dev/icons?i=kotlin" },
  { name: "Go", src: "https://skillicons.dev/icons?i=go" },
  { name: "C#", src: "https://skillicons.dev/icons?i=cs" },
  { name: "Python", src: "https://skillicons.dev/icons?i=py" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Kaiquii",
    icon: FaGithub,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/kaiqui_luucas/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kaiqui-lucas/",
    icon: FaLinkedin,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/11933673435",
    icon: FaWhatsapp,
  },
];

export default function Hero() {
  return (
    <section
      id="person"
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 relative overflow-hidden pt-22 pb-8 px-5 sm:px-6 lg:px-10 xl:px-12"
    >
      <div className="absolute inset-x-6 top-24 h-px bg-linear-to-r from-transparent via-pink-500/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(209,47,122,0.08),transparent_34%,rgba(7,63,204,0.08)_68%,transparent)] pointer-events-none" />

      <div className="w-full lg:w-[52%] flex flex-col justify-center items-center lg:items-start z-10 text-center lg:text-left mb-8 lg:mb-0">
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 max-w-2xl lg:max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-white/70 px-3 py-1.5 text-xs font-bold text-pink-700 shadow-sm backdrop-blur dark:bg-white/5 dark:text-pink-300 dark:shadow-none">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
            Disponível para projetos Full Stack
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl xl:text-[4rem]">
            Olá, eu sou{" "}
            <span className="block bg-linear-to-r from-pink-500 via-fuchsia-500 to-blue-600 bg-clip-text pb-2 text-transparent">
              Kaiqui Lucas
            </span>
          </h1>

          <h2 className="mt-3 min-h-16 text-xl font-semibold leading-snug text-gray-600 dark:text-gray-400 sm:min-h-9 sm:text-2xl lg:text-[1.7rem]">
            <span className="text-blue-600 dark:text-blue-400">
              <Typewriter
                words={[
                  "Desenvolvedor Full Stack",
                  "Criando experiências Web e Mobile",
                  "Construindo do Front-end ao Back-end",
                  "Movido a desafios e código limpo",
                  "Sempre em busca do próximo nível",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 lg:text-base">
            Crio interfaces modernas e aplicações completas com atenção a
            performance, experiência do usuário e código bem organizado.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/document/CV Dev Kaiqui.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-pink-600 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-pink-500/15 hover:-translate-y-0.5 hover:shadow-pink-500/20"
              download
            >
              <FaDownload /> Baixar CV
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white/80 px-5 py-2.5 text-sm font-bold text-gray-900 shadow-sm backdrop-blur hover:-translate-y-0.5 hover:border-pink-500/35 hover:text-pink-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:text-pink-300"
            >
              Ver Projetos <FaArrowRight />
            </Link>
          </div>

          <div className="mt-6 grid w-full max-w-xl grid-cols-3 gap-2 text-left">
            {["Front-end", "Back-end", "Mobile"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-black/10 bg-white/65 px-3 py-2.5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-none"
              >
                <span className="block text-[0.7rem] font-medium leading-none text-gray-500 dark:text-gray-400">
                  Stack
                </span>
                <strong className="mt-1 block text-sm leading-tight text-gray-950 dark:text-white">
                  {item}
                </strong>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center lg:items-start w-full"
        >
          <h3 className="text-lg mb-4 relative inline-block text-gray-900 dark:text-white after:content-[''] after:absolute after:-bottom-1 after:w-full after:h-0.5 after:bg-linear-to-r after:from-pink-500 after:to-blue-600">
            Techs
          </h3>

          <ul className="flex flex-wrap justify-center lg:justify-start gap-2.5 max-w-xl">
            {techs.map((tech) => (
              <li
                key={tech.name}
                title={tech.name}
                className="group cursor-default"
              >
                <div className="flex items-center justify-center p-2.5 rounded-lg bg-white/85 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm dark:shadow-none backdrop-blur hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/10 hover:border-pink-500/35 dark:hover:border-pink-500/35">
                  <div className="relative w-9 h-9 lg:w-10 lg:h-10">
                    <Image
                      src={tech.src}
                      alt={tech.name}
                      fill
                      sizes="(min-width: 1024px) 40px, 36px"
                      className="object-contain drop-shadow-md"
                      unoptimized={true}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-[48%] flex flex-col items-center justify-center relative lg:-mt-8"
      >
        <Tilt
          tiltMaxAngleX={7}
          tiltMaxAngleY={7}
          scale={1.02}
          transitionSpeed={2500}
        >
          <div className="relative mb-6 cursor-pointer">
            <div className="absolute -inset-4 rounded-full border border-pink-500/20 dark:border-pink-500/30" />
            <div className="absolute -inset-1.5 rounded-full border border-blue-500/20 dark:border-blue-500/30" />
            <div className="relative w-68 h-68 overflow-hidden rounded-full p-1 bg-linear-to-tr from-orange-400 via-pink-500 to-blue-600 animate-[profileGlow_4s_ease-in-out_infinite] shadow-2xl sm:w-76 sm:h-76 lg:w-88 lg:h-88">
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/60 bg-white dark:border-white/10 dark:bg-black">
                <Image
                  src="/img/foto-kaiqui.webp"
                  alt="Kaiqui Lucas"
                  fill
                  sizes="(min-width: 1024px) 352px, 304px"
                  className="scale-[1.08] object-cover object-[50%_28%]"
                  priority
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-white/20 bg-black/80 px-4 py-2 text-sm font-bold text-white shadow-xl backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              Kaiqui.dev
            </div>
          </div>
        </Tilt>

        <div className="flex gap-3 z-20">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.name} de Kaiqui Lucas`}
                className="grid h-13 w-13 place-items-center rounded-lg border border-black/10 bg-white/85 text-xl text-gray-900 shadow-sm backdrop-blur hover:-translate-y-0.5 hover:border-pink-500/35 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:bg-white/10 dark:hover:text-pink-300"
              >
                <Icon aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
