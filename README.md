
# 📘 Desafio Técnico – API RESTful com PostgreSQL

Este repositório contém a solução do desafio técnico proposto pela **Cubos Academy**, desenvolvido por **Renan Lima**. O desafio consiste na construção de uma API RESTful utilizando **Node.js** com **PostgreSQL**. O objetivo principal é permitir o gerenciamento de usuários, matérias e resumos, com autenticação e autorização via JWT.

---

## 🚀 Tecnologias utilizadas

- **VSCode** – Ambiente de desenvolvimento principal.
- **Docker** – Contêinerização da aplicação e do banco de dados.
- **PostgreSQL** – Banco de dados relacional utilizado na persistência.
- **Beekeeper Studio** – Cliente gráfico para interação com o banco de dados.
- **Postman** – Testes e documentação dos endpoints da API.
- **Navicat Data Modeler** – Modelagem do banco de dados relacional.
- **TypeScript** – Superset de JavaScript utilizado para tipagem estática.

---

## 📦 Funcionalidades

- Cadastro e login de usuários com senha criptografada e autenticação JWT.
- CRUD completo para matérias (disciplinas) vinculadas aos usuários.
- CRUD completo para resumos vinculados a matérias e usuários autenticados.
- Validações robustas e mensagens de erro padronizadas.
- Arquitetura modular: separação entre rotas, controladores, middlewares e banco de dados.

---

## ⚙️ Como executar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/desafio-api-cubos.git
cd api-restful-docker
```

2. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
```

3. **Execute a aplicação com Docker:**

```bash
docker-compose up -d
```

> Isso iniciará os containers da aplicação e do banco de dados PostgreSQL.

4. **Utilize o Postman para testar a API:**

- Os endpoints estarão acessíveis em: `http://localhost:3000`.

> Observação: Após configurar o `.env`, iniciar os containers com Docker e conectar ao banco via Beekeeper, recomenda-se executar o arquivo `testeconnect.ts` localizado na raiz do projeto, para verificar se a conexão com o banco de dados foi estabelecida corretamente.

---

## 🗂 Estrutura do projeto

```
/
├── src/
│   ├── auxiliar/             # Funções auxiliares reutilizáveis
│   ├── controller/           # Lógica dos endpoints da API
│   ├── intermediarios/       # Middlewares de autenticação e validação
│   ├── tipos/                # Tipagens TypeScript utilizadas no projeto
│   ├── util/                 # Utilitários diversos
│   ├── app.ts                # Instância principal do Express
│   ├── conexaoBd.ts          # Conexão com o banco de dados PostgreSQL
│   ├── index.ts              # Inicialização do servidor
│   ├── rotas.ts              # Definição das rotas da API
│   └── testeconnect.ts       # Teste de conexão com o banco de dados
├── __test__/                 # Testes automatizados
├── assets/                   # Recursos adicionais (ex: imagens, exemplos)
├── .gitignore                # Arquivos e pastas ignorados pelo Git
├── CustomReporter.js         # Relatório customizado para testes (Jest)
├── README.md                 # Documentação principal do projeto
├── comandos.sql              # Script SQL de criação de tabelas e inserts
├── docker-compose.yml        # Configuração dos containers Docker
├── jest.config.js            # Configuração de testes com Jest
├── package.json              # Dependências e scripts do projeto
├── package-lock.json         # Versões exatas das dependências
├── tsconfig.json             # Configuração do TypeScript
```

---

## 🧑‍💻 Autor

Desenvolvido por **Renan Lima**  
Desafio prático proposto pela **Cubos Academy**  
Abril de 2025

---
