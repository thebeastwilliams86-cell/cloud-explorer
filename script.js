// Initialize Firebase using browser SDK
const firebaseConfig = {
  apiKey: "AIzaSyCKN-kgDd6cEfGAXBJSy1XpGZeMMtXIA8I",
  authDomain: "cloud-explorer-dc32c.firebaseapp.com",
  projectId: "cloud-explorer-dc32c",
  storageBucket: "cloud-explorer-dc32c.firebasestorage.app",
  messagingSenderId: "983734987467",
  appId: "1:983734987467:web:e53a6597d5d07035b7c94e"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
