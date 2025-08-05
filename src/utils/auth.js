const TOKEN_KEY = 'token';
export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}
