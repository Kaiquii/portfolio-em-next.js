"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
  { name: "C#", src: "https://skillicons.dev/icons?i=cs" },
  { name: "Python", src: "https://skillicons.dev/icons?i=py" },
];

export default function Hero() {
  return (
    <section
      id="person"
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center relative overflow-hidden pt-32 pb-10 px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(209,47,122,0.1),transparent_50%)] pointer-events-none" />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start z-10 text-center lg:text-left mb-12 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-2 text-white">
            Olá,
          </h1>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white">
            Meu nome é
          </h1>
          <h1 className="text-5xl lg:text-7xl font-bold bg-linear-to-r from-pink to-blue bg-clip-text text-transparent pb-2">
            Kaiqui Lucas
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center lg:items-start w-full"
        >
          <h3 className="text-xl mb-6 relative inline-block text-white after:content-[''] after:absolute after:-bottom-1.25 after:w-full after:h-0.5 after:bg-linear-to-r after:from-pink after:to-blue">
            Techs :
          </h3>

          <ul className="flex flex-wrap justify-center lg:justify-start gap-4 max-w-2xl">
            {techs.map((tech) => (
              <li
                key={tech.name}
                title={tech.name}
                className="group cursor-default"
              >
                <div
                  className="
                  flex items-center justify-center
                  p-3 rounded-xl
                  bg-white/5 border border-white/10
                  hover:scale-110
                  hover:bg-white/10
                  hover:border-pink/50
                  hover:shadow-[0_0_20px_rgba(209,47,122,0.3)]
                "
                >
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                    <Image
                      src={tech.src}
                      alt={tech.name}
                      fill
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col items-center justify-center relative"
      >
        <div className="relative w-70 h-70 lg:w-100 lg:h-100 rounded-full p-0.75 bg-linear-to-tr from-orange-400 via-pink-500 to-blue-600 animate-[profileGlow_4s_ease-in-out_infinite] mb-8">
          <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-black bg-black">
            <Image
              src="/img/foto-kaiqui.jpg"
              alt="Kaiqui Lucas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex gap-4 z-20">
          <Link
            href="https://github.com/Kaiquii"
            target="_blank"
            className="p-4 bg-white/5 border border-white/10 rounded-xl hover:scale-110 hover:bg-white/10 hover:border-pink/50 hover:shadow-[0_0_20px_rgba(209,47,122,0.3)] group"
          >
            <div className="relative w-8 h-8">
              <Image
                src="https://skillicons.dev/icons?i=github"
                alt="GitHub"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </Link>

          <Link
            href="https://www.instagram.com/kaiqui_luucas/"
            target="_blank"
            className="p-4 bg-white/5 border border-white/10 rounded-xl hover:scale-110 hover:bg-white/10 hover:border-pink/50 hover:shadow-[0_0_20px_rgba(209,47,122,0.3)] group"
          >
            <div className="relative w-8 h-8">
              <Image
                src="https://skillicons.dev/icons?i=instagram"
                alt="Instagram"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </Link>

          <Link
            href="https://www.linkedin.com/in/kaiqui-lucas/"
            target="_blank"
            className="p-4 bg-white/5 border border-white/10 rounded-xl hover:scale-110 hover:bg-white/10 hover:border-pink/50 hover:shadow-[0_0_20px_rgba(209,47,122,0.3)] group"
          >
            <div className="relative w-8 h-8">
              <Image
                src="https://skillicons.dev/icons?i=linkedin"
                alt="LinkedIn"
                fill
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
