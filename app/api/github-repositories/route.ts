import { NextResponse } from "next/server";
import fallbackRepositoriesData from "../../data/githubRepositoriesFallback.json";
import { GithubRepo } from "../../types/githubTypes";

const GITHUB_USERNAME = "Kaiquii";
const REVALIDATE_SECONDS = 60 * 60 * 12;
const fallbackRepositories = fallbackRepositoriesData as GithubRepo[];

const repositoriesResponse = (
  repositories: GithubRepo[],
  source: "github" | "snapshot",
) =>
  NextResponse.json(repositories, {
    headers: {
      "Cache-Control":
        source === "github"
          ? "public, s-maxage=43200, stale-while-revalidate=86400"
          : "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-GitHub-Data-Source": source,
    },
  });

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return repositoriesResponse(fallbackRepositories, "snapshot");

  try {
    const repositories: GithubRepo[] = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "User-Agent": "portfolio-kaiqui",
          },
          next: { revalidate: REVALIDATE_SECONDS },
        },
      );

      if (!response.ok) {
        throw new Error(`GitHub respondeu com ${response.status}`);
      }

      const currentPage: GithubRepo[] = await response.json();
      repositories.push(...currentPage.filter((repository) => !repository.fork));
      hasNextPage = currentPage.length === 100;
      page += 1;
    }

    return repositoriesResponse(repositories, "github");
  } catch {
    return repositoriesResponse(fallbackRepositories, "snapshot");
  }
}
