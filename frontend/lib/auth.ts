export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token)
}

export function clearAuthToken() {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('auth_token')
}

export function setAuthUser(user: any) {
  localStorage.setItem('auth_user', JSON.stringify(user))
}

export function getAuthUser(): any {
  if (typeof window === 'undefined') return null
  try {
    const u = localStorage.getItem('auth_user')
    return u ? JSON.parse(u) : null
  } catch {
    return null
  }
}
