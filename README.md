# CodeFix AI

> Um assistente de IA para desenvolvedores que ajuda a analisar, explicar e corrigir problemas em código.

## 📌 Sobre o projeto

O **CodeFix AI** é um projeto desenvolvido para criar uma experiência de assistência à programação utilizando **Inteligência Artificial**.

A proposta é permitir que o usuário descreva um problema, envie um trecho de código ou faça uma pergunta relacionada à programação, e receba uma resposta da IA diretamente na interface do aplicativo.

O projeto possui uma interface inspirada em ambientes modernos de desenvolvimento, com foco em simplicidade, organização e facilidade de uso.

---

## ✨ Funcionalidades

- 💬 Interface de chat para interação com a IA
- 🤖 Integração com Azure OpenAI
- 🐛 Análise e explicação de problemas em código
- 💡 Sugestões de possíveis soluções
- 📋 Suporte para envio de código diretamente pelo chat
- 🌓 Tema claro e escuro
- 💾 Histórico de conversas na interface
- ⚙️ Configuração das credenciais da API através do navegador
- 📱 Interface adaptável para diferentes tamanhos de tela

---

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura da aplicação
- **CSS3** — estilização e layout
- **JavaScript** — lógica da aplicação e integração com a API
- **Azure OpenAI** — modelo de inteligência artificial utilizado pelo projeto
- **LocalStorage** — armazenamento local das configurações da API

O projeto foi desenvolvido utilizando **JavaScript puro**, sem frameworks ou bibliotecas externas obrigatórias.

---

## 🧠 Como funciona

O CodeFix AI utiliza uma requisição HTTP para se comunicar com a API do Azure OpenAI.

O fluxo básico da aplicação é:

```text
Usuário
   ↓
Interface do CodeFix AI
   ↓
JavaScript
   ↓
Azure OpenAI API
   ↓
Resposta da IA
   ↓
Interface do CodeFix AI