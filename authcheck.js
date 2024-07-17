const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html'; // Redirect to login page if not authenticated
}

// Optionally, you can verify the token with the server before loading the page content
axios.get('http://localhost:3000/auth/verify-token', {
  headers: {
    'Authorization': token
  }
}).then(response => {
  // Token is valid, load the page content
  document.body.innerHTML = '<h1>Welcome to Password Generator</h1>';
}).catch(error => {
  // Invalid token, redirect to login page
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});