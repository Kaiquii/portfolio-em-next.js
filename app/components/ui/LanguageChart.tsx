"use client";

import { useEffect, useState } from "react";
import { Braces, Loader2 } from "lucide-react";

type Language = {
  color: string;
  name: string;
  percentage: number;
  value: number;
};

type LanguageData = {
  languages: Language[];
};

const formatValue = (language: Language) => {
  if (language.value >= 1_000_000) {
    return `${(language.value / 1_000_000).toLocaleString("pt-BR", {
      maximumFractionDigits: 1,
    })} MB`;
  }

  return `${Math.max(1, Math.round(language.value / 1_000)).toLocaleString(
    "pt-BR",
  )} kB`;
};

export default function LanguageChart() {
  const [data, setData] = useState<LanguageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadLanguages = async () => {
      try {
        const response = await fetch("/api/github-languages", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Falha ao carregar linguagens");

        const languageData: LanguageData = await response.json();
        setData(languageData);
      } catch {
        if (!controller.signal.aborted) setFailed(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadLanguages();
    return () => controller.abort();
  }, []);

  return (
    <div className="rounded-lg border border-black/10 bg-white/85 p-4 shadow-md shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-[#111216]/90 dark:shadow-none lg:p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0969da]/10 text-[#0969da] dark:bg-[#58a6ff]/10 dark:text-[#58a6ff]">
          <Braces size={19} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-950 dark:text-white">
            Linguagens mais usadas
          </h3>
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
            Top 6 por volume de código
          </p>
        </div>
      </div>

      {loading ? (
        <div
          className="flex min-h-44 items-center justify-center"
          aria-label="Carregando linguagens"
        >
          <Loader2
            className="animate-spin text-[#0969da] dark:text-[#58a6ff]"
            size={22}
          />
        </div>
      ) : failed || !data?.languages.length ? (
        <div className="flex min-h-44 items-center justify-center rounded-md border border-dashed border-black/10 px-4 text-center text-xs leading-5 text-gray-500 dark:border-white/10 dark:text-gray-400">
          As linguagens estão temporariamente indisponíveis.
        </div>
      ) : (
        <div className="space-y-3">
          {data.languages.map((language) => (
            <div key={language.name}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                <span className="flex min-w-0 items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/10 dark:ring-white/10"
                    style={{ backgroundColor: language.color }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{language.name}</span>
                </span>
                <span className="shrink-0 text-gray-500 dark:text-gray-400">
                  {language.percentage.toLocaleString("pt-BR", {
                    maximumFractionDigits: 1,
                  })}
                  %
                </span>
              </div>

              <div
                className="h-1.5 overflow-hidden rounded-full bg-black/6 dark:bg-white/8"
                role="img"
                aria-label={`${language.name}: ${language.percentage.toLocaleString("pt-BR")}%, ${formatValue(language)}`}
              >
                <div
                  className="h-full min-w-1 rounded-full"
                  style={{
                    backgroundColor: language.color,
                    width: `${language.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
