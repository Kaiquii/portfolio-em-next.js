"use client";

import { useState, useEffect, useMemo } from "react";
import { FaCodeBranch, FaSpinner, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getGithubRepos } from "../api/gitHub";
import { GithubRepo } from "../types/githubTypes";
import RepoCard from "./ui/RepoCard";
import FilterDropdown from "./ui/FilterDropdown";

export default function GithubSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await getGithubRepos();
        setRepos(data.filter((repo) => repo.name.toLowerCase() !== "kaiquii"));
      } catch (error) {
        console.error("Erro ao carregar repositórios", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const filterStats = useMemo(() => {
    const stats = [{ name: "Todos", count: repos.length }];
    const langs = new Set(repos.map((r) => r.language).filter(Boolean));

    Array.from(langs).forEach((lang) => {
      const count = repos.filter((r) => r.language === lang).length;
      stats.push({ name: lang, count });
    });

    return [stats[0], ...stats.slice(1).sort((a, b) => b.count - a.count)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    let result = repos;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.description?.toLowerCase().includes(query),
      );
    }

    if (activeFilter !== "Todos") {
      result = result.filter((r) => r.language === activeFilter);
    }

    if (activeFilter === "Todos" && !searchQuery.trim()) {
      return result.slice(0, 8);
    }

    return result;
  }, [repos, activeFilter, searchQuery]);

  if (!loading && repos.length === 0) return null;

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
            Explorando um total de{" "}
            <strong className="text-pink-600 dark:text-pink-500">
              {repos.length} projetos
            </strong>{" "}
            no meu GitHub
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
            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto mb-10">
              <div className="relative w-full md:w-1/2">
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

              <FilterDropdown
                filterStats={filterStats}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-62.5 relative z-10">
              <AnimatePresence mode="wait">
                {filteredRepos.length > 0 ? (
                  filteredRepos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
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
