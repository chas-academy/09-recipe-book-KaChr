export async function getUser() {
  let user = JSON.parse(sessionStorage.getItem('user'));
  let credentials = JSON.parse(sessionStorage.getItem('credentials'));

  if (!user) {
    user = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/user`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${credentials.access_token}`
      }
    })
    .then(res => res.json())
    .then(res => sessionStorage.setItem('user', JSON.stringify(res)))
    .catch(err => console.error(err));
  }

  return user;
}