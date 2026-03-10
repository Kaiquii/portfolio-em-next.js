"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const contactMethods = [
  {
    title: "WhatsApp",
    status: "Online agora",
    desc: "Vamos conversar sobre seu projeto!",
    btnText: "Iniciar conversa",
    link: "https://wa.me/5511933673435",
    icon: "fa-brands fa-whatsapp",
    colorClass: "from-[#25D366] to-[#128C7E]",
    shadowColor: "hover:shadow-[#25D366]/30",
  },
  {
    title: "E-mail",
    status: "Resposta em 24h",
    desc: "Envie sua proposta por e-mail",
    btnText: "Enviar e-mail",
    link: "mailto:kaiqui.lucaskaiquiluc@gmail.com",
    icon: "fa-solid fa-envelope",
    colorClass: "from-[#EA4335] to-[#FBBC05]", 
    shadowColor: "hover:shadow-[#EA4335]/30",
  },
  {
    title: "LinkedIn",
    status: "Conecte-se",
    desc: "Veja minha experiência profissional",
    btnText: "Ver perfil",
    link: "https://www.linkedin.com/in/kaiqui-lucas/",
    icon: "fa-brands fa-linkedin",
    colorClass: "from-[#0077B5] to-[#005885]",
    shadowColor: "hover:shadow-[#0077B5]/30",
  },
];

export default function Contacts() {
  return (
    <section
      id="contacts"
      className="py-20 bg-linear-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#1a1a1a] relative"
    >
      <div className="max-w-300 mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="flex items-center justify-center gap-4 text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink to-blue bg-clip-text text-transparent mb-4">
            <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(209,47,122,0.3)] dark:drop-shadow-[0_0_10px_rgba(209,47,122,0.5)]">
              💬
            </span>{" "}
            Vamos conversar?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Entre em contato comigo através dos canais abaixo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-sm dark:shadow-none hover:border-pink-500/50 dark:hover:border-pink-500/30 hover:shadow-xl dark:hover:shadow-2xl hover:-translate-y-2 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-15 h-15 rounded-2xl flex items-center justify-center text-2xl text-white bg-linear-to-br ${method.colorClass} group-hover:scale-110 group-hover:rotate-6`}
                >
                  <i className={method.icon}></i>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-bold text-xl">
                    {method.title}
                  </h3>
                  <span className="text-xs bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                    {method.status}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 h-12">{method.desc}</p>
              <Link
                href={method.link}
                target="_blank"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-br ${method.colorClass} text-white font-bold ${method.shadowColor} hover:shadow-lg`}
              >
                <i className={method.icon}></i> {method.btnText}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="inline-flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-8 py-4 rounded-full text-gray-700 dark:text-gray-400">
            <i className="fa-solid fa-clock text-pink-600 dark:text-pink-500"></i> Resposta garantida
            em até 24 horas
          </p>
        </div>
      </div>
    </section>
  );
}