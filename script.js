document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (username === '' || password === '') {
    customAlert('Please enter both username and password.');
    return;
  }
  
  fetch('users.json')
    .then(response => response.json())
    .then(data => {
      const users = data.users;
      const user = users.find(user => user.username === username && user.password === password);
      if (user) {
        localStorage.setItem('isLoggedIn', true);
        window.location.href = 'dashboard.html';
      } else {
        customAlert('Invalid username or password.');
      }
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      customAlert('An error occurred. Please try again later.');
    });
});

// TKM-custom alert box
function customAlert(message) {
  const loginContainer = document.querySelector('.login-container');
  loginContainer.style.opacity = 0;
  
  const alertBox = document.createElement('div');
  alertBox.className = 'alert';
  alertBox.innerHTML = `
    <h1>${message}</h1>
    <button onclick="window.location.href='index.html'">OK</button>
  `;
  document.body.appendChild(alertBox);
}
