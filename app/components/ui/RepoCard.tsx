"use client";

import { FaGithub, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { GithubRepo } from "../../types/githubTypes";
import { getLanguageColor } from "../../utils/getLanguageColor";

interface RepoCardProps {
  repo: GithubRepo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-black/10 dark:border-white/10 flex flex-col hover:border-pink-500/50 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(209,47,122,0.15)] group cursor-pointer"
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
  );
}
