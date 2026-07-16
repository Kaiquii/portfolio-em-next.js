import axios from "axios";
import { GithubRepo } from "../types/githubTypes";

export const getGithubRepos = async (): Promise<GithubRepo[]> => {
  try {
    const response = await axios.get<GithubRepo[]>(
      "/api/github-repositories",
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar repositórios do GitHub:", error);
    return [];
  }
};
