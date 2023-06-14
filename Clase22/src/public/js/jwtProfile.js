// const jwt = localStorage.getItem('accessToken');
// if (!jwt) window.location.replace('/login');

// fetch('/api/sessions/jwtProfile', {
//   method: 'GET',
//   headers: {
//     authorization: `Bearer ${jwt}`,
//   },
// })
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//     const welcome = document.getElementById('welcome');
//     const email = document.getElementById('email');
//     welcome.innerHTML = `Hola, ${result.payload.name}`;
//     email.innerHTML = result.payload.email
//   });
