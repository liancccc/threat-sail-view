const TOKEN_KEY = 'token'

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
}