const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  const response = await fetch('/api/sessions/jwtLogin', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();
  if(responseData.status==="success") {
    console.log(responseData);
    localStorage.setItem('accessToken',responseData.accessToken)
  }
});