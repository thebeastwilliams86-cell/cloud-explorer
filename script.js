// Firebase config
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

document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Login handler
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;

      auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          alert(`Welcome, ${userCredential.user.email}`);
        })
        .catch(error => {
          alert(`Login failed: ${error.message}`);
        });
    });
  }

  // 🔹 Signup handler
  const signupButton = document.getElementById("signup-button");
  if (signupButton) {
    signupButton.addEventListener("click", () => {
      const email = document.querySelector("#login-form input[type='email']").value;
      const password = document.querySelector("#login-form input[type='password']").value;

      auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          alert(`Account created for ${userCredential.user.email}`);
        })
        .catch(error => {
          alert(`Signup failed: ${error.message}`);
        });
    });
  }

  // 🔹 Logout handler
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      auth.signOut()
        .then(() => {
          alert("Signed out");
          location.reload();
        })
        .catch(error => {
          alert(`Logout failed: ${error.message}`);
        });
    });
  }

  // 🔹 Show logged-in user
  auth.onAuthStateChanged(user => {
    if (user) {
      const loginArea = document.getElementById("login-area");
      if (loginArea) {
        loginArea.innerHTML = `<p>Welcome, ${user.email}</p>`;
      }
    }
  });

  // 🔹 File explorer mock
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
