# 🐛 CodeFix AI

### Assistente de programação com Inteligência Artificial

O **CodeFix AI** é uma aplicação web que utiliza inteligência artificial para auxiliar desenvolvedores durante o processo de programação.

A ferramenta funciona como um chatbot especializado em programação, permitindo enviar trechos de código, descrever problemas e realizar perguntas técnicas, recebendo explicações e sugestões de possíveis soluções diretamente na interface.

Desenvolvido com JavaScript puro e integrado ao Azure OpenAI, o projeto busca oferecer uma experiência simples, intuitiva e acessível para auxiliar no desenvolvimento de software.

## 🎯 Objetivo do projeto

Desenvolver um assistente de programação baseado em inteligência artificial, explorando a integração entre aplicações web e modelos de linguagem.

O projeto também tem como objetivo aplicar conhecimentos de desenvolvimento Front-End, consumo de APIs, armazenamento local e manipulação dinâmica de interfaces.

## ✨ Funcionalidades

- **Chat com IA:** interação direta com o assistente de programação.
- **Análise de código:** envio de trechos de código para análise.
- **Explicação de problemas:** auxílio na compreensão de erros e dificuldades de programação.
- **Sugestões de soluções:** recomendações para resolver problemas identificados.
- **Histórico de conversas:** armazenamento das mensagens na interface.
- **Tema claro e escuro:** alternância entre diferentes temas visuais.
- **Configuração da API:** gerenciamento das credenciais utilizadas pela aplicação.
- **Interface responsiva:** adaptação para diferentes tamanhos de tela.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| HTML5 | Estrutura da aplicação |
| CSS3 | Estilização e identidade visual |
| JavaScript | Lógica, interatividade e comunicação com a API |
| Azure OpenAI | Integração com inteligência artificial |
| LocalStorage | Armazenamento local de configurações |
| Git e GitHub | Versionamento e gerenciamento do projeto |

O projeto utiliza JavaScript puro, sem depender de frameworks Front-End.

## 🧠 Arquitetura e funcionamento

O CodeFix AI utiliza uma arquitetura baseada em uma interface web que se comunica diretamente com o serviço Azure OpenAI por meio de requisições HTTP.

### Fluxo de funcionamento

1. **Entrada do usuário:** o usuário envia uma pergunta, descreve um problema ou compartilha um trecho de código.
2. **Processamento no Front-End:** o JavaScript captura a mensagem e organiza os dados necessários para a requisição.
3. **Comunicação com a API:** a aplicação envia a solicitação ao Azure OpenAI.
4. **Processamento pela IA:** o modelo recebe o contexto e produz uma resposta.
5. **Retorno:** a resposta é recebida pela aplicação.
6. **Exibição:** o JavaScript atualiza a interface com a resposta gerada.

### Representação do fluxo

```text
       USUÁRIO
          |
          v
    INTERFACE WEB
       HTML/CSS
          |
          v
      JAVASCRIPT
          |
          v
    AZURE OPENAI API
          |
          v
   PROCESSAMENTO COM IA
          |
          v
      RESPOSTA
          |
          v
    INTERFACE DO CHAT
```

## 💾 Armazenamento local

A aplicação utiliza o `LocalStorage` do navegador para armazenar configurações localmente.

Isso permite manter determinadas informações entre sessões, sem depender de um banco de dados externo.

## 📂 Estrutura do projeto

```text
CodeFix/
│
├── index.html
├── style.css
├── script.js
├── exemplo.env
├── .gitignore
└── README.md
```

### Responsabilidade dos arquivos

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura da interface do chatbot |
| `style.css` | Estilização e organização visual |
| `script.js` | Lógica do chatbot e integração com a API |
| `exemplo.env` | Exemplo de configuração de variáveis |
| `.gitignore` | Arquivos e diretórios ignorados pelo Git |

## 🚀 Executando o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/iSagaz/CodeFix.git
```

### 2. Acesse a pasta

```bash
cd CodeFix
```

### 3. Abra a aplicação

Abra o arquivo `index.html` diretamente no navegador ou utilize a extensão Live Server no Visual Studio Code.

### 4. Configure a integração com IA

Configure as credenciais necessárias para a integração com Azure OpenAI, conforme as opções disponibilizadas pela aplicação.

**Atenção:** não compartilhe chaves de API publicamente. Credenciais utilizadas diretamente no navegador podem ser acessadas por quem utiliza a aplicação. Para uma implantação pública, o ideal é intermediar as requisições por um servidor Back-End.

## 📚 Aprendizados e conhecimentos aplicados

O desenvolvimento do CodeFix AI envolve conceitos importantes para aplicações que utilizam inteligência artificial:

- Desenvolvimento de interfaces com HTML e CSS.
- Manipulação do DOM com JavaScript.
- Consumo de APIs externas.
- Requisições HTTP.
- Manipulação de dados JSON.
- Armazenamento local com LocalStorage.
- Gerenciamento de eventos e interações.
- Integração com serviços de inteligência artificial.
- Organização de aplicações sem frameworks.

## 🔮 Possíveis melhorias futuras

- Implementação de um Back-End para intermediar as requisições.
- Histórico persistente de conversas.
- Suporte para diferentes linguagens de programação.
- Formatação e destaque de sintaxe dos códigos.
- Funcionalidade para copiar códigos gerados.
- Melhorias na análise e explicação de erros.

## 📌 Sobre o projeto

O CodeFix AI representa uma aplicação prática da integração entre desenvolvimento web e inteligência artificial.

Seu desenvolvimento permitiu explorar o consumo de APIs de IA, a manipulação dinâmica de interfaces e a criação de uma ferramenta voltada ao auxílio na programação.

---

**Desenvolvido por Enzo Sagaz**

[GitHub](https://github.com/iSagaz)
