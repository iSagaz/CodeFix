# CodeFix AI

> Um assistente de IA para desenvolvedores que ajuda a analisar, explicar e corrigir problemas em código.

## 📌 Sobre o projeto

O **CodeFix AI** é um projeto desenvolvido para criar uma experiência de assistência à programação utilizando **Inteligência Artificial**.

A proposta é permitir que o usuário descreva um problema, envie um trecho de código ou faça uma pergunta relacionada à programação, e receba uma resposta da IA diretamente na interface do aplicativo.

O projeto possui uma interface inspirada em ambientes modernos de desenvolvimento, com foco em simplicidade, organização e facilidade de uso.

O CodeFix AI utiliza **HTML, CSS e JavaScript** para construir e controlar a aplicação, enquanto a comunicação com a inteligência artificial é realizada através da **API do Azure OpenAI**.

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

- **HTML5** — responsável pela estrutura dos elementos da aplicação
- **CSS3** — responsável pela aparência, layout, temas e organização visual
- **JavaScript** — responsável pela lógica da aplicação, interação com a interface e comunicação com a API
- **Azure OpenAI** — serviço utilizado para realizar a comunicação com modelos de inteligência artificial
- **LocalStorage** — utilizado para armazenar localmente as configurações fornecidas pelo usuário

O projeto foi desenvolvido utilizando **JavaScript puro**, sem frameworks ou bibliotecas externas obrigatórias.

---

## 🧠 Como funciona

O CodeFix AI funciona como uma aplicação frontend que utiliza JavaScript para conectar a interface do usuário à API do Azure OpenAI.

O fluxo básico da aplicação é:

```text
Usuário
   ↓
Interface do CodeFix AI
   ↓
JavaScript
   ↓
API do Azure OpenAI
   ↓
Modelo de IA
   ↓
Resposta da IA
   ↓
JavaScript
   ↓
Interface do CodeFix AI