# AgentFlow API Guide
### For Frontend Developers

**Base URL:** `http://localhost:5000/api`  
**All requests:** `Content-Type: application/json`  
**Auth required routes:** Pass `Authorization: Bearer <token>` in headers  
**All responses follow this format:**
```json
{ "success": true, "data": {} }
{ "success": false, "message": "error reason" }
```

---

## AUTH

---

### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "timezone": "Asia/Kolkata"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "664f1b2c8e4a2d001f3c8a11",
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
}
```

**Errors:**
| Status | Message |
|--------|---------|
| 400 | `email, password, and name are required` |
| 400 | `Email already registered` |

---

### POST `/auth/login`
Login and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "664f1b2c8e4a2d001f3c8a11",
      "email": "john@example.com",
      "name": "John Doe"
    }
  }
}
```

> Save the `token` in localStorage or a cookie. Send it in every authenticated request.

**Errors:**
| Status | Message |
|--------|---------|
| 401 | `Invalid credentials` |

---

### GET `/auth/me` `AUTH`
Get the currently logged-in user's profile.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664f1b2c8e4a2d001f3c8a11",
    "name": "John Doe",
    "email": "john@example.com",
    "timezone": "Asia/Kolkata",
    "groq_api_key": null,
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

---

### POST `/auth/logout` `AUTH`
Logout (client should delete the token).

**Response `200`:**
```json
{
  "success": true,
  "data": { "message": "Logged out successfully" }
}
```

---

### PUT `/auth/groq-key` `AUTH`
Save user's own Groq API key (for faster responses).

**Request Body:**
```json
{
  "groq_api_key": "gsk_xxxxxxxxxxxxxxxxxxxx"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": { "message": "Groq API key saved" }
}
```

---

### DELETE `/auth/groq-key` `AUTH`
Remove user's Groq key and fall back to system key.

**Response `200`:**
```json
{
  "success": true,
  "data": { "message": "Groq API key removed, using system key" }
}
```

---

## AGENTS

---

### GET `/agents` `AUTH`
Get all agents belonging to the logged-in user.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "664f1b2c8e4a2d001f3c8b22",
      "user_id": "664f1b2c8e4a2d001f3c8a11",
      "name": "Mumbai Weather Bot",
      "type": "weather",
      "config": { "city": "Mumbai", "unit": "metric" },
      "schedule_cron": "0 7 * * *",
      "channel": "email",
      "status": "active",
      "is_public": false,
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### POST `/agents` `AUTH`
Create a new agent.

**Request Body — Weather Agent:**
```json
{
  "name": "Mumbai Weather Bot",
  "type": "weather",
  "config": {
    "city": "Mumbai",
    "unit": "metric"
  },
  "schedule_cron": "0 7 * * *",
  "channel": "email"
}
```

**Request Body — News Agent:**
```json
{
  "name": "AI News Digest",
  "type": "news",
  "config": {
    "topic": "artificial intelligence",
    "language": "en"
  },
  "schedule_cron": "0 8 * * *",
  "channel": "telegram"
}
```

**Request Body — Research Agent:**
```json
{
  "name": "Quantum Research Tracker",
  "type": "research",
  "config": {
    "topic": "quantum computing 2025",
    "depth": "advanced"
  },
  "schedule_cron": "0 9 * * 1",
  "channel": "slack"
}
```

**Request Body — Content Agent:**
```json
{
  "name": "LinkedIn Post Generator",
  "type": "content",
  "config": {
    "topic": "AI trends in 2025",
    "format": "LinkedIn post",
    "tone": "professional"
  },
  "schedule_cron": "0 10 * * 1",
  "channel": "whatsapp"
}
```

> `format` options: `LinkedIn post`, `Twitter thread`, `newsletter`, `blog intro`  
> `tone` options: `professional`, `casual`, `funny`, `inspirational`  
> `channel` options: `email`, `telegram`, `whatsapp`, `slack`

**`schedule_cron` examples:**
| Cron | Meaning |
|------|---------|
| `0 7 * * *` | Every day at 7:00 AM |
| `0 8 * * 1` | Every Monday at 8:00 AM |
| `0 9 * * 1-5` | Weekdays at 9:00 AM |
| `*/30 * * * *` | Every 30 minutes |

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "_id": "664f1b2c8e4a2d001f3c8b22",
    "user_id": "664f1b2c8e4a2d001f3c8a11",
    "name": "Mumbai Weather Bot",
    "type": "weather",
    "config": { "city": "Mumbai", "unit": "metric" },
    "schedule_cron": "0 7 * * *",
    "channel": "email",
    "status": "active",
    "is_public": false,
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Errors:**
| Status | Message |
|--------|---------|
| 400 | `name, type, config, schedule_cron, channel are required` |
| 400 | `Invalid agent type` |

---

### GET `/agents/:id` `AUTH`
Get a single agent by ID.

**Response `200`:** Same shape as single agent object above.

**Errors:**
| Status | Message |
|--------|---------|
| 404 | `Agent not found` |

---

### PUT `/agents/:id` `AUTH`
Update an agent. Send only the fields you want to change.

**Request Body (partial update):**
```json
{
  "name": "Pune Weather Bot",
  "config": { "city": "Pune", "unit": "metric" },
  "schedule_cron": "0 6 * * *"
}
```

**Response `200`:** Updated agent object.

---

### DELETE `/agents/:id` `AUTH`
Delete an agent. Also cancels its cron job immediately.

**Response `200`:**
```json
{
  "success": true,
  "data": { "message": "Agent deleted" }
}
```

---

### POST `/agents/:id/pause` `AUTH`
Pause a running agent (stops cron, keeps data).

**Response `200`:**
```json
{
  "success": true,
  "data": { "message": "Agent paused" }
}
```

---

### POST `/agents/:id/resume` `AUTH`
Resume a paused agent.

**Response `200`:**
```json
{
  "success": true,
  "data": { "message": "Agent resumed" }
}
```

---

### POST `/agents/:id/run-now` `AUTH`
Trigger an agent to run immediately (ignores schedule).

**Response `200`:**
```json
{
  "success": true,
  "data": { "message": "Agent triggered successfully" }
}
```

> After calling this, poll `GET /runs/agent/:id` to see the new run result.

---

## RUNS

Run = one execution of an agent. Saved automatically every time an agent fires.

---

### GET `/runs/agent/:id` `AUTH`
Get last 50 runs for a specific agent.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "664f1b2c8e4a2d001f3c8c33",
      "agent_id": "664f1b2c8e4a2d001f3c8b22",
      "status": "success",
      "output": "Good morning! Mumbai is 31C today with humid conditions. Feels like 35C — stay hydrated. Light breeze at 12 km/h. Carry an umbrella, rain likely in the evening.",
      "error_message": null,
      "ran_at": "2025-01-15T07:00:00.000Z"
    },
    {
      "_id": "664f1b2c8e4a2d001f3c8c34",
      "agent_id": "664f1b2c8e4a2d001f3c8b22",
      "status": "fail",
      "output": null,
      "error_message": "No channel configured for type: email",
      "ran_at": "2025-01-14T07:00:00.000Z"
    }
  ]
}
```

> `status` is either `success` or `fail`. On fail, check `error_message`.

---

### GET `/runs/:runId` `AUTH`
Get a specific run by its ID.

**Response `200`:** Single run object (same shape as above).

**Errors:**
| Status | Message |
|--------|---------|
| 404 | `Run not found` |
| 403 | `Unauthorized` |

---

## CHANNELS

A channel = delivery destination for agent output. One per type per user.

---

### POST `/channels/connect/email` `AUTH`

**Request Body:**
```json
{ "email": "john@example.com" }
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "664f1b2c8e4a2d001f3c8d44",
    "user_id": "664f1b2c8e4a2d001f3c8a11",
    "type": "email",
    "value": "john@example.com",
    "verified": true,
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

---

### POST `/channels/connect/telegram` `AUTH`

**Request Body:**
```json
{ "chat_id": "123456789" }
```

> The user must message the Telegram bot first. Then fetch their chat_id from the Telegram Bot API.

**Response `200`:** Channel object with `type: "telegram"`.

---

### POST `/channels/connect/whatsapp` `AUTH`

**Request Body:**
```json
{ "phone": "+919876543210" }
```

> Phone number must include country code. User must join Twilio sandbox first by sending the join code.

**Response `200`:** Channel object with `type: "whatsapp"`.

---

### POST `/channels/connect/slack` `AUTH`

**Request Body:**
```json
{ "webhook_url": "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" }
```

**Response `200`:** Channel object with `type: "slack"`.

---

### DELETE `/channels/:type` `AUTH`
Remove a connected channel. `:type` = `email`, `telegram`, `whatsapp`, or `slack`.

**Example:** `DELETE /channels/email`

**Response `200`:**
```json
{
  "success": true,
  "data": { "message": "email channel removed" }
}
```

---

## MARKETPLACE

Public agents that any user can browse and install as their own copy.

---

### GET `/marketplace` `AUTH`
Browse all public agents.

**Response `200`:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "664f1b2c8e4a2d001f3c8b22",
      "name": "Mumbai Weather Bot",
      "type": "weather",
      "config": { "city": "Mumbai", "unit": "metric" },
      "schedule_cron": "0 7 * * *",
      "channel": "email",
      "user_id": { "name": "John Doe" },
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### POST `/marketplace/publish/:id` `AUTH`
Make one of your agents public on the marketplace.

**Response `200`:**
```json
{
  "success": true,
  "data": { "message": "Agent published to marketplace" }
}
```

---

### POST `/marketplace/install/:id` `AUTH`
Install a public agent as your own copy. You set your own schedule and channel.

**Request Body:**
```json
{
  "schedule_cron": "0 8 * * *",
  "channel": "email"
}
```

**Response `201`:** New agent object cloned into your account with `(copy)` appended to the name.

---

## WHAT EACH AGENT OUTPUTS

| Agent Type | Example Output |
|------------|---------------|
| `weather` | `Good morning! Mumbai is 31°C today with humid conditions. Feels like 35°C — stay hydrated. Light breeze at 12 km/h. Carry an umbrella, rain likely in the evening.` |
| `news` | `• OpenAI releases new model beating GPT-4 on benchmarks` `• Google DeepMind announces breakthrough in protein folding` `• AI regulation bill passes EU parliament with 423 votes` |
| `research` | `• IBM unveiled 1000-qubit processor in Q1 2025` `• Google claims quantum supremacy on optimization tasks` `Key insight: Commercial quantum computing is 3-5 years away.` |
| `content` | `AI is no longer the future — it's your Tuesday morning. Here are 3 things changing faster than your coffee gets cold...` |

Output is a plain string delivered to the user's connected channel (email/telegram/whatsapp/slack) and also saved in the `runs` table for display in your UI.

---

## ERROR REFERENCE

| Status | When it happens |
|--------|----------------|
| 400 | Missing or invalid request body fields |
| 401 | No token / invalid token / expired token |
| 403 | Token valid but resource belongs to another user |
| 404 | Agent, run, or channel not found |
| 429 | More than 100 requests in 15 minutes from same IP |
| 500 | Server error (check backend logs) |

---

## TYPICAL FRONTEND FLOW

```
1. Register / Login          → save token
2. Connect a channel         → POST /channels/connect/email (or telegram etc)
3. Create an agent           → POST /agents  (choose type + config + schedule + channel)
4. View agents               → GET /agents
5. Manually test agent       → POST /agents/:id/run-now
6. View run history          → GET /runs/agent/:id
7. Pause / Resume agent      → POST /agents/:id/pause or /resume
8. Browse marketplace        → GET /marketplace
9. Install from marketplace  → POST /marketplace/install/:id
```
