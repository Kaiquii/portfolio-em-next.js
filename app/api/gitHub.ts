import axios from "axios";
import { GithubRepo } from "../types/githubTypes";

export const getGithubRepos = async (
  signal?: AbortSignal,
): Promise<GithubRepo[]> => {
  const response = await axios.get<GithubRepo[]>("/api/github-repositories", {
    signal,
    timeout: 15_000,
  });

  return response.data;
};
