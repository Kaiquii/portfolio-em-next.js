import axios, { type AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import {
  getGithubConfig,
  type GithubConfig,
} from "../../config/github";


type LanguageTotal = {
  color: string;
  name: string;
  value: number;
};

type LanguageResponse = {
  languages: Array<LanguageTotal & { percentage: number }>;
};

type GraphqlRepositories = {
  nodes: Array<{
    languages?: {
      edges?: Array<{
        node?: { color?: string | null; name?: string };
        size?: number;
      }>;
    };
  }>;
  pageInfo?: {
    endCursor?: string | null;
    hasNextPage?: boolean;
  };
};

type GraphqlPayload = {
  data?: {
    user?: {
      repositories?: GraphqlRepositories;
    };
  };
};

const fallbackColors: Record<string, string> = {
  C: "#555555",
  "C#": "#178600",
  "C++": "#f34b7d",
  CSS: "#663399",
  Dart: "#00B4AB",
  Go: "#00ADD8",
  HTML: "#e34c26",
  Java: "#b07219",
  JavaScript: "#f1e05a",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  Python: "#3572A5",
  Ruby: "#701516",
  Rust: "#dea584",
  Shell: "#89e051",
  Swift: "#F05138",
  TypeScript: "#3178c6",
  Vue: "#41b883",
};

const graphqlQuery = `
  query PublicRepositoryLanguages($login: String!, $cursor: String) {
    user(login: $login) {
      repositories(
        first: 100
        after: $cursor
        ownerAffiliations: OWNER
        privacy: PUBLIC
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          languages(first: 100, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                color
                name
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

const normalizeLanguages = (
  totals: Map<string, LanguageTotal>,
): LanguageResponse => {
  const totalValue = Array.from(totals.values()).reduce(
    (sum, language) => sum + language.value,
    0,
  );

  const languages = Array.from(totals.values())
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)
    .map((language) => ({
      ...language,
      percentage:
        totalValue > 0
          ? Number(((language.value / totalValue) * 100).toFixed(1))
          : 0,
    }));

  return { languages };
};

async function requestLanguageBytes(
  token: string,
  config: GithubConfig,
): Promise<LanguageResponse> {
  const totals = new Map<string, LanguageTotal>();
  let cursor: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const response: AxiosResponse<GraphqlPayload> =
      await axios.post<GraphqlPayload>(
        `${config.apiUrl}/graphql`,
        {
          query: graphqlQuery,
          variables: { login: config.username, cursor },
        },
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "portfolio-kaiqui",
          },
          timeout: 15_000,
        },
      );

    const payload: GraphqlPayload = response.data;
    const repositories: GraphqlRepositories | undefined =
      payload.data?.user?.repositories;

    if (!repositories?.nodes) {
      throw new Error("Linguagens dos repositórios não encontradas");
    }

    for (const repository of repositories.nodes) {
      const edges = repository?.languages?.edges ?? [];

      for (const edge of edges) {
        const name = edge?.node?.name;
        const value = Number(edge?.size);
        if (!name || !Number.isFinite(value) || value <= 0) continue;

        const current = totals.get(name);
        totals.set(name, {
          name,
          color: edge.node?.color ?? fallbackColors[name] ?? "#8b949e",
          value: (current?.value ?? 0) + value,
        });
      }
    }

    cursor = repositories.pageInfo?.endCursor ?? null;
    hasNextPage = Boolean(repositories.pageInfo?.hasNextPage && cursor);
  }

  return normalizeLanguages(totals);
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN não configurado." },
        { status: 503 },
      );
    }

    const languageData = await requestLanguageBytes(
      token,
      getGithubConfig(),
    );

    return NextResponse.json(languageData, {
      headers: {
        "Cache-Control":
          "public, s-maxage=43200, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Erro ao carregar linguagens do GitHub:", error);
    return NextResponse.json(
      { error: "Não foi possível carregar as linguagens agora." },
      { status: 503 },
    );
  }
}
