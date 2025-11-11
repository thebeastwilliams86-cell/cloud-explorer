// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCKN-kgDd6cEfGAXBJSy1XpGZeMMtXIA8I",
  authDomain: "cloud-explorer-dc32c.firebaseapp.com",
  projectId: "cloud-explorer-dc32c",
  storageBucket: "cloud-explorer-dc32c.appspot.com",
  messagingSenderId: "983734987467",
  appId: "1:983734987467:web:e53a6597d5d07035b7c94e"
};

// 🔹 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

document.addEventListener("DOMContentLoaded", () => {
  // 🔸 Login handler
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

  // 🔸 Signup handler
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

  // 🔸 Logout handler
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

  // 🔸 Show logged-in user and load files
  auth.onAuthStateChanged(user => {
    const loginArea = document.getElementById("login-area");
    if (user && loginArea) {
      loginArea.innerHTML = `<p>Welcome, ${user.email}</p>`;
      loadUserFiles(user.uid);
    }
  });

  // 🔸 Upload handler
  const fileInput = document.getElementById("file-input");
  const uploadButton = document.getElementById("upload-button");
  const uploadStatus = document.getElementById("upload-status");

  if (uploadButton && fileInput) {
    uploadButton.addEventListener("click", () => {
      const file = fileInput.files[0];
      const user = auth.currentUser;

      if (!user) {
        alert("You must be logged in to upload.");
        return;
      }

      if (!file) {
        alert("Please select a file.");
        return;
      }

      const userFileRef = storage.ref(`${user.uid}/${file.name}`);

      userFileRef.put(file)
        .then(snapshot => {
          uploadStatus.textContent = `Uploaded: ${file.name}`;
          loadUserFiles(user.uid); // Refresh file list
        })
        .catch(error => {
          uploadStatus.textContent = `Upload failed: ${error.message}`;
        });
    });
  }

  // 🔸 Load user files
  function loadUserFiles(uid) {
    const explorer = document.getElementById("file-explorer");
    if (!explorer) return;

    explorer.innerHTML = "Loading files...";

    storage.ref(uid).listAll()
      .then(result => {
        explorer.innerHTML = "";
        result.items.forEach(itemRef => {
          itemRef.getDownloadURL().then(url => {
            const fileItem = document.createElement("div");
            fileItem.className = "file-item";
            fileItem.innerHTML = `<a href="${url}" target="_blank">${itemRef.name}</a>`;
            explorer.appendChild(fileItem);
          });
        });
      })
      .catch(error => {
        explorer.innerHTML = `Error loading files: ${error.message}`;
      });
  }
});
