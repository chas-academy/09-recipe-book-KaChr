export function isLoggedIn() {
  const credentials = JSON.parse(sessionStorage.getItem('credentials'));

  return credentials ? true : false;
}