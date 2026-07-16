import axios from "axios";
import { NextResponse } from "next/server";
import fallbackRepositoriesData from "../../data/githubRepositoriesFallback.json";
import { getGithubConfig } from "../../config/github";
import { GithubRepo } from "../../types/githubTypes";

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
    const { apiUrl, username } = getGithubConfig();
    const repositories: GithubRepo[] = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await axios.get<GithubRepo[]>(
        `${apiUrl}/users/${username}/repos?sort=updated&per_page=100&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "User-Agent": "portfolio-kaiqui",
          },
          timeout: 15_000,
        },
      );

      const currentPage = response.data;
      repositories.push(...currentPage.filter((repository) => !repository.fork));
      hasNextPage = currentPage.length === 100;
      page += 1;
    }

    return repositoriesResponse(repositories, "github");
  } catch {
    return repositoriesResponse(fallbackRepositories, "snapshot");
  }
}
