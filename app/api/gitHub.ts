import { GithubRepo } from "../types/githubTypes";

export const getGithubRepos = async (): Promise<GithubRepo[]> => {
  try {
    const response = await fetch("/api/github-repositories");
    if (!response.ok) throw new Error(`API respondeu com ${response.status}`);

    return response.json();
  } catch (error) {
    console.error("Erro ao buscar repositórios do GitHub:", error);
    return [];
  }
};
