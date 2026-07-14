import { NextRequest, NextResponse } from "next/server";

const GITHUB_USERNAME = "Kaiquii";
const REVALIDATE_SECONDS = 60 * 60 * 6;

type ContributionDay = {
  date: string;
  contributionCount: number | null;
  level: number;
};

type ContributionWeek = {
  firstDay: string;
  contributionDays: ContributionDay[];
};

type ContributionCalendar = {
  selectedYear: number;
  totalContributions: number | null;
  weeks: ContributionWeek[];
  years: number[];
};

const contributionLevel: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const graphqlQuery = `
  query ContributionCalendar(
    $login: String!
    $from: DateTime
    $to: DateTime
  ) {
    user(login: $login) {
      allContributions: contributionsCollection {
        contributionYears
      }
      selectedContributions: contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const getDateRange = (selectedYear: number) => {
  const currentYear = new Date().getFullYear();

  if (selectedYear === currentYear) {
    return { from: null, to: null };
  }

  return {
    from: `${selectedYear}-01-01T00:00:00Z`,
    to: `${selectedYear}-12-31T23:59:59Z`,
  };
};

const normalizeYears = (years: number[]) => {
  const currentYear = new Date().getFullYear();
  const validYears = years.filter(
    (year) => Number.isInteger(year) && year >= 2008 && year <= currentYear,
  );
  const earliestYear = Math.min(currentYear - 4, ...validYears);

  return Array.from(
    { length: currentYear - earliestYear + 1 },
    (_, index) => currentYear - index,
  );
};

async function fetchFromGraphql(
  token: string,
  selectedYear: number,
): Promise<ContributionCalendar> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-kaiqui",
    },
    body: JSON.stringify({
      query: graphqlQuery,
      variables: {
        login: GITHUB_USERNAME,
        ...getDateRange(selectedYear),
      },
    }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL respondeu com ${response.status}`);
  }

  const payload = await response.json();
  const user = payload?.data?.user;
  const calendar = user?.selectedContributions?.contributionCalendar;

  if (!calendar?.weeks) {
    throw new Error("Calendário de contribuições não encontrado");
  }

  const years = normalizeYears(
    user?.allContributions?.contributionYears ?? [],
  );

  return {
    selectedYear,
    totalContributions: calendar.totalContributions,
    years,
    weeks: calendar.weeks.map(
      (week: {
        firstDay: string;
        contributionDays: Array<{
          date: string;
          contributionCount: number;
          contributionLevel: string;
        }>;
      }) => ({
        firstDay: week.firstDay,
        contributionDays: week.contributionDays.map((day) => ({
          date: day.date,
          contributionCount: day.contributionCount,
          level: contributionLevel[day.contributionLevel] ?? 0,
        })),
      }),
    ),
  };
}

const getAttribute = (tag: string, attribute: string) => {
  const match = tag.match(
    new RegExp(`${attribute}=(?:"([^"]*)"|'([^']*)')`, "i"),
  );
  return match?.[1] ?? match?.[2];
};

const getWeekStart = (date: string) => {
  const day = new Date(`${date}T00:00:00Z`);
  day.setUTCDate(day.getUTCDate() - day.getUTCDay());
  return day.toISOString().slice(0, 10);
};

const parseContributionCount = (text?: string) => {
  if (!text) return undefined;
  if (/no contributions/i.test(text)) return 0;

  const countMatch = text.match(/([\d,.]+)\s+contributions?/i);
  return countMatch
    ? Number(countMatch[1].replace(/[,\.]/g, ""))
    : undefined;
};

const extractTooltipCounts = (html: string) => {
  const counts = new Map<string, number>();
  const tooltipPattern =
    /<tool-tip\b[^>]*(?:for|data-for)=(?:"([^"]+)"|'([^']+)')[^>]*>([\s\S]*?)<\/tool-tip>/gi;

  for (const match of html.matchAll(tooltipPattern)) {
    const target = match[1] ?? match[2];
    const text = match[3].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const count = parseContributionCount(text);

    if (count !== undefined) counts.set(target, count);
  }

  return counts;
};

const getFallbackYears = (html: string) => {
  const parsedYears = [
    ...Array.from(html.matchAll(/data-year=(?:"(\d{4})"|'(\d{4})')/g)).map(
      (match) => Number(match[1] ?? match[2]),
    ),
    ...Array.from(html.matchAll(/[?&]from=(\d{4})-/g)).map((match) =>
      Number(match[1]),
    ),
  ];

  return normalizeYears(parsedYears);
};

async function fetchPublicCalendar(
  selectedYear: number,
): Promise<ContributionCalendar> {
  const currentYear = new Date().getFullYear();
  const query =
    selectedYear === currentYear
      ? ""
      : `?from=${selectedYear}-01-01&to=${selectedYear}-12-31`;
  const response = await fetch(
    `https://github.com/users/${GITHUB_USERNAME}/contributions${query}`,
    {
      headers: {
        Accept: "text/html",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "portfolio-kaiqui",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub respondeu com ${response.status}`);
  }

  const html = await response.text();
  const dayTags =
    html.match(/<[^>]+data-date=(?:"[^"]+"|'[^']+')[^>]*>/g) ?? [];
  const tooltipCounts = extractTooltipCounts(html);
  const weeks = new Map<string, Map<string, ContributionDay>>();

  for (const tag of dayTags) {
    const date = getAttribute(tag, "data-date");
    const rawLevel = getAttribute(tag, "data-level");
    const rawCount = getAttribute(tag, "data-count");
    const dayId = getAttribute(tag, "id");
    const accessibleCount = parseContributionCount(
      getAttribute(tag, "aria-label") ??
        getAttribute(tag, "data-tooltip") ??
        getAttribute(tag, "data-tooltip-text"),
    );

    if (!date || rawLevel === undefined) continue;

    const weekStart = getWeekStart(date);
    const days = weeks.get(weekStart) ?? new Map<string, ContributionDay>();
    const level = Number(rawLevel);
    const tooltipCount = dayId ? tooltipCounts.get(dayId) : undefined;
    const contributionCount =
      rawCount !== undefined
        ? Number(rawCount)
        : tooltipCount !== undefined
          ? tooltipCount
          : accessibleCount !== undefined
            ? accessibleCount
          : level === 0
            ? 0
            : null;

    days.set(date, { date, contributionCount, level });
    weeks.set(weekStart, days);
  }

  if (weeks.size === 0) {
    throw new Error("Calendário público não encontrado");
  }

  const totalMatch = html.match(/([\d,.]+)\s+contributions?/i);

  return {
    selectedYear,
    totalContributions: totalMatch
      ? Number(totalMatch[1].replace(/[,\.]/g, ""))
      : null,
    years: getFallbackYears(html),
    weeks: Array.from(weeks.entries())
      .sort(([firstDayA], [firstDayB]) =>
        firstDayA.localeCompare(firstDayB),
      )
      .map(([firstDay, contributionDays]) => ({
        firstDay,
        contributionDays: Array.from(contributionDays.values()).sort((a, b) =>
          a.date.localeCompare(b.date),
        ),
      })),
  };
}

export async function GET(request: NextRequest) {
  const currentYear = new Date().getFullYear();
  const requestedYear = Number(request.nextUrl.searchParams.get("year"));
  const selectedYear =
    Number.isInteger(requestedYear) &&
    requestedYear >= 2008 &&
    requestedYear <= currentYear
      ? requestedYear
      : currentYear;

  try {
    const token = process.env.GITHUB_TOKEN;
    const calendar = token
      ? await fetchFromGraphql(token, selectedYear).catch(() =>
          fetchPublicCalendar(selectedYear),
        )
      : await fetchPublicCalendar(selectedYear);

    return NextResponse.json(calendar, {
      headers: {
        "Cache-Control":
          "public, s-maxage=21600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Erro ao carregar contribuições do GitHub:", error);
    return NextResponse.json(
      { error: "Não foi possível carregar as contribuições agora." },
      { status: 503 },
    );
  }
}
