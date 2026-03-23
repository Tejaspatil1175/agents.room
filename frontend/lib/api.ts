const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

function authHeaders(): Record<string, string> {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { ...authHeaders(), ...(options?.headers as Record<string, string> || {}) },
  })
  const json = await res.json().catch(() => ({ success: false, message: 'Request failed' }))
  if (!res.ok) {
    throw new Error(json.message || 'Request failed')
  }
  return json
}

export const api = {
  // AUTH
  auth: {
    login: (email: string, password: string) =>
      apiFetch<any>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

    register: (name: string, email: string, password: string, timezone?: string) =>
      apiFetch<any>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, timezone: timezone || 'Asia/Kolkata' }) }),

    me: () =>
      apiFetch<any>('/auth/me'),

    logout: () =>
      apiFetch<any>('/auth/logout', { method: 'POST' }),

    saveGroqKey: (groq_api_key: string) =>
      apiFetch<any>('/auth/groq-key', { method: 'PUT', body: JSON.stringify({ groq_api_key }) }),

    deleteGroqKey: () =>
      apiFetch<any>('/auth/groq-key', { method: 'DELETE' }),
  },

  // AGENTS
  agents: {
    list: () =>
      apiFetch<any>('/agents'),

    get: (id: string) =>
      apiFetch<any>(`/agents/${id}`),

    create: (data: {
      name: string
      type: 'weather' | 'news' | 'research' | 'content'
      config: Record<string, any>
      schedule_cron: string
      channel: 'email' | 'whatsapp' | 'telegram' | 'slack'
    }) =>
      apiFetch<any>('/agents', { method: 'POST', body: JSON.stringify(data) }),

    update: (id: string, data: Partial<{
      name: string
      type: string
      config: Record<string, any>
      schedule_cron: string
      channel: string
    }>) =>
      apiFetch<any>(`/agents/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

    delete: (id: string) =>
      apiFetch<any>(`/agents/${id}`, { method: 'DELETE' }),

    pause: (id: string) =>
      apiFetch<any>(`/agents/${id}/pause`, { method: 'POST' }),

    resume: (id: string) =>
      apiFetch<any>(`/agents/${id}/resume`, { method: 'POST' }),

    runNow: (id: string) =>
      apiFetch<any>(`/agents/${id}/run-now`, { method: 'POST' }),
  },

  // RUNS
  runs: {
    listAll: () =>
      apiFetch<any>('/runs'),

    listByAgent: (agentId: string) =>
      apiFetch<any>(`/runs/agent/${agentId}`),

    get: (runId: string) =>
      apiFetch<any>(`/runs/${runId}`),
  },

  // CHANNELS
  channels: {
    connectEmail: (email: string) =>
      apiFetch<any>('/channels/connect/email', { method: 'POST', body: JSON.stringify({ email }) }),

    connectWhatsapp: (phone: string) =>
      apiFetch<any>('/channels/connect/whatsapp', { method: 'POST', body: JSON.stringify({ phone }) }),

    connectTelegram: (chat_id: string) =>
      apiFetch<any>('/channels/connect/telegram', { method: 'POST', body: JSON.stringify({ chat_id }) }),

    connectSlack: (webhook_url: string) =>
      apiFetch<any>('/channels/connect/slack', { method: 'POST', body: JSON.stringify({ webhook_url }) }),

    disconnect: (type: 'email' | 'whatsapp' | 'telegram' | 'slack') =>
      apiFetch<any>(`/channels/${type}`, { method: 'DELETE' }),

    test: (type: 'email' | 'whatsapp' | 'telegram' | 'slack') =>
      apiFetch<any>(`/channels/test/${type}`),
  },

  // MARKETPLACE
  marketplace: {
    list: () =>
      apiFetch<any>('/marketplace'),

    publish: (agentId: string) =>
      apiFetch<any>(`/marketplace/publish/${agentId}`, { method: 'POST' }),

    install: (agentId: string, data: { schedule_cron: string; channel: string }) =>
      apiFetch<any>(`/marketplace/install/${agentId}`, { method: 'POST', body: JSON.stringify(data) }),
  },
}

// Helper: convert wizard schedule state to cron expression
export function scheduleToCron(schedule: {
  frequency: string
  time: string
  days?: string[]
}): string {
  const [h, m] = schedule.time.split(':')
  const hour = parseInt(h)
  const minute = parseInt(m)

  switch (schedule.frequency) {
    case 'daily':
      return `${minute} ${hour} * * *`
    case 'weekdays':
      return `${minute} ${hour} * * 1-5`
    case 'weekly':
      return `${minute} ${hour} * * 1`
    case 'hourly':
      return `0 * * * *`
    default:
      return `${minute} ${hour} * * *`
  }
}

// Helper: map template ID to backend agent type + config
export function templateToAgentPayload(templateId: string, agentName: string, channel: string, schedule_cron: string) {
  const channelMap: Record<string, string> = {
    whatsapp: 'whatsapp',
    email: 'email',
    telegram: 'telegram',
    slack: 'slack',
  }
  const ch = (channelMap[channel.toLowerCase()] || 'email') as 'email' | 'whatsapp' | 'telegram' | 'slack'

  const templateMap: Record<string, { type: 'weather' | 'news' | 'research' | 'content'; config: Record<string, any> }> = {
    '1': { type: 'news', config: { topic: 'finance crypto stocks', language: 'en' } },
    '2': { type: 'research', config: { topic: 'remote job listings software engineer', depth: 'advanced' } },
    '3': { type: 'research', config: { topic: 'artificial intelligence news', depth: 'advanced' } },
    '4': { type: 'content', config: { topic: 'LinkedIn post about productivity', format: 'LinkedIn post', tone: 'professional' } },
    '5': { type: 'content', config: { topic: 'health workout meal plan', format: 'newsletter', tone: 'inspirational' } },
    '6': { type: 'news', config: { topic: 'gmail email productivity', language: 'en' } },
  }

  const tpl = templateMap[templateId] || { type: 'research' as const, config: { topic: agentName, depth: 'advanced' } }

  return {
    name: agentName,
    type: tpl.type,
    config: tpl.config,
    schedule_cron,
    channel: ch,
  }
}
