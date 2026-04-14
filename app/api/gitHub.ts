import axios from "axios";
import { GithubRepo } from "../types/githubTypes";

export const getGithubRepos = async (): Promise<GithubRepo[]> => {
  try {
    const response = await axios.get<GithubRepo[]>(
      "https://api.github.com/users/Kaiquii/repos?sort=updated&per_page=40",
    );

    return response.data.filter((repo) => !repo.fork);
  } catch (error) {
    console.error("Erro ao buscar repositórios do GitHub:", error);
    return [];
  }
};
