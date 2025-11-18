# Projeto Móvel EcoFarm – Monitoramento de Umidade do Solo com Arduino, Flask e Expo

🌾 EcoFarm: Monitoramento de Umidade e Temperatura para Agronegócios

💡 Sobre o Projeto

O EcoFarm é um aplicativo móvel desenvolvido com React Native e Expo, focado em levar inteligência e precisão para o campo. Ele permite que produtores rurais monitorem em tempo real dados cruciais de umidade e temperatura em suas lavouras, armazéns e silos.

Objetivo: Reduzir perdas, otimizar o uso de recursos (como irrigação) e garantir a qualidade da safra através da tomada de decisões baseada em dados.

✨ Funcionalidades Principais

Monitoramento em Tempo Real: Visualização horária de umidade.

Gráficos Históricos: Análise de tendências e padrões climáticos ao longo do tempo.

🤝 Contribuição

Contribuições são sempre bem-vindas! Se você tiver sugestões, relatórios de bugs ou melhorias, por favor, abra uma issue ou envie um pull request.


Projeto desenvolvido para a disciplina de Programação de Dispositivos
Móveis com React Native + Expo.

Orientador: **Prof. Luiz Gustavo Turatti**

A solução apresentada consiste em um sistema de **monitoramento de
umidade do solo**, capaz de acionar automaticamente uma bomba d’água por
meio de um módulo relé.  
O Arduino coleta os dados, o Flask processa e disponibiliza via API, e o
aplicativo Expo exibe as informações ao usuário em tempo real.

------------------------------------------------------------------------

## 👥 Equipe do projeto

| RA               | Nome                           |
|------------------|--------------------------------|
| **202403019752** | **Pedro Adolfo Custodio Maia** |
| **202403503786** | **Isadora Geremias de Melo**   |

------------------------------------------------------------------------

## 📌 Sumário

1.  Requisitos  
2.  Configuração  
3.  Como testar o projeto  
4.  Estrutura do projeto  
5.  Executando o projeto  
6.  Telas do projeto

------------------------------------------------------------------------

# 🔧 Requisitos

### 🖥️ **Software necessário**

-   NodeJS LTS  
-   Expo CLI  
-   Expo Go  
-   Python 3.10+  
-   Flask  
-   Arduino IDE

### 🔌 **Hardware**

-   Arduino  
-   Sensor de umidade do solo  
-   Módulo relé  
-   Bomba d’água  
-   Jumpers e fonte

### 📚 **Bibliotecas**

#### Arduino

Nenhuma externa (somente Serial, analogRead, etc.)

#### 🐍 Python

    pip install flask flask-cors pyserial

#### 📦 React Native / Expo

    npm install
    npm install axios
    npx expo install react-native-safe-area-context react-native-chart-kit

------------------------------------------------------------------------

# 🧪 Como testar o projeto

## 1️⃣ Enviar o código para o Arduino

-   Abrir a Arduino IDE  
-   Carregar o arquivo `sketch_oct20a.ino`  
-   Enviar o código para o Arduino

## 2️⃣ Organizar os arquivos no projeto Expo

Antes de iniciar o backend e o aplicativo, é necessário colocar os
arquivos corretos dentro do Expo:

-   Abrir a pasta do projeto Expo  
-   Acessar a pasta `tabs/`  
-   Colocar **todos os arquivos das pastas `frontend` e `backend`**
    dentro da pasta `tabs/`  
    (📌 *exceto o arquivo `.ino`, que fica somente na Arduino IDE*)  
-   O arquivo **`index.tsx` deve ser substituído** pelo index fornecido
    no projeto

## 3️⃣ Rodar o backend Flask

    python main.py

## 4️⃣ Rodar o app Expo

    npx expo start

------------------------------------------------------------------------

# 📁 Estrutura do projeto

    EcoFarm/
├── apresentacao/
│ └── EcoFarm - Turatti.pdf
│
├── backend/
│ ├── main.py
│ └── sketch_oct20a.ino
│
├── documentacao/
│ ├── 01 - Carta de Apresentação - Turatti.docx
│ ├── Carta de Autorização - EcoFarm_signed.pdf
│ ├── 02 - Declaração de Uso de Dados Públicos - Turatti.docx
│ └── 03 - Roteiro de Extensão - Turatti.docx
│
├── frontend/
│ ├── Monitor.tsx
│ ├── app.tsx
│ └── index.tsx
│
├── video/
│ └── whatsapp-video-2025-11-14-at-212031_DgNEyAtT.mp4
│
└── README.md

------------------------------------------------------------------------

# 🚀 Execução rápida

1.  Upload do código Arduino  
2.  Rodar Flask  
3.  Rodar Expo

------------------------------------------------------------------------

# 📱 Telas do projeto

Os prints da tela do projeto estão na pasta documentacao
