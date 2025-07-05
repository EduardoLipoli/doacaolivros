// firebaseConfig.js

// Sua configuração da web app do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0ZQUtt_dJlzcVGyP8D6nF2bGP3C1ycIE", // Sua chave de API
  authDomain: "doacaolivros.firebaseapp.com", // Seu domínio de autenticação
  projectId: "doacaolivros", // Seu ID de projeto
  storageBucket: "doacaolivros.firebasestorage.app", // Seu bucket de armazenamento
  messagingSenderId: "7195067882", // Seu ID de remetente de mensagens
  appId: "1:7195067882:web:ae692da02e95dd7c4b9e93" // Seu ID do aplicativo
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// CRIA AS VARIÁVEIS GLOBAIS PARA AUTH E FIRESTORE
// O seu arquivo index.js precisa delas.
const auth = firebase.auth();
const db = firebase.firestore();