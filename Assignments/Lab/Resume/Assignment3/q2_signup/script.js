function validateForm() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirm = document.getElementById("confirm").value;
  var valid = true;

  // clear old errors
  document.getElementById("usernameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("passwordError").innerText = "";
  document.getElementById("confirmError").innerText = "";

  if (username.length < 3) {
    document.getElementById("usernameError").innerText = "Username must be at least 3 characters";
    valid = false;
  }

  if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    document.getElementById("emailError").innerText = "Enter a valid email";
    valid = false;
  }

  if (password.length < 6) {
    document.getElementById("passwordError").innerText = "Password must be at least 6 characters";
    valid = false;
  }

  if (confirm != password) {
    document.getElementById("confirmError").innerText = "Passwords do not match";
    valid = false;
  }

  if (valid) {
    alert("Signup successful!");
  }

  return false;
}
