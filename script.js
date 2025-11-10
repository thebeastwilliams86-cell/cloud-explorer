// 🔹 Firebase config and initialization
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

// 🔹 Wait for the page to load
document.addEventListener("DOMContentLoaded", () => {
  // 🔸 Login form handler (for login.html)
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;

      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert(`Welcome, ${user.email}`);
        })
        .catch((error) => {
          alert(`Login failed: ${error.message}`);
        });
    });
  }

  // 🔸 File explorer mock (for index.html)
  const explorer = document.getElementById("file-explorer");

  if (explorer) {
    const mockFiles = [
      { name: "FamilyPhoto.jpg", type: "image" },
      { name: "VacationVideo.mp4", type: "video" },
      { name: "Document.pdf", type: "doc" }
    ];

    mockFiles.forEach(file => {
      const item = document.createElement("div");
      item.className = "file-item";
      item.textContent = file.name;
      explorer.appendChild(item);
    });
  }
});
