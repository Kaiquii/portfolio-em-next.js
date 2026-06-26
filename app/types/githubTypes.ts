export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
  pushed_at: string;
  forks_count?: number;
  open_issues_count?: number;
}
