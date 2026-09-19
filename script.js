// ================================
// CONFIGURAÇÃO DA IA
// ================================

// ATENÇÃO:
// Não coloque uma API Key real no frontend
// quando o projeto for publicado.
//
// Durante os testes locais, você pode usar
// temporariamente sua chave aqui.

let API_KEY = localStorage.getItem("apiKey") || "";

// ========================================
// NOME DO DEPLOYMENT
// ========================================
//
// IMPORTANTE:
//
// Aqui entra o NOME DA IMPLANTAÇÃO
// que você criou no Azure.
//
// Exemplo:
//
// const DEPLOYMENT_NAME = "codefix-gpt";
//
// NÃO coloque necessariamente:
//
// "gpt-5.2"
//
// O valor correto é o nome do seu deployment.

let DEPLOYMENT_NAME = localStorage.getItem("deployment") || "";

// ========================================
// ENDPOINT DO PROJETO
// ========================================

let PROJECT_ENDPOINT = localStorage.getItem("endpoint") || "";


// ========================================
// ELEMENTOS DO SITE
// ========================================

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const newChatButton =
    document.getElementById("newChatButton");

const conversation =
    document.getElementById("conversation");

const welcome =
    document.getElementById("welcome");

const chatList =
    document.getElementById("chatList");

const lightThemeButton =
    document.getElementById("lightTheme");

const darkThemeButton =
    document.getElementById("darkTheme");

const menuButton =
    document.getElementById("menuButton");


// ================================
// DADOS DOS CHATS
// ================================

let chats = [];

let currentChat = null;


// ================================
// CRIAR NOVO CHAT
// ================================

function createNewChat() {

    document
        .querySelector(".main")
        .classList
        .remove("chat-active");


    const newChat = {

        id: Date.now(),

        title: "Novo chat",

        messages: []

    };


    chats.push(newChat);

    currentChat = newChat;


    renderChats();

    clearConversation();

    showWelcome();

    messageInput.focus();

}


// ================================
// MOSTRAR CHATS NA SIDEBAR
// ================================

function renderChats() {

    chatList.innerHTML = "";


    chats.forEach(chat => {

        const chatElement =
            document.createElement("div");


        chatElement.classList.add(
            "chat-item"
        );


        if (
            currentChat &&
            chat.id === currentChat.id
        ) {

            chatElement.classList.add(
                "active"
            );

        }


        chatElement.textContent =
            chat.title;


        chatElement.addEventListener(
            "click",
            () => {

                openChat(chat.id);

            }
        );


        chatList.appendChild(
            chatElement
        );

    });

}


// ================================
// ABRIR UM CHAT
// ================================

function openChat(chatId) {

    const chat =
        chats.find(
            chat => chat.id === chatId
        );


    if (!chat) return;


    currentChat = chat;


    renderChats();

    clearConversation();


    if (chat.messages.length === 0) {

        showWelcome();

        return;

    }


    hideWelcome();


    chat.messages.forEach(message => {

        if (
            message.type === "user"
        ) {

            addMessageToScreen(
                message.text,
                "user"
            );

        } else {

            addAIResponseToScreen(
                message
            );

        }

    });

}


// ================================
// LIMPAR CONVERSA DA TELA
// ================================

function clearConversation() {

    conversation.innerHTML = "";

}


// ================================
// MOSTRAR WELCOME
// ================================

function showWelcome() {

    welcome.style.display = "flex";

}


// ================================
// ESCONDER WELCOME
// ================================

function hideWelcome() {

    welcome.style.display = "none";

}


// ================================
// ADICIONAR MENSAGEM NA TELA
// ================================

function addMessageToScreen(
    text,
    type
) {

    if (type === "user") {

        const message =
            document.createElement("div");


        message.classList.add(
            "message",
            "user"
        );


        message.textContent =
            text;


        conversation.appendChild(
            message
        );

    } else {

        const response =
            document.createElement("div");


        response.classList.add(
            "ai-response"
        );


        response.innerHTML = `

            <div class="ai-header">

                <div class="ai-badge">
                    CF
                </div>

                <div class="confidence">
                    ⚙ CodeFix AI
                </div>

            </div>

            <div class="ai-text">
                ${escapeHtml(text)}
            </div>

        `;


        conversation.appendChild(
            response
        );

    }


    conversation.scrollTop =
        conversation.scrollHeight;

}


// ================================
// RECONSTRUIR RESPOSTA DA IA
// ================================

function addAIResponseToScreen(
    response
) {

    const responseElement =
        document.createElement("div");


    responseElement.classList.add(
        "ai-response"
    );


    responseElement.innerHTML = `

        <div class="ai-header">

            <div class="ai-badge">
                CF
            </div>

            <div class="confidence">
                ⚙ Bug encontrado · Alta confiança
            </div>

        </div>


        <div class="ai-text">
            ${escapeHtml(
                response.text || ""
            )}
        </div>


        <div class="code-card">

            <div class="code-header">

                <span>
                    ${escapeHtml(
                        response.language || "Code"
                    )}
                </span>

                <div class="code-actions">

                    <span>▣ Copy</span>

                    <span>↓ Download</span>

                </div>

            </div>


            <pre><code>${escapeHtml(
                response.code || ""
            )}</code></pre>

        </div>


        <div class="diff-container">

            <div class="diff-title">
                DIFF VIEWER
            </div>


            <div class="diff-card">

                <div class="diff-line diff-remove">
                    - ${escapeHtml(
                        response.oldCode || ""
                    )}
                </div>


                <div class="diff-line diff-add">
                    + ${escapeHtml(
                        response.newCode || ""
                    )}
                </div>

            </div>

        </div>

    `;


    conversation.appendChild(
        responseElement
    );


    conversation.scrollTop =
        conversation.scrollHeight;

}


// ================================
// ENVIAR MENSAGEM
// ================================

function sendMessage() {

    const text =
        messageInput.value.trim();


    // Não envia mensagem vazia

    if (text === "") {

        return;

    }


    document
        .querySelector(".main")
        .classList
        .add("chat-active");


    // Caso não exista um chat

    if (!currentChat) {

        createNewChat();

    }


    // Primeira mensagem define
    // o tema do chat

    if (
        currentChat.messages.length === 0
    ) {

        currentChat.title =
            generateChatTitle(text);

    }


    // Salva mensagem do usuário

    currentChat.messages.push({

        text: text,

        type: "user"

    });


    hideWelcome();


    addMessageToScreen(
        text,
        "user"
    );


    messageInput.value = "";


    renderChats();


    // Envia mensagem para a IA

    generateAIResponse(text);

}


// ================================
// GERAR NOME DO CHAT
// ================================

function generateChatTitle(text) {

    const lowerText =
        text.toLowerCase();


    if (
        lowerText.includes("python")
    ) {

        return "Correção de Python";

    }


    if (
        lowerText.includes("javascript") ||
        lowerText.includes("js")
    ) {

        return "Análise de JavaScript";

    }


    if (
        lowerText.includes("erro") ||
        lowerText.includes("error")
    ) {

        return "Análise de erro";

    }


    if (
        lowerText.includes("bug") ||
        lowerText.includes("bugs")
    ) {

        return "Correção de bug";

    }


    if (
        lowerText.includes("html") ||
        lowerText.includes("css")
    ) {

        return "Análise de interface";

    }


    if (
        lowerText.includes("código") ||
        lowerText.includes("codigo")
    ) {

        return "Análise de código";

    }


    return "Análise de código";

}


// ================================
// RESPOSTA DA IA
// ================================

async function generateAIResponse(
    userText
) {

    try {

        // ====================================
        // HISTÓRICO DA CONVERSA
        // ====================================

        const messages =
            currentChat.messages.map(
                message => ({

                    role:
                        message.type === "user"
                            ? "user"
                            : "assistant",

                    content:
                        message.text

                })
            );


        // ====================================
// ENDPOINT FINAL
// ====================================

const endpoint =
    `${PROJECT_ENDPOINT}/openai/v1/chat/completions`;


console.log(
    "Endpoint:",
    endpoint
);


console.log(
    "Deployment:",
    DEPLOYMENT_NAME
);


// ====================================
// SYSTEM PROMPT
// ====================================

const systemPrompt = [

    "Você é o CodeFix AI, um assistente especializado em programação.",

    "",

    "Analise o código enviado pelo usuário, encontre possíveis erros, explique o problema de forma clara e forneça uma solução.",

    "",

    "Sempre responda EXATAMENTE em JSON válido, sem markdown e sem texto fora do JSON.",

    "",

    "Use este formato:",

    "",

    "{",

    '    "text": "explicação do problema e da solução",',

    '    "language": "linguagem do código",',

    '    "code": "código corrigido",',

    '    "oldCode": "trecho original com problema",',

    '    "newCode": "trecho corrigido"',

    "}",

    "",

    "Se o usuário não enviar código, explique o que está faltando e deixe code, oldCode e newCode como strings vazias."

].join("\n");


// ====================================
// ENVIAR PARA A API
// ====================================
console.log("ENDPOINT FINAL:", endpoint);
console.log("DEPLOYMENT:", DEPLOYMENT_NAME);

const response =
    await fetch(
        endpoint,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "api-key": API_KEY
            },

            body:
                JSON.stringify({
                    model:
                        DEPLOYMENT_NAME,

                    messages: [
                        {
                            role:
                                "system",

                            content:
                                systemPrompt
                        },

                        ...messages
                    ],

                    max_completion_tokens:
                        4096
                })
        }
    );
        // ====================================
        // VERIFICAR RESPOSTA HTTP
        // ====================================

        if (!response.ok) {

            const error =
                await response.text();


            console.error(
                "Resposta da API:",
                error
            );


            throw new Error(
                `Erro ${response.status}: ${error}`
            );

        }


        // ====================================
        // TRANSFORMAR RESPOSTA EM JSON
        // ====================================

        const data =
            await response.json();


        console.log(
            "Resposta recebida:",
            data
        );


        // ====================================
        // PEGAR TEXTO DA IA
        // ====================================

        const aiText =
            data
                .choices[0]
                .message
                .content;


        // ====================================
        // CONVERTER JSON DA IA
        // ====================================

        let aiResponse;


        try {

            aiResponse =
                JSON.parse(aiText);

        } catch (error) {

            console.error(
                "A IA não retornou JSON válido:",
                aiText
            );


            aiResponse = {

                text:
                    aiText,

                language:
                    "Code",

                code:
                    "",

                oldCode:
                    "",

                newCode:
                    ""

            };

        }


        // ====================================
        // MOSTRAR RESPOSTA NA TELA
        // ====================================

        addAIResponseToScreen(
            aiResponse
        );


        // ====================================
        // SALVAR RESPOSTA NO CHAT
        // ====================================

        currentChat.messages.push({

            text:
                aiResponse.text || "",

            type:
                "ai",

            language:
                aiResponse.language || "Code",

            code:
                aiResponse.code || "",

            oldCode:
                aiResponse.oldCode || "",

            newCode:
                aiResponse.newCode || ""

        });


        renderChats();


    } catch (error) {

        console.error(
            "Erro ao consultar a API:",
            error
        );


        addMessageToScreen(

            "Não foi possível conectar com a IA. Verifique o endpoint, o deployment, a autenticação e o console do navegador.",

            "ai"

        );

    }

}


// ================================
// ESCAPAR HTML
// ================================

function escapeHtml(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text ?? "";


    return div.innerHTML;

}


// ================================
// BOTÃO ENVIAR
// ================================

sendButton.addEventListener(
    "click",
    sendMessage
);


// ================================
// ENTER PARA ENVIAR
// ================================

messageInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


// ================================
// NOVO CHAT
// ================================

newChatButton.addEventListener(
    "click",
    createNewChat
);


// ================================
// TEMA CLARO E ESCURO
// ================================

function setTheme(theme) {

    if (theme === "dark") {

        document.body
            .classList
            .add("dark-theme");


        localStorage.setItem(
            "codefix-theme",
            "dark"
        );

    } else {

        document.body
            .classList
            .remove("dark-theme");


        localStorage.setItem(
            "codefix-theme",
            "light"
        );

    }

}


// ================================
// BOTÃO TEMA CLARO
// ================================

lightThemeButton.addEventListener(
    "click",
    function() {

        setTheme("light");

    }
);


// ================================
// BOTÃO TEMA ESCURO
// ================================

darkThemeButton.addEventListener(
    "click",
    function() {

        setTheme("dark");

    }
);


// ================================
// RECUPERAR TEMA SALVO
// ================================

const savedTheme =
    localStorage.getItem(
        "codefix-theme"
    );


if (
    savedTheme === "dark"
) {

    setTheme("dark");

} else {

    setTheme("light");

}


// ================================
// MENU RESPONSIVO
// ================================

menuButton.addEventListener(
    "click",
    function() {

        const sidebar =
            document.querySelector(
                ".sidebar"
            );


        sidebar.classList.toggle(
            "sidebar-open"
        );

    }
);


// ================================
// COPY DO CÓDIGO
// ================================

document.addEventListener(
    "click",
    async function(event) {

        const copyButton =
            event.target.closest(
                ".code-actions span"
            );


        if (!copyButton) {

            return;

        }


        if (
            !copyButton.textContent
                .includes("Copy")
        ) {

            return;

        }


        const codeCard =
            copyButton.closest(
                ".code-card"
            );


        if (!codeCard) {

            return;

        }


        const codeElement =
            codeCard.querySelector(
                "code"
            );


        if (!codeElement) {

            return;

        }


        const code =
            codeElement.textContent;


        try {

            await navigator
                .clipboard
                .writeText(code);


            const originalText =
                copyButton.textContent;


            copyButton.textContent =
                "✓ Copied";


            setTimeout(
                function() {

                    copyButton.textContent =
                        originalText;

                },
                1500
            );


        } catch (error) {

            console.error(
                "Erro ao copiar código:",
                error
            );

        }

    }
);


// ================================
// DOWNLOAD DO CÓDIGO
// ================================

document.addEventListener(
    "click",
    function(event) {

        const downloadButton =
            event.target.closest(
                ".code-actions span"
            );


        if (!downloadButton) {

            return;

        }


        if (
            !downloadButton.textContent
                .includes("Download")
        ) {

            return;

        }


        const codeCard =
            downloadButton.closest(
                ".code-card"
            );


        if (!codeCard) {

            return;

        }


        const codeElement =
            codeCard.querySelector(
                "code"
            );


        if (!codeElement) {

            return;

        }


        const code =
            codeElement.textContent;


        const languageElement =
            codeCard.querySelector(
                ".code-header > span"
            );


        const language =
            languageElement

                ? languageElement
                    .textContent
                    .trim()
                    .toLowerCase()

                : "code";


        let extension = "txt";


        if (
            language.includes("python")
        ) {

            extension = "py";

        }

        else if (
            language.includes("javascript")
        ) {

            extension = "js";

        }

        else if (
            language.includes("html")
        ) {

            extension = "html";

        }

        else if (
            language.includes("css")
        ) {

            extension = "css";

        }

        else if (
            language.includes("java")
        ) {

            extension = "java";

        }


        const blob =
            new Blob(

                [code],

                {
                    type: "text/plain"
                }

            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            `codefix-code.${extension}`;


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        URL.revokeObjectURL(
            url
        );

    }
);

// ========================================
// CONFIGURAÇÃO DA IA
// ========================================

const configButton =
    document.getElementById("configButton");

const configPanel =
    document.getElementById("configPanel");

const configClose =
    document.getElementById("configClose");

const saveConfigButton =
    document.getElementById("saveConfigButton");

const apiKeyInput =
    document.getElementById("apiKeyInput");

const endpointInput =
    document.getElementById("endpointInput");

const deploymentInput =
    document.getElementById("deploymentInput");

const configStatus =
    document.getElementById("configStatus");


// ========================================
// ABRIR CONFIGURAÇÃO
// ========================================

configButton.addEventListener("click", () => {

    apiKeyInput.value =
        localStorage.getItem("apiKey") || "";

    endpointInput.value =
        localStorage.getItem("endpoint") || "";

    deploymentInput.value =
        localStorage.getItem("deployment") || "";

    configStatus.textContent = "";

    configPanel.classList.add("active");

});


// ========================================
// FECHAR CONFIGURAÇÃO
// ========================================

configClose.addEventListener("click", () => {

    configPanel.classList.remove("active");

});


// ========================================
// FECHAR CLICANDO FORA
// ========================================

configPanel.addEventListener("click", (event) => {

    if (event.target === configPanel) {

        configPanel.classList.remove("active");

    }

});


// ========================================
// SALVAR CONFIGURAÇÃO
// ========================================

saveConfigButton.addEventListener("click", () => {

    const apiKey =
        apiKeyInput.value.trim();

    const endpoint =
        endpointInput.value.trim();

    const deployment =
        deploymentInput.value.trim();


    if (!apiKey || !endpoint || !deployment) {

        configStatus.textContent =
            "Preencha todos os campos.";

        return;

    }


    localStorage.setItem(
        "apiKey",
        apiKey
    );

    localStorage.setItem(
        "endpoint",
        endpoint
    );

    localStorage.setItem(
        "deployment",
        deployment
    );


    configStatus.textContent =
        "Configuração salva com sucesso.";

    API_KEY = apiKey;
    PROJECT_ENDPOINT = endpoint;
    DEPLOYMENT_NAME = deployment;      

});

// ================================
// INICIAR SITE
// ================================

createNewChat();
