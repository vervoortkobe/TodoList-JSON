function togglePassword() {
  const togglePassword = document.getElementById("togglePassword");
  const password = document.querySelector("#password");
  
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  togglePassword.classList.toggle("bi-eye");
}