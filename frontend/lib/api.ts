// API base URL — swap this when backend is ready
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

// Auth token helper
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

function authHeaders() {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

// Generic fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { ...authHeaders(), ...options?.headers },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || 'Request failed')
  }
  return res.json()
}

export const api = {
  // AUTH
  auth: {
    login: (email: string, password: string) =>
      apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    signup: (name: string, email: string, password: string) =>
      apiFetch('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
    logout: () =>
      apiFetch('/auth/logout', { method: 'POST' }),
    googleOAuth: () => {
      window.location.href = `${API_BASE}/auth/google`
    },
  },

  // AGENTS
  agents: {
    list: () =>
      apiFetch('/agents'),
    get: (id: string) =>
      apiFetch(`/agents/${id}`),
    create: (data: {
      name: string
      taskDescription: string
      schedule: object
      delivery: string
      accountDetail: string
    }) =>
      apiFetch('/agents', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<{ name: string; taskDescription: string; schedule: object }>) =>
      apiFetch(`/agents/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) =>
      apiFetch(`/agents/${id}`, { method: 'DELETE' }),
    pause: (id: string) =>
      apiFetch(`/agents/${id}/pause`, { method: 'POST' }),
    resume: (id: string) =>
      apiFetch(`/agents/${id}/resume`, { method: 'POST' }),
  },

  // RUNS
  runs: {
    list: (agentId: string) =>
      apiFetch(`/agents/${agentId}/runs`),
    getOutput: (agentId: string, runId: string) =>
      apiFetch(`/agents/${agentId}/runs/${runId}/output`),
  },

  // MARKETPLACE
  marketplace: {
    list: () =>
      apiFetch('/marketplace'),
    install: (templateId: string) =>
      apiFetch(`/marketplace/${templateId}/install`, { method: 'POST' }),
  },

  // USER
  user: {
    getProfile: () =>
      apiFetch('/user/profile'),
    updateProfile: (data: { name: string; email: string; timezone: string }) =>
      apiFetch('/user/profile', { method: 'PATCH', body: JSON.stringify(data) }),
    updatePreferences: (data: object) =>
      apiFetch('/user/preferences', { method: 'PATCH', body: JSON.stringify(data) }),
    deleteAccount: () =>
      apiFetch('/user', { method: 'DELETE' }),
  },

  // CHANNELS
  channels: {
    connect: (channel: string, detail: string) =>
      apiFetch('/channels/connect', { method: 'POST', body: JSON.stringify({ channel, detail }) }),
    disconnect: (channel: string) =>
      apiFetch(`/channels/${channel}`, { method: 'DELETE' }),
  },

  // ONBOARDING
  onboarding: {
    complete: (data: { timezone: string; channel: string; templateId: string }) =>
      apiFetch('/onboarding/complete', { method: 'POST', body: JSON.stringify(data) }),
  },
}
