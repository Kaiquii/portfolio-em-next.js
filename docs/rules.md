# Regras obrigatórias do projeto

Este documento define os padrões que devem ser considerados antes de qualquer análise, implementação ou refatoração. Toda alteração deve preservar as decisões abaixo.

## 1. Identidade visual

- Manter o padrão visual existente, incluindo cores, tipografia, espaçamentos, bordas, sombras e densidade das seções.
- Não redesenhar componentes ou seções fora do escopo solicitado.
- Novos elementos devem parecer parte natural da interface atual, tanto no tema claro quanto no escuro.
- Não usar `duration`, `transition-colors`, `transition-all` ou transições de propriedades visuais que causem atraso ao alternar o tema.
- Animações de interação podem usar apenas propriedades que não prejudiquem a troca de tema, como `transform` e `opacity`.

## 2. Responsividade e temas

- Toda implementação de front-end deve ser desenvolvida e validada no desktop e no mobile.
- Considerar textos longos, áreas clicáveis, quebras de linha, menus, modais, gráficos e estados de carregamento em telas pequenas.
- Toda interface deve funcionar corretamente nos temas claro e escuro.
- Não corrigir um tema causando regressão visual no outro.

## 3. Arquitetura e componentes

- Seguir a arquitetura, a organização de pastas e os padrões de código já utilizados pelo projeto.
- Reutilizar componentes, tipos, utilitários e estilos existentes antes de criar novos.
- Quando um novo componente for necessário, criá-lo com responsabilidade clara e possibilidade real de reutilização.
- Evitar abstrações, dependências ou arquivos que não resolvam uma necessidade concreta.
- Manter as alterações limitadas ao escopo solicitado e não realizar refatorações visuais paralelas.

## 4. Requisições HTTP

- Usar Axios em todas as conexões HTTP realizadas pelo código da aplicação.
- Não usar `fetch`, direta ou indiretamente, para consumir APIs.
- Preservar timeout, cancelamento, tratamento de erro, fallback e estados de carregamento quando uma integração for alterada.
- Tokens e credenciais devem permanecer somente no servidor e nunca usar o prefixo `NEXT_PUBLIC_`.

## 5. URLs e variáveis de ambiente

- Não fixar URLs-base de APIs ou serviços externos no código-fonte.
- Armazenar URLs externas, identificadores configuráveis e credenciais em variáveis de ambiente.
- Centralizar a leitura e a validação dessas variáveis em um único módulo de configuração.
- Documentar novas variáveis em `.env.example` e no `README.md`.
- Nunca versionar `.env.local`, tokens ou outros segredos.

## 6. Scrollbars

- Usar a scrollbar global definida em `app/globals.css` em áreas roláveis.
- Não usar a scrollbar padrão do navegador nem criar uma segunda identidade visual para scrollbars locais.
- Ocultar a scrollbar somente quando o componente já seguir o padrão existente e continuar acessível por toque, mouse e teclado.

## 7. Qualidade da interface

- Toda funcionalidade assíncrona deve considerar estados de carregamento, sucesso, vazio e erro.
- Controles interativos devem ter foco visível, nome acessível e área de toque adequada no mobile.
- Não permitir sobreposição incoerente, rolagem horizontal acidental ou conteúdo cortado.
- Preservar o conteúdo e o comportamento profissional já aprovados no projeto.

## 8. Validação antes de concluir

- Confirmar que as regras deste documento foram respeitadas.
- Executar ESLint e a verificação do TypeScript.
- Executar a build de produção quando a alteração afetar código, configuração, dependências ou PWA.
- Validar visualmente desktop, mobile, tema claro e tema escuro quando houver mudança de front-end.
- Não considerar a tarefa concluída enquanto houver erros conhecidos relacionados à alteração.
