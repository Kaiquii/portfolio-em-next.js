"use client";

import {
  type FocusEvent,
  type MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ExternalLink,
  Loader2,
  Monitor,
} from "lucide-react";

type ContributionDay = {
  date: string;
  contributionCount: number | null;
  level: number;
};

type ContributionWeek = {
  firstDay: string;
  contributionDays: ContributionDay[];
};

type ContributionData = {
  selectedYear: number;
  totalContributions: number | null;
  weeks: ContributionWeek[];
  years: number[];
};

type TooltipData = {
  day: ContributionDay;
  left: number;
  placement: "above" | "below";
  top: number;
};

const currentYear = new Date().getFullYear();
const defaultYears = Array.from({ length: 5 }, (_, index) => currentYear - index);
const TOOLTIP_SHOW_DELAY = 240;
const TOOLTIP_HIDE_DELAY = 80;

const levelClasses = [
  "bg-[#ebedf0] dark:bg-[#161b22]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

const getActivityLabel = (day: ContributionDay) => {
  if (day.contributionCount === null) return "Atividade registrada";
  if (day.contributionCount === 0) return "Nenhuma contribuição";

  return `${day.contributionCount.toLocaleString("pt-BR")} ${
    day.contributionCount === 1 ? "contribuição" : "contribuições"
  }`;
};

const mergeYears = (currentYears: number[], receivedYears: number[]) => {
  const earliestYear = Math.min(
    currentYear - 4,
    ...currentYears,
    ...receivedYears,
  );

  return Array.from(
    { length: currentYear - earliestYear + 1 },
    (_, index) => currentYear - index,
  );
};

export default function ContributionCalendar() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [availableYears, setAvailableYears] = useState(defaultYears);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [isYearMenuOpen, setIsYearMenuOpen] = useState(false);
  const yearFilterRef = useRef<HTMLDivElement>(null);
  const tooltipShowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const tooltipHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadCalendar = async () => {
      setLoading(true);
      setFailed(false);
      setTooltip(null);

      try {
        const yearQuery =
          selectedYear === null ? "" : `?year=${selectedYear}`;
        const response = await fetch(
          `/api/github-contributions${yearQuery}`,
          { cache: "no-store", signal: controller.signal },
        );

        if (!response.ok) throw new Error("Falha ao carregar contribuições");

        const calendar: ContributionData = await response.json();
        setData(calendar);
        setAvailableYears((years) => mergeYears(years, calendar.years));
      } catch {
        if (!controller.signal.aborted) setFailed(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadCalendar();
    return () => controller.abort();
  }, [selectedYear]);

  useEffect(() => {
    if (!isYearMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!yearFilterRef.current?.contains(event.target as Node)) {
        setIsYearMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsYearMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isYearMenuOpen]);

  useEffect(
    () => () => {
      if (tooltipShowTimerRef.current) {
        clearTimeout(tooltipShowTimerRef.current);
      }
      if (tooltipHideTimerRef.current) {
        clearTimeout(tooltipHideTimerRef.current);
      }
    },
    [],
  );

  const monthLabels = useMemo(() => {
    if (!data) return [];

    const labels: Array<{ label: string; weekIndex: number }> = [];
    let previousMonth = -1;

    data.weeks.forEach((week, weekIndex) => {
      const date = new Date(`${week.firstDay}T00:00:00Z`);
      const month = date.getUTCMonth();

      if (month !== previousMonth) {
        labels.push({
          label: new Intl.DateTimeFormat("pt-BR", {
            month: "short",
            timeZone: "UTC",
          })
            .format(date)
            .replace(".", ""),
          weekIndex,
        });
      }

      previousMonth = month;
    });

    return labels;
  }, [data]);

  const getTooltipData = (
    day: ContributionDay,
    element: HTMLElement,
  ): TooltipData => {
    const rect = element.getBoundingClientRect();
    const tooltipHalfWidth = 118;
    const left = Math.min(
      Math.max(rect.left + rect.width / 2, tooltipHalfWidth + 8),
      window.innerWidth - tooltipHalfWidth - 8,
    );
    const placement = rect.top < 105 ? "below" : "above";

    return {
      day,
      left,
      placement,
      top: placement === "above" ? rect.top - 10 : rect.bottom + 10,
    };
  };

  const scheduleTooltip = (day: ContributionDay, element: HTMLElement) => {
    if (tooltipShowTimerRef.current) {
      clearTimeout(tooltipShowTimerRef.current);
    }

    const nextTooltip = getTooltipData(day, element);
    tooltipShowTimerRef.current = setTimeout(() => {
      setTooltip(nextTooltip);
      tooltipShowTimerRef.current = null;
    }, TOOLTIP_SHOW_DELAY);
  };

  const scheduleTooltipHide = () => {
    if (tooltipShowTimerRef.current) {
      clearTimeout(tooltipShowTimerRef.current);
      tooltipShowTimerRef.current = null;
    }
    if (tooltipHideTimerRef.current) {
      clearTimeout(tooltipHideTimerRef.current);
    }

    tooltipHideTimerRef.current = setTimeout(() => {
      setTooltip(null);
      tooltipHideTimerRef.current = null;
    }, TOOLTIP_HIDE_DELAY);
  };

  const showTooltipImmediately = (
    day: ContributionDay,
    element: HTMLElement,
  ) => {
    if (tooltipShowTimerRef.current) {
      clearTimeout(tooltipShowTimerRef.current);
      tooltipShowTimerRef.current = null;
    }
    if (tooltipHideTimerRef.current) {
      clearTimeout(tooltipHideTimerRef.current);
      tooltipHideTimerRef.current = null;
    }

    setTooltip(getTooltipData(day, element));
  };

  const handleMouseEnter = (
    day: ContributionDay,
    event: MouseEvent<HTMLButtonElement>,
  ) => scheduleTooltip(day, event.currentTarget);

  const handleFocus = (
    day: ContributionDay,
    event: FocusEvent<HTMLButtonElement>,
  ) => showTooltipImmediately(day, event.currentTarget);

  if (failed && !data) {
    return (
      <div className="mb-5 rounded-lg border border-black/10 bg-white/75 px-4 py-3 text-sm text-gray-500 dark:border-white/10 dark:bg-white/4 dark:text-gray-400">
        O gráfico de contribuições está temporariamente indisponível.
      </div>
    );
  }

  return (
    <div className="mb-5 rounded-lg border border-black/10 bg-white/85 p-4 shadow-md shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-[#111216]/90 dark:shadow-none lg:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2da44e]/10 text-[#1a7f37] dark:bg-[#3fb950]/10 dark:text-[#3fb950]">
            <CalendarDays size={19} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-base font-bold text-gray-950 dark:text-white sm:text-lg">
              {selectedYear === null
                ? "Contribuições nos últimos 12 meses"
                : `Contribuições em ${selectedYear}`}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Atividade pública registrada no GitHub
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:justify-end md:gap-3">
          <div
            className="inline-flex h-9 min-w-0 flex-1 items-center justify-start text-sm font-semibold text-gray-700 dark:text-gray-300 md:hidden"
            aria-live="polite"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <Loader2
                  className="animate-spin text-[#1a7f37] dark:text-[#3fb950]"
                  size={17}
                  aria-hidden="true"
                />
                <span className="sr-only">Atualizando contribuições</span>
              </>
            ) : data?.totalContributions != null ? (
              <span className="whitespace-nowrap">
                <span className="text-[#1a7f37] dark:text-[#3fb950]">
                  {data.totalContributions.toLocaleString("pt-BR")}
                </span>{" "}
                contribuições
              </span>
            ) : (
              <span className="text-gray-400">--</span>
            )}
          </div>

          {!loading && data?.totalContributions != null && (
            <strong
              className="hidden text-sm text-gray-700 dark:text-gray-300 md:block"
              aria-live="polite"
            >
              <span className="text-[#1a7f37] dark:text-[#3fb950]">
                {data.totalContributions.toLocaleString("pt-BR")}
              </span>{" "}
              contribuições
            </strong>
          )}

          <div ref={yearFilterRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsYearMenuOpen((isOpen) => !isOpen)}
              className="inline-flex min-w-28 cursor-pointer items-center justify-between gap-2 rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:border-[#0969da]/50 hover:bg-black/2 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-[#58a6ff]/50 dark:hover:bg-white/8"
              aria-haspopup="listbox"
              aria-expanded={isYearMenuOpen}
              aria-controls="contribution-year-options"
            >
              <span>
                {selectedYear === null
                  ? "Filtrar por ano"
                  : `Ano: ${selectedYear}`}
              </span>
              <ChevronDown
                size={15}
                aria-hidden="true"
                className={isYearMenuOpen ? "rotate-180" : ""}
              />
            </button>

            {isYearMenuOpen && (
              <div
                id="contribution-year-options"
                role="listbox"
                aria-label="Filtrar contribuições por ano"
                className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-36 overflow-hidden rounded-md border border-black/10 bg-white p-1.5 shadow-xl shadow-black/15 dark:border-white/10 dark:bg-[#161b22]"
              >
                {availableYears.map((year) => (
                  <button
                    key={year}
                    type="button"
                    role="option"
                    aria-selected={selectedYear === year}
                    onClick={() => {
                      setSelectedYear((selected) =>
                        selected === year ? null : year,
                      );
                      setIsYearMenuOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between rounded px-3 py-2 text-left text-sm font-medium transition-colors ${
                      selectedYear === year
                        ? "bg-[#0969da] text-white dark:bg-[#1f6feb]"
                        : "text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/8"
                    }`}
                  >
                    <span>{year}</span>
                    {selectedYear === year && (
                      <Check size={15} aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-md border border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-black/15 md:hidden">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0969da]/10 text-[#0969da] dark:bg-[#58a6ff]/10 dark:text-[#58a6ff]">
            <Monitor size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <strong className="block text-sm font-semibold text-gray-900 dark:text-white">
              Visualização completa no computador
            </strong>
            <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
              O gráfico anual detalhado está disponível em telas maiores.
            </p>
          </div>
        </div>

        <a
          href="https://github.com/Kaiquii"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-3 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:border-[#0969da]/40 hover:text-[#0969da] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-[#58a6ff]/40 dark:hover:text-[#58a6ff]"
        >
          Ver perfil no GitHub
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>

      <div className="relative hidden min-w-0 md:block">
        {loading && data && (
          <div className="absolute inset-0 z-20 grid place-items-center rounded-md bg-white/70 backdrop-blur-[2px] dark:bg-[#111216]/70">
            <Loader2
              className="animate-spin text-[#2da44e] dark:text-[#3fb950]"
              size={24}
            />
          </div>
        )}

        {loading && !data ? (
          <div className="flex h-30 items-center justify-center rounded-md border border-black/5 bg-black/2 dark:border-white/5 dark:bg-black/15">
            <Loader2
              className="animate-spin text-[#2da44e] dark:text-[#3fb950]"
              size={24}
            />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              Carregando contribuições...
            </span>
          </div>
        ) : (
          data && (
            <>
              <div
                className="overflow-x-auto pb-1"
                onScroll={scheduleTooltipHide}
              >
                <div className="min-w-190">
                  <div className="relative ml-8 h-5 text-[10px] font-medium capitalize text-gray-500 dark:text-gray-400">
                    {monthLabels.map((month) => (
                      <span
                        key={`${month.label}-${month.weekIndex}`}
                        className="absolute top-0"
                        style={{
                          left: `${(month.weekIndex / data.weeks.length) * 100}%`,
                        }}
                      >
                        {month.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <div className="grid w-6 shrink-0 grid-rows-7 gap-1 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                      <span />
                      <span>seg</span>
                      <span />
                      <span>qua</span>
                      <span />
                      <span>sex</span>
                      <span />
                    </div>

                    <div
                      className="grid flex-1 gap-1"
                      style={{
                        gridTemplateColumns: `repeat(${data.weeks.length}, minmax(9px, 1fr))`,
                      }}
                    >
                      {data.weeks.map((week) => (
                        <div
                          key={week.firstDay}
                          className="grid grid-rows-7 gap-1"
                        >
                          {week.contributionDays.map((day) => {
                            const activity = getActivityLabel(day);
                            const date = formatDate(day.date);

                            return (
                              <button
                                key={day.date}
                                type="button"
                                onMouseEnter={(event) =>
                                  handleMouseEnter(day, event)
                                }
                                onMouseLeave={scheduleTooltipHide}
                                onFocus={(event) => handleFocus(day, event)}
                                onBlur={scheduleTooltipHide}
                                aria-label={`${activity} em ${date}`}
                                className={`aspect-square cursor-default rounded-xs ring-1 ring-inset ring-black/5 outline-none dark:ring-white/5 ${
                                  levelClasses[day.level] ?? levelClasses[0]
                                } hover:ring-2 hover:ring-[#0969da] focus-visible:ring-2 focus-visible:ring-[#0969da] dark:hover:ring-[#58a6ff] dark:focus-visible:ring-[#58a6ff]`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                <span>Menos</span>
                {levelClasses.map((levelClass, index) => (
                  <span
                    key={index}
                    className={`h-2.5 w-2.5 rounded-xs ring-1 ring-inset ring-black/5 dark:ring-white/5 ${levelClass}`}
                  />
                ))}
                <span>Mais</span>
              </div>
            </>
          )
        )}
      </div>

      {failed && data && (
        <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">
          Não foi possível atualizar este ano. Exibindo os últimos dados carregados.
        </p>
      )}

      {tooltip &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-99999 w-max max-w-59 rounded-md border border-[#30363d] bg-[#24292f] px-3 py-2 text-center text-white shadow-xl shadow-black/30"
            style={{
              left: tooltip.left,
              top: tooltip.top,
              transform:
                tooltip.placement === "above"
                  ? "translate(-50%, -100%)"
                  : "translate(-50%, 0)",
            }}
          >
            <strong className="block text-xs font-semibold">
              {getActivityLabel(tooltip.day)}
            </strong>
            <span className="mt-0.5 block text-[11px] text-[#b1bac4]">
              {formatDate(tooltip.day.date)}
            </span>
            <span
              className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-[#30363d] bg-[#24292f] ${
                tooltip.placement === "above"
                  ? "-bottom-1 border-r border-b"
                  : "-top-1 border-l border-t"
              }`}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
