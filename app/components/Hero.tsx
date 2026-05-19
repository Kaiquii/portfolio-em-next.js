"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import { FaArrowRight, FaDownload } from "react-icons/fa";

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

export default function Hero() {
  return (
    <section
      id="person"
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center relative overflow-hidden pt-32 pb-16 px-6"
    >
      <div className="absolute inset-x-6 top-28 h-px bg-linear-to-r from-transparent via-pink-500/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(209,47,122,0.08),transparent_34%,rgba(7,63,204,0.08)_68%,transparent)] pointer-events-none" />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start z-10 text-center lg:text-left mb-12 lg:mb-0">
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-white/70 px-4 py-2 text-sm font-bold text-pink-700 shadow-sm backdrop-blur dark:bg-white/5 dark:text-pink-300 dark:shadow-none">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
            Disponível para projetos Full Stack
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Olá, eu sou{" "}
            <span className="block bg-linear-to-r from-pink-500 via-fuchsia-500 to-blue-600 bg-clip-text pb-2 text-transparent">
              Kaiqui Lucas
            </span>
          </h1>

          <h2 className="mt-4 min-h-20 text-2xl font-semibold text-gray-600 dark:text-gray-400 sm:min-h-10 lg:text-3xl">
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

          <p className="mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-300 lg:text-lg">
            Crio interfaces modernas e aplicações completas com atenção a
            performance, experiência do usuário e código bem organizado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/document/CV Dev Kaiqui.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-pink-600 to-blue-600 px-6 py-3 font-bold text-white shadow-md shadow-pink-500/15 hover:-translate-y-0.5 hover:shadow-pink-500/20"
              download
            >
              <FaDownload /> Baixar CV
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white/80 px-6 py-3 font-bold text-gray-900 shadow-sm backdrop-blur hover:-translate-y-0.5 hover:border-pink-500/35 hover:text-pink-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:text-pink-300"
            >
              Ver Projetos <FaArrowRight />
            </Link>
          </div>

          <div className="mt-8 grid w-full grid-cols-3 gap-3 text-left">
            {["Front-end", "Back-end", "Mobile"].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-black/10 bg-white/65 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-none"
              >
                <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Stack
                </span>
                <strong className="text-sm text-gray-950 dark:text-white">
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
          <h3 className="text-xl mb-6 relative inline-block text-gray-900 dark:text-white after:content-[''] after:absolute after:-bottom-1.25 after:w-full after:h-0.5 after:bg-linear-to-r after:from-pink-500 after:to-blue-600">
            Techs
          </h3>

          <ul className="flex flex-wrap justify-center lg:justify-start gap-4 max-w-2xl">
            {techs.map((tech) => (
              <li
                key={tech.name}
                title={tech.name}
                className="group cursor-default"
              >
                <div className="flex items-center justify-center p-3 rounded-lg bg-white/85 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm dark:shadow-none backdrop-blur hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/10 hover:border-pink-500/35 dark:hover:border-pink-500/35">
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                    <Image
                      src={tech.src}
                      alt={tech.name}
                      fill
                      sizes="(min-width: 1024px) 48px, 40px"
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
        className="w-full lg:w-1/2 flex flex-col items-center justify-center relative"
      >
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          scale={1.02}
          transitionSpeed={2500}
        >
          <div className="relative mb-8 cursor-pointer">
            <div className="absolute -inset-5 rounded-full border border-pink-500/20 dark:border-pink-500/30" />
            <div className="absolute -inset-2 rounded-full border border-blue-500/20 dark:border-blue-500/30" />
            <div className="relative w-70 h-70 lg:w-100 lg:h-100 rounded-full p-0.75 bg-linear-to-tr from-orange-400 via-pink-500 to-blue-600 animate-[profileGlow_4s_ease-in-out_infinite] shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-white dark:border-black bg-white dark:bg-black">
              <Image
                src="/img/foto-kaiqui.png"
                alt="Kaiqui Lucas"
                fill
                sizes="(min-width: 1024px) 400px, 280px"
                className="object-cover"
                unoptimized
                priority
              />
            </div>
            </div>
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/75 px-4 py-2 text-sm font-bold text-white shadow-xl backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              Kaiqui.dev
            </div>
          </div>
        </Tilt>

        <div className="flex gap-4 z-20">
          <Link
            href="https://github.com/Kaiquii"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Kaiqui Lucas"
            className="p-4 bg-white/85 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm dark:shadow-none rounded-lg backdrop-blur hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/10 hover:border-pink-500/35 dark:hover:border-pink-500/35 group"
          >
            <div className="relative w-8 h-8">
              <Image
                src="https://skillicons.dev/icons?i=github"
                alt="GitHub"
                fill
                sizes="32px"
                className="object-contain"
                unoptimized
              />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/kaiqui_luucas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Kaiqui Lucas"
            className="p-4 bg-white/85 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm dark:shadow-none rounded-lg backdrop-blur hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/10 hover:border-pink-500/35 dark:hover:border-pink-500/35 group"
          >
            <div className="relative w-8 h-8">
              <Image
                src="https://skillicons.dev/icons?i=instagram"
                alt="Instagram"
                fill
                sizes="32px"
                className="object-contain"
                unoptimized
              />
            </div>
          </Link>
          <Link
            href="https://www.linkedin.com/in/kaiqui-lucas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Kaiqui Lucas"
            className="p-4 bg-white/85 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm dark:shadow-none rounded-lg backdrop-blur hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/10 hover:border-pink-500/35 dark:hover:border-pink-500/35 group"
          >
            <div className="relative w-8 h-8">
              <Image
                src="https://skillicons.dev/icons?i=linkedin"
                alt="LinkedIn"
                fill
                sizes="32px"
                className="object-contain"
                unoptimized
              />
            </div>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
