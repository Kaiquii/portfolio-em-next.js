"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaSpinner,
  FaSearch,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getGithubRepos } from "../api/gitHub";
import { GithubRepo } from "../types/githubTypes";

export default function GithubSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await getGithubRepos();

        const cleanedData = data.filter(
          (repo) => repo.name.toLowerCase() !== "kaiquii",
        );

        setRepos(cleanedData);
      } catch (error) {
        console.error("Erro ao carregar repositórios", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const languages = useMemo(() => {
    const langs = new Set(repos.map((r) => r.language).filter(Boolean));
    return ["Todos", ...Array.from(langs)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    let result = repos;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          (r.description && r.description.toLowerCase().includes(query)),
      );
    }

    if (activeFilter !== "Todos") {
      result = result.filter((r) => r.language === activeFilter);
    }

    if (activeFilter === "Todos" && searchQuery.trim() === "") {
      return result.slice(0, 8);
    }

    return result;
  }, [repos, activeFilter, searchQuery]);

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-400",
      HTML: "bg-orange-500",
      CSS: "bg-blue-300",
      Java: "bg-red-500",
      "C#": "bg-green-600",
      Python: "bg-blue-400",
      Go: "bg-cyan-500",
      Kotlin: "bg-purple-500",
      PHP: "bg-indigo-500",
    };
    return colors[lang] || "bg-gray-400";
  };

  if (!loading && repos.length === 0) {
    return null;
  }

  return (
    <section
      id="github-repos"
      className="py-20 relative bg-gray-50 dark:bg-[#0a0a0a]"
    >
      <div className="max-w-350 mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Repositórios Recentes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Direto do meu GitHub, filtrados por tecnologia
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-pink-500 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Buscando no GitHub...
            </p>
          </div>
        ) : (
          <div>
            <div className="relative max-w-md mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar repositório..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 shadow-sm"
              />
            </div>

            <div className="flex overflow-x-auto pb-4 mb-8 gap-3 snap-x justify-start md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveFilter(lang)}
                  className={`shrink-0 snap-start px-6 py-2 rounded-full font-medium text-sm ${
                    activeFilter === lang
                      ? "bg-pink-600 text-white shadow-[0_0_15px_rgba(219,39,119,0.4)]"
                      : "bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-pink-500 hover:text-pink-500"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-62.5">
              <AnimatePresence mode="wait">
                {filteredRepos.length > 0 ? (
                  filteredRepos.map((repo) => (
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      key={repo.id}
                      className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-black/10 dark:border-white/10 flex flex-col hover:border-pink-500/50 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(209,47,122,0.15)] hover:-translate-y-1 group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3
                          className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-500 wrap-break-word line-clamp-1"
                          title={repo.name}
                        >
                          {repo.name}
                        </h3>
                        <FaGithub className="text-gray-400 text-xl shrink-0 group-hover:text-pink-500" />
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 grow line-clamp-3">
                        {repo.description || "Nenhuma descrição fornecida."}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-2">
                          {repo.language && (
                            <>
                              <span
                                className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}
                              ></span>
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {repo.language}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex gap-3 text-gray-500 text-xs font-medium">
                          <span className="flex items-center gap-1 group-hover:text-yellow-500">
                            <FaStar /> {repo.stargazers_count}
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full text-center py-10 text-gray-500"
                  >
                    Nenhum repositório encontrado para a sua busca.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-center mt-12">
              <a
                href="https://github.com/Kaiquii?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gray-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-white/10 hover:border-pink-500 hover:text-pink-500"
              >
                <FaCodeBranch /> Ver todos no GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
