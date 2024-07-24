function saveUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
}
function getUser(username) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  return users[username];
}
function authenticateUser(username, password) {
  const storedPassword = getUser(username);
  return storedPassword === password;
}

document
  .getElementById("registerForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (getUser(username)) alert(`Username already exists`);
    else {
      saveUser(username, password);
      alert(`Registration successfull`);
      window.location.href = "login.html";
    }
  });

document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (authenticateUser(username, password)) {
    sessionStorage.setItem("loggedInUser", username);
    window.location.href = "secured.html";
  } else alert(`Invalid username or password`);
});

window.onload = function () {
  const userElement = document.getElementById("user");
  if (userElement) {
    const username = sessionStorage.getItem("loggedInUser");
    if (username) userElement.textContent = username;
    else window.location.href = "login.html";
  }
};

document.getElementById("logout")?.addEventListener("click", function () {
  sessionStorage.removeItem("loggedInUser");
});
