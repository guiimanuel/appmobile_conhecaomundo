<div align="center">

# 🌍 Conheça o Mundo

**Aplicativo mobile para explorar países do mundo inteiro**

[![React Native](https://img.shields.io/badge/React%20Native-0.83.6-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-55.0.25-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.x-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/github/license/guiimanuel/appmobile_conhecaomundo?style=flat-square&color=0080ff)](./LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/guiimanuel/appmobile_conhecaomundo?style=flat-square&color=0080ff)](https://github.com/guiimanuel/appmobile_conhecaomundo/commits/main)

</div>

---

## 📖 Visão Geral

**Conheça o Mundo** é um aplicativo mobile multiplataforma desenvolvido com **React Native + Expo** que permite aos usuários explorar informações detalhadas sobre países de todo o globo. Com uma interface intuitiva, é possível pesquisar países, salvar favoritos e gerenciar um perfil personalizado — tudo com autenticação segura via Firebase.

### Por que este projeto?

- Centraliza informações geográficas e culturais de países em um só lugar
- Oferece uma experiência de descoberta fluida com navegação por abas
- Permite personalização através de perfil de usuário com foto e dados editáveis
- Funciona tanto em Android quanto em iOS a partir de uma única base de código

---

## ✨ Funcionalidades

- 🔐 **Autenticação completa** — login, cadastro e recuperação de senha via Firebase
- 🏠 **Home Screen** — listagem e pesquisa de países em tempo real via API
- 🗺️ **Detalhes de País** — informações detalhadas como capital, bandeira, população e região
- ⭐ **Favoritos** — salve e gerencie seus países preferidos com persistência local
- 👤 **Perfil de Usuário** — visualize e edite nome, foto e senha da conta
- 📸 **Troca de Foto** — atualize a foto de perfil diretamente pelo app
- 🎨 **Design consistente** — sistema de cores e fontes customizadas via Expo Font
- 📱 **Navegação por abas** — Bottom Tabs com ícones da biblioteca `@expo/vector-icons`

---

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|-----------|-----------|
| Framework Mobile | React Native 0.83.6 |
| Plataforma | Expo ~55.0.25 |
| Linguagem | JavaScript (ES2023) |
| Autenticação & Backend | Firebase 12.x |
| Navegação | React Navigation 7.x (Native Stack + Bottom Tabs) |
| HTTP Client | Axios 1.x |
| Armazenamento Local | AsyncStorage 2.2.0 |
| Ícones | @expo/vector-icons 15.x |
| Fontes | expo-font |
| Build Tool | EAS CLI |

---

## 📁 Estrutura do Projeto

```
appmobile_conhecaomundo/
├── App.js                      # Entrada principal do app
├── app.json                    # Configurações do Expo
├── metro.config.js             # Configuração do bundler Metro
├── package.json
│
├── src/
│   ├── index.js                # Registro do app
│   ├── assets/                 # Imagens, ícones e recursos estáticos
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── BottomTabs.js       # Navegação por abas inferior
│   │   ├── ScreenHeader.js     # Header padrão de telas
│   │   ├── colors.js           # Paleta de cores do design system
│   │   └── expoFonts.js        # Carregamento de fontes customizadas
│   │
│   ├── screens/                # Telas do aplicativo
│   │   ├── homeScreen.js       # Listagem e busca de países
│   │   ├── countryScreen.js    # Detalhes de um país
│   │   ├── favoriteScreen.js   # Lista de países favoritos
│   │   ├── loginScreen.js      # Tela de login
│   │   ├── SignUpScreen.js     # Tela de cadastro
│   │   ├── profileScreen.js    # Perfil do usuário
│   │   ├── ProfileEditScreen.js # Edição de dados do perfil
│   │   ├── PasswordEditScreen.js # Troca de senha
│   │   └── ChangePhotoScreen.js  # Troca de foto de perfil
│   │
│   └── utils/                  # Serviços e utilitários
│       ├── countriesService.js # Integração com API de países
│       └── favoriteService.js  # Gerenciamento de favoritos (AsyncStorage)
│
├── android/                    # Configurações nativas Android
└── ios/                        # Configurações nativas iOS
```

---

## 🚀 Como Executar

### Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) ou yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/go) no dispositivo físico **ou** emulador Android/iOS configurado

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/guiimanuel/appmobile_conhecaomundo.git

# 2. Acesse a pasta do projeto
cd appmobile_conhecaomundo

# 3. Instale as dependências
npm install
```

### Configuração do Firebase

Antes de rodar o app, configure suas credenciais do Firebase:

1. Crie um projeto em [console.firebase.google.com](https://console.firebase.google.com/)
2. Ative **Authentication** (Email/Senha) e **Firestore** (ou Realtime Database)
3. Adicione suas credenciais no arquivo de configuração do Firebase dentro do projeto

### Executando

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Rodar diretamente no Android
npm run android

# Rodar diretamente no iOS
npm run ios

# Rodar no navegador (web)
npm run web
```

Escaneie o QR Code exibido no terminal com o app **Expo Go** para visualizar no dispositivo físico.

---

## 📱 Telas

| Tela | Descrição |
|------|-----------|
| **Login** | Autenticação com email e senha via Firebase |
| **Cadastro** | Criação de nova conta |
| **Home** | Busca e listagem de países com dados da API |
| **País** | Detalhes completos: bandeira, capital, população, região |
| **Favoritos** | Países salvos pelo usuário com persistência local |
| **Perfil** | Dados da conta com opções de edição |
| **Editar Perfil** | Alteração de nome e informações pessoais |
| **Editar Senha** | Troca de senha com validação |
| **Trocar Foto** | Upload de nova foto de perfil |

---

## 🌐 API de Países

O app consome dados de uma API externa de países (via `countriesService.js` + Axios). Os dados exibidos incluem nome, bandeira, capital, região, sub-região, população e idiomas.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um **fork** do repositório
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Faça commit das alterações: `git commit -m 'feat: adiciona minha feature'`
4. Faça push para a branch: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido por **[guiimanuel](https://github.com/guiimanuel)**

---

<div align="center">

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!

</div>
