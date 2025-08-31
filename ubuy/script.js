
function showForm(formId, event) {
  document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
  document.getElementById(formId).classList.add('active');

  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
}


function togglePassword(id) {
  const field = document.getElementById(id);
  field.type = field.type === 'password' ? 'text' : 'password';
}


function toggleLogin(type) {
  document.getElementById("passwordField").classList.toggle("hidden", type !== "password");
  document.getElementById("otpField").classList.toggle("hidden", type !== "otp");
}


function toggleRegister(type) {
  document.getElementById("regPasswordFields").classList.toggle("hidden", type !== "password");
  document.getElementById("regOtpField").classList.toggle("hidden", type !== "otp");
}


function showErrors(container, errors) {
  let errorBox = container.querySelector(".error-box");
  if (!errorBox) {
    errorBox = document.createElement("div");
    errorBox.className = "error-box";
    errorBox.style.color = "red";
    errorBox.style.marginTop = "10px";
    errorBox.style.fontSize = "14px";
    container.appendChild(errorBox);
  }
  errorBox.innerHTML = errors.length > 0 ? "error " + errors.join("<br>⚠️ ") : "";
}


document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let email = this.querySelector("input[type='email']").value.trim();
  let password = document.getElementById("password").value.trim();
  let otp = document.querySelector("#otpField input").value.trim();
  let loginType = document.querySelector("input[name='loginType']:checked").value;

  let errors = [];

  
  if (!email.match(/^[^ ]+@[^ ]+\.[a-z]{2,}$/)) {
    errors.push("Enter a valid email address.");
  }

  
  if (loginType === "password" && password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }
  if (loginType === "otp" && otp === "") {
    errors.push("OTP is required.");
  }

  showErrors(this, errors);

  if (errors.length === 0) {
    alert("Login Successful!");
    this.reset();
  }
});


document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let email = this.querySelector("input[type='email']").value.trim();
  let password = document.getElementById("regPassword").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();
  let otp = document.querySelector("#regOtpField input").value.trim();
  let regType = document.querySelector("input[name='regType']:checked").value;
  let captcha = this.querySelector("input[type='checkbox']").checked;

  let errors = [];

  
  if (!email.match(/^[^ ]+@[^ ]+\.[a-z]{2,}$/)) {
    errors.push("Enter a valid email address.");
  }

  
  if (regType === "password") {
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters.");
    }
    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }
  }

  if (regType === "otp" && otp === "") {
    errors.push("OTP is required.");
  }

  
  if (!captcha) {
    errors.push("Please verify captcha.");
  }

  showErrors(this, errors);

  if (errors.length === 0) {
    alert(" Registration Successful!");
    this.reset();
  }
});
