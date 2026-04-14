// components/FilterDropdown.tsx
"use client";

import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getLanguageColor } from "../../utils/getLanguageColor";

interface FilterStat {
  name: string;
  count: number;
}

interface FilterDropdownProps {
  filterStats: FilterStat[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function FilterDropdown({
  filterStats,
  activeFilter,
  setActiveFilter,
  isOpen,
  setIsOpen,
}: FilterDropdownProps) {
  const currentCount =
    filterStats.find((f) => f.name === activeFilter)?.count || 0;

  return (
    <div className="relative w-full md:w-1/2 z-30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 text-gray-900 dark:text-white flex items-center justify-between hover:border-pink-500 shadow-sm focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-500 dark:text-gray-400">Linguagem:</span>
          <span className="font-bold">{activeFilter}</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
            {currentCount}
          </span>
        </div>
        <FaChevronDown
          className={`text-gray-400 ${isOpen ? "rotate-180 text-pink-500" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto z-40 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {filterStats.map((filter) => (
              <button
                key={filter.name}
                onClick={() => {
                  setActiveFilter(filter.name);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 flex items-center justify-between text-left ${
                  activeFilter === filter.name
                    ? "bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold border-l-4 border-pink-500"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 border-l-4 border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  {filter.name !== "Todos" && (
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(filter.name)}`}
                    ></span>
                  )}
                  {filter.name}
                </div>
                <span className="text-xs font-medium bg-black/5 dark:bg-white/10 px-2 py-1 rounded-full">
                  {filter.count}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
