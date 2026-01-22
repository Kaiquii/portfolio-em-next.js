"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const projects = [
  {
    id: 1,
    title: "Site Motoboy - Chama o Boy",
    img: "/img/site-motoboy.png",
    desc: "Otimizado para o trabalho de duas rodas, formulario com envio no WhatsApp",
    tags: ["API Rest", "TypeScript", "Next.JS"],
    repo: "https://github.com/Kaiquii/site-motoboy-nextjs.git",
    live: "https://chama-o-boy.vercel.app",
  },
  {
    id: 2,
    title: "Consulta Fipe",
    img: "/img/projeto-fipe.png",
    desc: "Consulta a fipe do seu carro cum essa aplicação moderna e responsiva",
    tags: ["API Rest", "TypeScript", "Next.JS"],
    repo: "https://github.com/Kaiquii/consulta-fipe.git",
    live: "https://consulta-fipe.vercel.app",
  },
  {
    id: 3,
    title: "Calculadora de IMC",
    img: "/img/projeto-imc.png",
    desc: "Calculadora moderna com NextJS e Tailwind. Interface intuitiva para controle de saúde.",
    tags: ["NextJS", "TypeScript", "TailwindCSS"],
    repo: "https://github.com/Kaiquii/imc-next",
    live: "https://imc-next.vercel.app",
  },
  {
    id: 4,
    title: "Pet Shop - DEV",
    img: "/img/petdev.png",
    desc: "E-commerce completo para petshop com sistema de carrinho e checkout.",
    tags: ["ReactJS", "Node.js", "E-commerce"],
    repo: "https://github.com/Kaiquii/petdev.git",
    live: "https://petdev-ten.vercel.app",
  },
  {
    id: 5,
    title: "Starbucks® Clone",
    img: "/img/starbucks-foto.png",
    desc: "Landing page responsiva inspirada no Starbucks® com foco em UI/UX.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    repo: "https://github.com/Kaiquii/site-starbucks",
    live: "https://cheery-strudel-5e916f.netlify.app",
  },
  {
    id: 6,
    title: "Agência Awax",
    img: "/img/awaw.png",
    desc: "Template de agência criativa com layout responsivo e moderno.",
    tags: ["HTML5", "CSS3", "Responsive"],
    repo: "https://github.com/Kaiquii/Projeto-Awax",
    live: "https://projetoo-awax.netlify.app/",
  },
  {
    id: 7,
    title: "Loja de Roupas",
    img: "/img/loja-roupas.png",
    desc: "E-commerce de moda com catálogo de produtos e filtros dinâmicos.",
    tags: ["E-commerce", "JavaScript", "UI/UX"],
    repo: "https://github.com/Kaiquii/loja-de-roupas-front-end",
    live: "https://loja-roupas-proj.netlify.app/",
  },
  {
    id: 8,
    title: "Medicenter",
    img: "/img/medicenter.png",
    desc: "Website institucional para clínica médica focado em agendamentos.",
    tags: ["Institucional", "Responsive", "Healthcare"],
    repo: "https://github.com/Kaiquii/Templete-medicenter-responsivo",
    live: "https://templete-medicenter-b7web.netlify.app/",
  },
  {
    id: 9,
    title: "Pizzaria Delivery",
    img: "/img/pizzaria-proj.png",
    desc: "Site de delivery de pizzaria com cardápio interativo e carrinho.",
    tags: ["Delivery", "WhatsApp API", "Animações"],
    repo: "https://github.com/Kaiquii/Projeto-pizzaria",
    live: "https://proj-pizzaria-b7web.netlify.app/",
  },
  {
    id: 10,
    title: "Cadastro de Produtos",
    img: "/img/proj-cadastro.png",
    desc: "Sistema CRUD completo para gestão de produtos e estoque.",
    tags: ["CRUD", "JavaScript", "Validação"],
    repo: "https://github.com/Kaiquii/Cadastro-Produto-JS",
    live: "https://cadastro-produtos.netlify.app/",
  },
];

export default function Projects() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section
      id="projects"
      className="py-20 relative bg-linear-to-br from-black to-[#1a1a1a]"
    >
      <div className="max-w-350 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink to-blue bg-clip-text text-transparent mb-4">
            Meus Projetos
          </h2>
          <p className="text-gray-400 text-lg">
            Explore alguns dos projetos que desenvolvi para demonstrar minhas
            habilidades
          </p>
        </div>

        <div className="relative px-4 lg:px-12 group/slider">
          <button
            ref={setPrevEl}
            className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 
                       w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center
                       bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-full text-white 
                       shadow-[0_4px_20px_rgba(0,0,0,0.5)] ease-out
                       hover:scale-110 hover:border-pink hover:text-pink hover:bg-pink/10 hover:shadow-[0_0_20px_rgba(209,47,122,0.4)]
                       disabled:opacity-0 disabled:cursor-not-allowed md:flex"
            aria-label="Anterior"
          >
            <FaChevronLeft size={20} className="relative -left-0.5" />
          </button>

          <button
            ref={setNextEl}
            className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 
                       w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center
                       bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-full text-white 
                       shadow-[0_4px_20px_rgba(0,0,0,0.5)] ease-out
                       hover:scale-110 hover:border-pink hover:text-pink hover:bg-pink/10 hover:shadow-[0_0_20px_rgba(209,47,122,0.4)]
                       disabled:opacity-0 disabled:cursor-not-allowed md:flex"
            aria-label="Próximo"
          >
            <FaChevronRight size={20} className="relative -right-0.5" />
          </button>
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl,
              nextEl,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              700: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={
              {
                "--swiper-pagination-color": "#d12f7a",
                "--swiper-pagination-bullet-inactive-color": "#555",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bottom": "0px",
              } as React.CSSProperties
            }
            className="pb-12"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id} className="h-auto">
                <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-pink/30 hover:shadow-[0_0_20px_rgba(209,47,122,0.2)] group h-full flex flex-col">
                  <div className="relative h-55 w-full overflow-hidden border-b border-white/5">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center backdrop-blur-sm">
                      <Link
                        href={project.live}
                        target="_blank"
                        className="text-white text-3xl hover:text-pink hover:scale-125"
                      >
                        <FaExternalLinkAlt />
                      </Link>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-xl font-bold mb-3 text-white line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 grow line-clamp-3 leading-relaxed">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-pink/10 text-pink border border-pink/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-auto">
                      <Link
                        href={project.repo}
                        target="_blank"
                        className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-center text-sm font-bold text-white hover:bg-white/10 flex items-center justify-center gap-2"
                      >
                        <FaGithub size={16} /> Código
                      </Link>
                      <Link
                        href={project.live}
                        target="_blank"
                        className="flex-1 py-3 rounded-xl bg-linear-to-r from-pink to-blue text-center text-sm font-bold text-white hover:shadow-[0_0_15px_rgba(209,47,122,0.4)] flex items-center justify-center gap-2"
                      >
                        <FaExternalLinkAlt size={14} /> Ver Site
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
