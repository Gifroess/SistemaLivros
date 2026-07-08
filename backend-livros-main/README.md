# Backend * Sistema de Livros

Este projeto é uma API REST para o gerenciamento de livros, desenvolvida com arquitetura de services e controllers. O sistema inclui autenticação de usuários, operações de banco de dados e integração externa com a API do Google Books exigindo chave de acesso.

### Tecnologias Utilizadas
* Express
* Prisma ORM
* SQLite
* TypeScript
* JSON Web Token (JWT)

### Configuração e Instalação

**1. Instalar as dependências:**
npm install

**2. Obter a Chave do Google Books:**
Para que a busca de livros funcione corretamente, é necessário gerar uma credencial gratuita no Google Cloud:
* Acesse o console do Google Cloud e faça login.
* Crie um novo projeto.
* Navegue até "APIs e Serviços" e depois clique em "Biblioteca".
* Pesquise por "Books API" e ative o serviço.
* Vá na aba "Credenciais", clique em "Criar Credenciais", escolha "Chave de API" e selecione o "Books API"
* Copie a chave gerada.

**3. Configuração das Variáveis de Ambiente:**
Crie um arquivo chamado .env na raiz do projeto (baseado no arquivo .env.example) e adicione as seguintes variáveis:
DATABASE_URL="file:./app.db"
JWT_SECRET="insira_uma_chave_secreta_qualquer_aqui"
GOOGLE_BOOKS_KEY="insira_aqui_a_chave_da_api_do_google_books_aqui"

**4. Gerar e inicializar o Banco de Dados:**
Execute os comandos abaixo para gerar o cliente do Prisma e sincronizar as tabelas do banco de dados SQLite:
npx prisma generate
npx prisma db push

**5. Rodar o projeto:**
npm run dev

### Administração do Banco de Dados
Para abrir a interface gráfica do Prisma e visualizar os registros diretamente no navegador, utilize o comando:
npx prisma studio