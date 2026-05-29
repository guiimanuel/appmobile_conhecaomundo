# Conheça o Mundo

Aplicativo mobile feito com **React Native + Expo** para explorar países, buscar por nome e visualizar detalhes como bandeira, região, capital, população, idiomas, moedas e continente.

## Funcionalidades

- Listagem de países consumindo a API [REST Countries](https://restcountries.com/)
- Busca por nome do país
- Navegação entre tela inicial e tela de detalhes
- Pull-to-refresh para recarregar a lista

## Tecnologias

- React Native
- Expo
- React Navigation (Native Stack)
- Axios

## Pré-requisitos

- Node.js 18+ (recomendado)
- npm
- Expo CLI (via `npx expo`)

## Instalação

```bash
npm install
```

## Como executar

### Desenvolvimento (dev client)

```bash
npm start
```

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

### Web

```bash
npm run web
```

## Estrutura principal

```text
src/
  App.js
  components/
    PaisItem/
  routes/
  screens/
    Home/
    Detalhes/
```

## Observações

- O projeto utiliza a **new architecture** do React Native via configuração do Expo (`newArchEnabled: true`).
- O bundle/package identifier está configurado como `br.com.guimanuel.conhecaomundo` para Android e iOS.
