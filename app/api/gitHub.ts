import axios from "axios";
import { GithubRepo } from "../types/githubTypes";

export const getGithubRepos = async (): Promise<GithubRepo[]> => {
  try {
    let allRepos: GithubRepo[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get<GithubRepo[]>(
        `https://api.github.com/users/Kaiquii/repos?sort=updated&per_page=100&page=${page}`,
      );
      allRepos = [...allRepos, ...response.data];

      if (response.data.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allRepos.filter((repo) => !repo.fork);
  } catch (error) {
    console.error("Erro ao buscar repositórios do GitHub:", error);
    return [];
  }
};
