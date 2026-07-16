import "server-only";

const getRequiredEnvironmentValue = (name: string) => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Variável de ambiente ${name} não configurada.`);
  }

  return value;
};

const getBaseUrl = (name: string) => {
  const value = getRequiredEnvironmentValue(name);
  const url = new URL(value);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`Variável de ambiente ${name} deve ser uma URL HTTP.`);
  }

  return url.toString().replace(/\/$/, "");
};

export const getGithubConfig = () => ({
  apiUrl: getBaseUrl("GITHUB_API_URL"),
  webUrl: getBaseUrl("GITHUB_WEB_URL"),
  username: getRequiredEnvironmentValue("GITHUB_USERNAME"),
});

export type GithubConfig = ReturnType<typeof getGithubConfig>;
