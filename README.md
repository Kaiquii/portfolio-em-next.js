# Portfólio Kaiqui Dev

Portfólio profissional desenvolvido com Next.js, TypeScript e Tailwind CSS. O projeto reúne apresentação, projetos, atividade pública do GitHub, linguagens mais utilizadas, depoimentos e canais de contato em uma experiência responsiva e instalável como PWA.

## Demonstração

- Site: [portfolio-kaiqui.vercel.app](https://portfolio-kaiqui.vercel.app)
- GitHub: [github.com/Kaiquii](https://github.com/Kaiquii)
- LinkedIn: [linkedin.com/in/kaiqui-lucas](https://www.linkedin.com/in/kaiqui-lucas/)

## Funcionalidades

- Apresentação profissional com tema claro e escuro.
- Carrossel de projetos com links para demonstração e código-fonte.
- Listagem e busca de repositórios públicos do GitHub.
- Filtro de repositórios por linguagem.
- Calendário de contribuições dos últimos 12 meses ou de um ano específico.
- Gráfico das seis linguagens com maior volume de código público.
- Exibição dos últimos commits enviados.
- Depoimentos profissionais.
- Contato por WhatsApp, e-mail e LinkedIn.
- Cópia do endereço de e-mail com feedback visual.
- Download do currículo.
- PWA com suporte à instalação e funcionamento offline dos recursos estáticos.

## Tecnologias

- Next.js 16 e React 19.
- TypeScript.
- Tailwind CSS 4.
- Framer Motion.
- Zustand.
- Swiper.
- Axios.
- Lucide React e React Icons.
- GitHub REST API e GitHub GraphQL API.
- `@ducanh2912/next-pwa` e Workbox.

## Estrutura principal

```text
app/
├── api/
│   ├── github-contributions/   # Calendário de contribuições
│   ├── github-languages/       # Volume de código por linguagem
│   ├── github-repositories/    # Repositórios públicos e fallback
│   └── gitHub.ts               # Cliente interno da API de repositórios
├── components/                 # Seções e componentes da interface
├── data/                       # Snapshot de fallback dos repositórios
├── store/                      # Estado global do tema
├── types/                      # Tipos compartilhados
└── utils/                      # Utilitários de linguagens

public/
├── document/                   # Currículo
├── icons/                      # Ícones do PWA
├── img/                        # Imagens otimizadas em WebP
└── manifest.json               # Manifesto do PWA
```

## Pré-requisitos

- Node.js 20 ou superior.
- npm.
- Token do GitHub recomendado para carregar todos os dados dinâmicos.

## Configuração local

1. Clone o repositório:

```bash
git clone https://github.com/Kaiquii/portfolio-em-next.js.git
cd portfolio-em-next.js
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env.local` com base no exemplo:

```bash
GITHUB_TOKEN=seu_token_do_github
GITHUB_USERNAME=Kaiquii
GITHUB_API_URL=https://api.github.com
GITHUB_WEB_URL=https://github.com
```

4. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O projeto ficará disponível em [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável | Obrigatória | Uso |
|---|---|---|
| `GITHUB_TOKEN` | Recomendada | Autentica as consultas às APIs REST e GraphQL do GitHub e aumenta o limite de requisições. |
| `GITHUB_USERNAME` | Sim | Define o perfil usado nas consultas de repositórios, linguagens e contribuições. |
| `GITHUB_API_URL` | Sim | Define a URL-base usada pelo Axios nas APIs REST e GraphQL do GitHub. |
| `GITHUB_WEB_URL` | Sim | Define a URL-base usada no fallback do calendário público. |

Essas variáveis são lidas e validadas de forma centralizada em `app/config/github.ts`. O token deve permanecer apenas no servidor. Não use o prefixo `NEXT_PUBLIC_` e nunca envie `.env.local` para o GitHub.

Para este portfólio, um token com acesso somente de leitura aos repositórios públicos é suficiente. Sem token, a listagem utiliza o snapshot local e o calendário tenta consultar a página pública do GitHub; o gráfico de linguagens depende do token.

## Integração com o GitHub

O projeto possui três rotas internas:

| Rota | Origem dos dados | Cache |
|---|---|---|
| `/api/github-repositories` | API REST do GitHub | 12 horas; usa snapshot local em caso de falha. |
| `/api/github-languages` | API GraphQL, somando os bytes de linguagens dos repositórios públicos que não são forks | 12 horas. |
| `/api/github-contributions` | API GraphQL com fallback para o calendário público | Sem cache; os dados são consultados novamente a cada requisição. |

As chamadas ao GitHub acontecem no servidor, utilizam Axios e recebem as URLs externas pelas variáveis de ambiente. Dessa forma, o token não é exposto no navegador e uma mudança de endpoint é feita em um único lugar.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o Next.js em desenvolvimento com Webpack. |
| `npm run build` | Gera a build otimizada de produção e o service worker. |
| `npm run start` | Executa a build de produção. |
| `npm run lint` | Analisa o código com ESLint. |

Para verificar os tipos sem gerar arquivos:

```bash
npx tsc --noEmit
```

## PWA

O PWA é desativado durante o desenvolvimento e gerado por `npm run build`. O service worker e os arquivos do Workbox são criados na pasta `public`.

Ao alterar imagens ou outros arquivos públicos, execute uma nova build antes do deploy para atualizar a lista de recursos armazenados. As contribuições do GitHub utilizam `no-store` e não são mantidas no cache do PWA.

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Abra **Project Settings > Environments**.
3. Cadastre `GITHUB_TOKEN` como variável sensível para o ambiente de produção.
4. Cadastre também `GITHUB_USERNAME`, `GITHUB_API_URL` e `GITHUB_WEB_URL` com os valores descritos em `.env.example`.
5. Faça um novo deploy para aplicar as variáveis.

A Vercel detecta o Next.js e utiliza automaticamente `npm run build`.

## Qualidade do projeto

Antes de publicar alterações, execute:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Autor

Desenvolvido por [Kaiqui Lucas](https://github.com/Kaiquii).
