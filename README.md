# Centralia - Community Club - Projeto feito com React e Firebase.

Este é um projeto de aplicação web utilizando React, com integração com o Firebase. Siga as etapas abaixo para rodar o projeto localmente.

## Requisitos

Antes de começar, verifique se você tem os seguintes itens instalados:

- [Node.js]
- [Git]

## 1. Clonando o repositório

Primeiro, clone o repositório:

git clone https://github.com/seu-usuario/centralia.git
cd centralia
rode: 
npm install

## 2. Acessendo o firebase

Crie um arquivo.env para passar suas credenciais do firebase:

VITE_FIREBASE_API_KEY=suachaveapikey
VITE_FIREBASE_AUTH_DOMAIN=seuprojeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seuprojeto-id
VITE_FIREBASE_STORAGE_BUCKET=seuprojeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-messaging-id
VITE_FIREBASE_APP_ID=seu-app-id
VITE_FIREBASE_MEASUREMENT_ID=seu-measurement-id

## 3. Rode o projeto localmente com:
npm run dev
