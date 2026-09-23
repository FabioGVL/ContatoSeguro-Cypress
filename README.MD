[![Contato Seguro Automation](https://github.com/FabioGVL/ContatoSeguro-Cypress/actions/workflows/ContatoSeguroAutomation.yml/badge.svg)](https://github.com/FabioGVL/ContatoSeguro-Cypress/actions/workflows/ContatoSeguroAutomation.yml)

# Automação de Testes E2E e API - Contato Seguro

## Escopo do Produto

O **Contato Seguro** é uma aplicação de gerenciamento de usuários vinculados a um grupo composto por diferentes empresas.

A aplicação disponibiliza uma interface para cadastro, listagem, edição e exclusão de usuários, utilizando informações como nome, e-mail, telefone, cidade de nascimento, data de nascimento e empresa associada.

Além da interface web, o sistema disponibiliza uma API responsável pelas operações relacionadas a usuários e empresas, permitindo realizar consultas, cadastros, atualizações e exclusões através de requisições HTTP.

O ambiente completo da aplicação é composto por FrontEnd, BackEnd/API e banco de dados MySQL, executados de forma integrada através de containers Docker.

## Escopo do Teste

A estratégia de testes tem como objetivo garantir a funcionalidade correta da aplicação, a integridade dos dados fornecidos pela API e o comportamento das principais operações de CRUD.

* **Mapeamento de Features:** Formulário de cadastro de usuários, listagem de usuários, edição e exclusão de usuários e operações de usuários e empresas através da API.
* **Features Testadas:** Criação, leitura, atualização e exclusão de usuários, validação dos campos obrigatórios, validações de entrada, consulta de usuários e empresas e operações de CRUD disponibilizadas pelo BackEnd.
* **Massa de Dados:** Utilização de usuários fictícios com diferentes informações, como nome, e-mail, telefone, cidade, data de nascimento e empresa. A suíte também utiliza geração dinâmica de dados através da biblioteca *Faker BR* em parte dos cenários de FrontEnd.
* **Tipos de Testes:**
  * **Testes de Funcionalidade:** Verificação das funcionalidades do formulário, listagem de usuários, operações de CRUD e endpoints da API.
  * **Testes de Usabilidade:** Avaliação da facilidade de uso do sistema, navegabilidade entre as páginas e clareza das informações apresentadas, conforme o escopo original do teste técnico.
  * **Testes de Integração:** Validação da comunicação entre FrontEnd, BackEnd/API e banco de dados durante as operações executadas pela aplicação.
  * **Testes E2E (End-to-End):** Validação dos principais fluxos da interface através do Cypress, simulando a utilização da aplicação pelo usuário.
  * **Testes de API:** Validação direta dos endpoints utilizando `cy.request()`, verificando códigos HTTP, dados retornados e comportamentos esperados em cenários válidos e inválidos.

A suíte possui atualmente **57 testes automatizados**, sendo **30 testes de FrontEnd/UI** e **27 testes de API/BackEnd**.

## Arquitetura e Estrutura

O projeto foi organizado para permitir a execução integrada da aplicação e da suíte de testes, mantendo a separação entre os testes de interface, testes de API, elementos reutilizáveis e infraestrutura do ambiente.

* **Estrutura de Testes:** Separação dos cenários Cypress entre `UI/FrontEnd` e `Services/BackEnd`, com arquivos específicos para cenários válidos e inválidos.
* **Elementos e Massa Dinâmica:** Seletores utilizados pela interface e geração de dados de teste centralizados nos arquivos de suporte do Cypress.
* **API Testing Approach:** Utilização de `cy.request()` para interação direta com os endpoints do BackEnd, permitindo validar a API independentemente da interface gráfica.
* **Ambiente Docker:** A aplicação é executada através de Docker Compose, utilizando containers independentes para banco de dados, BackEnd e FrontEnd.
* **BackEnd:** API executada em `PHP 8.1` com `Apache` e `Slim 4`.
* **FrontEnd:** Aplicação baseada em `React 17`, executada em ambiente Node.js.
* **Banco de Dados:** MySQL executado em container próprio e inicializado através dos arquivos versionados em `Ambiente/db`.
* **Relatórios:** Integração com `cypress-mochawesome-reporter` para geração de relatório HTML, além das evidências de screenshots e vídeos produzidas pelo Cypress.
* **CI/CD:** GitHub Actions responsável por construir um ambiente Docker descartável, aguardar a disponibilidade da aplicação, executar a suíte automatizada, publicar evidências e finalizar o ambiente.
* **Tecnologias e Ambiente:** `Cypress 10.11.0` | `JavaScript` | `Faker BR` | `Mochawesome` | `Node.js` | `React` | `PHP` | `Slim` | `Apache` | `MySQL` | `Docker` | `Docker Compose` | `GitHub Actions` | `Postman` | `Git` | `Windows 11` | `Linux/Ubuntu`

## Testes e Validações

A suíte está organizada entre testes de interface e testes de API, separando os cenários válidos e inválidos em arquivos específicos.

<details>
<summary><b>FrontEnd / UI</b></summary>

### Cenários Válidos

- Validar informações do corpo da página inicial
- Validar o botão de criação de novo usuário
- Validar o pop-up de cadastro
- Cadastrar novo usuário
- Editar usuário
- Excluir usuário
- Validar obrigatoriedade do campo Nome
- Validar obrigatoriedade do campo Telefone
- Validar obrigatoriedade do campo E-mail
- Validar obrigatoriedade do campo Data de nascimento
- Validar obrigatoriedade do campo Cidade
- Validar obrigatoriedade da seleção de Empresa

### Cenários Inválidos

**Nome**
- Inserir números
- Inserir caracteres especiais
- Inserir espaço em branco

**Telefone**
- Inserir letras
- Inserir caracteres especiais
- Inserir espaço em branco

**E-mail**
- Inserir valor fora do formato esperado
- Inserir excesso do caractere `@`
- Inserir espaço em branco
- Inserir e-mail já cadastrado

**Data de nascimento**
- Inserir ano posterior ao vigente
- Inserir data de nascimento recente

**Cidade**
- Inserir números
- Inserir caracteres especiais
- Inserir espaço em branco

**Empresa**
- Inserir números
- Inserir caracteres especiais
- Inserir espaço em branco

</details>

<details>
<summary><b>API / BackEnd</b></summary>

### Cenários Válidos

- Consultar o status da aplicação
- Consultar lista de usuários
- Buscar usuário por ID
- Atualizar informações de usuário
- Excluir usuário
- Consultar lista de empresas
- Buscar empresa por ID
- Criar empresa
- Atualizar informações de empresa
- Excluir empresa

### Cenários Inválidos

**Usuários**
- Buscar usuário utilizando ID apenas com letras
- Buscar usuário utilizando ID com números e letras
- Buscar usuário utilizando ID com números e caracteres especiais
- Buscar usuário utilizando ID apenas com caracteres especiais
- Buscar usuário utilizando ID numérico inexistente
- Buscar usuário sem informar ID
- Buscar usuário utilizando ID negativo
- Excluir usuário utilizando ID inexistente ou inválido
- Criar usuário sem os campos obrigatórios esperados

**Empresas**
- Buscar empresa utilizando ID apenas com letras
- Buscar empresa utilizando ID com números e letras
- Buscar empresa utilizando ID com números e caracteres especiais
- Buscar empresa utilizando ID apenas com caracteres especiais
- Buscar empresa utilizando ID numérico inexistente
- Buscar empresa sem informar ID
- Buscar empresa utilizando ID negativo
- Excluir empresa utilizando ID inexistente ou inválido

</details>

### Resultado da Suíte

A estrutura atual da suíte contém:

| Tipo de Teste | Quantidade |
|---|---:|
| FrontEnd / UI | 30 |
| API / BackEnd | 27 |
| **Total** | **57** |

Este projeto foi originalmente desenvolvido como parte de um **teste técnico**, utilizando uma aplicação, documentação e massa de dados disponibilizadas naquele contexto.

A versão atualmente mantida no repositório preserva a suíte histórica e executa a aplicação através de um ambiente Docker reconstruído a partir dos arquivos disponíveis no projeto. Como a documentação e a massa de dados completas do ambiente original não estão mais disponíveis, determinadas validações históricas podem apresentar resultados diferentes dos observados durante a execução original.

Por esse motivo, os resultados funcionais da suíte são mantidos nos relatórios e evidências gerados pelo Cypress, sem que seja necessário modificar as assertions históricas apenas para alterar o resultado da execução.

<br>

# Passos para Configurar e Reproduzir o Projeto

Siga o guia abaixo para clonar, configurar o ambiente Docker e executar a suíte de testes automatizados em sua máquina local.

---

## Pré-requisitos

Certifique-se de possuir as seguintes ferramentas instaladas em seu ambiente:

- [Docker](https://www.docker.com/) com suporte ao Docker Compose
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- Editor de código de sua preferência, como [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) — opcional para execução manual das requisições de API

---

## Obtendo o Código do Projeto

Você pode obter os arquivos do projeto de duas formas.

### Opção A: Clonando via Git (Recomendado)

Abra o terminal e execute o comando abaixo:

```bash
git clone https://github.com/FabioGVL/ContatoSeguro-Cypress.git
```

Em seguida, navegue para dentro da pasta do projeto:

```bash
cd ContatoSeguro-Cypress
```

### Opção B: Baixando via ZIP

1. Acesse a página do repositório no GitHub.
2. Clique no botão verde **Code**.
3. Selecione **Download ZIP**.
4. Extraia o conteúdo do arquivo compactado em uma pasta no seu computador.
5. Abra o VS Code.
6. Acesse **Arquivo > Abrir Pasta** e selecione a pasta descompactada.

---

## Configurando o Ambiente Docker

A aplicação utiliza Docker Compose para inicializar os serviços necessários para a execução dos testes.

Acesse a pasta do ambiente:

```bash
cd Ambiente
```

Construa e inicialize os containers:

```bash
docker compose up --build -d
```

Após a inicialização, os serviços estarão disponíveis nos seguintes endereços:

| Serviço | Endereço |
|---|---|
| FrontEnd | `http://localhost:5400` |
| API / BackEnd | `http://localhost:8400` |
| MySQL | `localhost:3400` |

Para consultar o estado dos containers:

```bash
docker compose ps
```

Para encerrar o ambiente:

```bash
docker compose down
```

Após iniciar o ambiente, retorne à raiz do projeto antes de executar os comandos do Cypress:

```bash
cd ..
```

---

## Instalando as Dependências

Na raiz do projeto, execute:

```bash
npm install
```

Esse comando instala o Cypress e as demais dependências declaradas no `package.json`, incluindo as bibliotecas utilizadas para geração de dados e relatórios.

---

## Executando os Testes

O projeto suporta execução interativa e execução completa em modo headless.

### Cypress Interativo

Para abrir a interface do Cypress:

```bash
npx cypress open
```

Em seguida:

1. Selecione **E2E Testing**.
2. Escolha o navegador desejado.
3. Selecione a spec que deseja executar.

### Execução Headless

Para executar toda a suíte:

```bash
npx cypress run
```

Também é possível utilizar o script configurado no `package.json`:

```bash
npm test
```

Durante a execução headless, o Cypress pode gerar relatórios, screenshots e vídeos utilizados como evidências dos testes.

---

## Executando Requisições Manualmente com Postman

Com o ambiente Docker em execução, a API estará disponível em:

```text
http://localhost:8400
```

### Consulta de Usuários e Empresas

**GET**

```text
/api/user
/api/user/{id}
/api/company
/api/company/{id}
```

### Criação de Usuário

**POST**

```text
/api/user/create
```

Exemplo de payload:

```json
{
  "name": "string",
  "e-mail": "string",
  "companies": ["string"]
}
```

### Criação de Empresa

**POST**

```text
/api/company/create
```

Exemplo de payload:

```json
{
  "name": "string",
  "cnpj": "string",
  "adress": {
    "cep": "string",
    "country": "string",
    "city": "string",
    "street_location": "string",
    "number": "string",
    "district": "string"
  }
}
```

### Atualização de Usuário

**PATCH**

```text
/api/user/{id}/update
```

Exemplo de payload:

```json
{
  "name": "string",
  "e-mail": "string",
  "companies": ["string"]
}
```

### Atualização de Empresa

**PATCH**

```text
/api/company/{id}/update
```

Exemplo de payload:

```json
{
  "name": "string",
  "cnpj": "string",
  "adress": {
    "cep": "string",
    "country": "string",
    "state": "string",
    "city": "string",
    "street": "string",
    "number": "string",
    "district": "string"
  }
}
```

### Exclusão de Usuário e Empresa

**DELETE**

```text
/api/user/{id}/delete
/api/company/{id}/delete
```

---

## Relatórios e Evidências

O projeto utiliza o `cypress-mochawesome-reporter` para geração de relatórios da execução automatizada.

Os arquivos de relatório são armazenados dentro de:

```text
cypress/reports/
```

O Cypress também pode gerar evidências adicionais em:

```text
cypress/screenshots/
cypress/videos/
```

Nas execuções realizadas pelo **GitHub Actions**, relatórios, screenshots e vídeos são publicados como artifact do workflow e permanecem disponíveis para análise após a conclusão da pipeline.

Como este repositório preserva uma suíte histórica de um teste técnico, falhas funcionais do Cypress são mantidas nos relatórios e evidências e não bloqueiam a conclusão do workflow. Problemas relacionados à própria infraestrutura do CI, como falha na construção do ambiente Docker ou indisponibilidade da aplicação, continuam causando falha na execução.

---

## Integração Contínua

O projeto utiliza **GitHub Actions** para executar automaticamente a suíte de testes.

O workflow é acionado em:

- Push para a branch `main`
- Pull Request direcionado para a branch `main`

Durante a execução, a pipeline:

1. Obtém o código do repositório.
2. Constrói e inicializa o ambiente Docker.
3. Configura o ambiente Node.js utilizado pelo runner de testes.
4. Aguarda a aplicação responder em `http://localhost:5400`.
5. Executa a suíte Cypress.
6. Publica relatórios, screenshots e vídeos como artifact.
7. Registra o resultado da etapa Cypress no resumo da execução.
8. Encerra os serviços Docker, inclusive quando etapas anteriores apresentam falha.

### Comportamento do Pipeline

A infraestrutura do CI permanece **bloqueante**. Caso o ambiente Docker não seja construído corretamente ou a aplicação não fique disponível dentro do período de espera, o workflow é marcado como falho.

A execução da suíte Cypress é tratada como **non-blocking** neste projeto histórico. Caso um ou mais testes funcionais falhem, a etapa registra o resultado, as evidências continuam sendo publicadas e o workflow pode ser concluído com sucesso.

Dessa forma, o status do workflow representa que a esteira de CI/CD foi executada corretamente do início ao fim, enquanto o resultado funcional da suíte permanece disponível no relatório gerado pela execução.

---

## Ambiente Registrado no Desenvolvimento Original

As seguintes versões estavam documentadas no README original do projeto:

- Cypress v10.11.0
- Node.js v20.15.0
- Docker v26.1.4
- Google Chrome v126.0.6478.126
- Windows 11 v23H2
- Linux / Ubuntu
- MySQL v8.0.37
- Postman v11.2.0
- Git

O ambiente atualmente versionado no repositório utiliza containers e versões próprias para reprodução automatizada, portanto essas versões representam o ambiente registrado durante o desenvolvimento original e não necessariamente os componentes utilizados pelo workflow atual.

---

## Resumo dos Comandos

| Objetivo | Comando |
|---|---|
| Clonar o repositório | `git clone https://github.com/FabioGVL/ContatoSeguro-Cypress.git` |
| Acessar o ambiente Docker | `cd Ambiente` |
| Construir e iniciar o ambiente | `docker compose up --build -d` |
| Consultar os containers | `docker compose ps` |
| Encerrar o ambiente | `docker compose down` |
| Instalar dependências Cypress | `npm install` |
| Abrir Cypress interativo | `npx cypress open` |
| Executar toda a suíte | `npx cypress run` |
| Executar através do script npm | `npm test` |
