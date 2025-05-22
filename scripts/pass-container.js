const passwordInput = document.getElementById('userPassword');
const passwordContainer = document.querySelector('.password-container');

passwordInput.addEventListener('focus', () => {
  passwordContainer.classList.add('focused');
});

passwordInput.addEventListener('blur', () => {
  passwordContainer.classList.remove('focused');
});