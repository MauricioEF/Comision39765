const form = document.getElementById('restorePasswordForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  const response = await fetch('/api/users/new-password-temp', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  console.log(result);
  if(result.status==="success") window.location.replace(result.redirect||'/')
});
