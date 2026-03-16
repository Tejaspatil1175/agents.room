# Content Agent — How It Works

The Content Agent generates ready-to-post content by combining **real-time trend data** from the web with **Groq AI (LLaMA3-70B)**. It requires no external data API — it uses Groq to both research trends and write the final output in one pipeline.

---

## What It Can Generate

| Format | Example Output |
|--------|---------------|
| LinkedIn post | Professional thought-leadership post about AI trends |
| Twitter thread | 5-tweet thread breaking down a music drop |
| Newsletter | Weekly digest intro about crypto markets |
| Blog intro | Opening paragraph for a tech blog post |
| Instagram caption | Trendy caption for a lifestyle brand |
| YouTube description | SEO-optimized video description |

---

## Config Shape

```json
{
  "topic": "string",
  "format": "string",
  "tone": "string"
}
```

**topic** — what the content should be about. Can be anything:
- `"AI trends 2025"`
- `"latest music drops this week"`
- `"viral Instagram captions"`
- `"crypto market update"`
- `"fitness motivation"`
- `"Netflix new releases"`

**format** — the type of content to produce:
- `LinkedIn post`
- `Twitter thread`
- `newsletter`
- `blog intro`
- `Instagram caption`
- `YouTube description`

**tone** — the writing style:
- `professional`
- `casual`
- `funny`
- `inspirational`
- `bold`
- `minimalist`

---

## How It Works — Step by Step

```
User sets config (topic + format + tone)
          |
          v
 services/agents/content.js
          |
          v
  Builds a smart prompt combining:
  - what topic is (with "latest/trending" context)
  - what format to write in
  - what tone to use
          |
          v
  callGroq(user, systemPrompt, userPrompt)
  → Model: llama3-70b-8192
  → Uses user's own Groq key OR system fallback key
          |
          v
  Groq generates content using its training data
  + built-in knowledge of trends, formats, platforms
          |
          v
  Returns final ready-to-post text (under 150 words)
          |
          v
  Delivered to user via Email / Telegram / WhatsApp / Slack
          |
          v
  Run saved to MongoDB (status: success, output: text)
```

---

## Real Example Outputs

### Topic: `latest music drops this week` | Format: `Instagram caption` | Tone: `casual`

```
new music just dropped and honestly? my ears needed this.
sabrina carpenter said let the summer never end and we agree.
streaming on repeat, no skip button needed.
what are YOU listening to right now? drop it below

#newmusic #spotify #vibes #musiclovers #nowplaying
```

---

### Topic: `AI trends 2025` | Format: `LinkedIn post` | Tone: `professional`

```
AI is no longer a future investment — it's your Tuesday morning.

Three shifts happening right now that every leader should know:

1. Agents are replacing workflows, not just tasks
2. Small models are outperforming large ones in specific domains
3. The moat is no longer the model — it's the data

The companies winning in 2025 are the ones who stopped asking
"should we use AI?" and started asking "where isn't it yet?"

What's your team automating this quarter?

#AI #Leadership #FutureOfWork #Innovation
```

---

### Topic: `Netflix new releases` | Format: `Twitter thread` | Tone: `casual`

```
Tweet 1: okay i spent 4 hours on netflix last night so you don't have to. here's what's actually worth watching this month 🧵

Tweet 2: first up — the new thriller series everyone's talking about. episode 1 slow, episode 2 you won't move. trust.

Tweet 3: if you're into true crime (who isn't), the new docuseries drops every detail and yes it's as wild as the headlines said.

Tweet 4: comedy fans — there's a new stand-up special that made me laugh out loud alone in my apartment at midnight. rare.

Tweet 5: that's the list. save this thread for the weekend. you're welcome. what are you watching right now?
```

---

### Topic: `fitness motivation monday` | Format: `Instagram caption` | Tone: `inspirational`

```
The only bad workout is the one that didn't happen.

Monday is not the enemy. Monday is the reset button.
Every rep is a vote for the person you're becoming.
Show up even when it's hard — especially when it's hard.

Your future self is watching. Make them proud.

#MondayMotivation #FitnessJourney #WorkoutMode #NeverSettle #GymLife
```

---

## How Trends Are Handled

The Content Agent does **not** call a live trends API. Instead, it leverages the fact that **LLaMA3-70B has broad knowledge of cultural trends, platform formats, and current topics** baked into its training.

When you set the topic to something like:
- `"latest music drops"` → Groq writes in the style of recent music culture
- `"trending reels content"` → Groq knows Instagram Reels format conventions
- `"viral Twitter topics"` → Groq structures thread-style content naturally

For **truly real-time trends** (e.g. today's top song, yesterday's viral tweet), pair the Content Agent with:
- A **News Agent** run first to fetch the actual trend
- Pass that output as context (future feature: agent chaining)

---

## Delivery After Generation

Once Groq returns the content, `runner.js` automatically delivers it to the user's connected channel:

```
Output text
    |
    ├── channel: "email"    → SendGrid sends formatted email
    ├── channel: "telegram" → Telegram Bot sends message to chat_id
    ├── channel: "whatsapp" → Twilio Sandbox sends WhatsApp message
    └── channel: "slack"    → HTTP POST to Slack webhook URL
```

Every run (success or fail) is saved to MongoDB in the `runs` collection so the frontend can display run history.

---

## Scheduling Examples for Content Agent

| Use Case | Cron | Meaning |
|----------|------|---------|
| Daily LinkedIn post idea | `0 8 * * 1-5` | Weekdays at 8 AM |
| Weekly newsletter intro | `0 9 * * 1` | Every Monday at 9 AM |
| Daily Instagram caption | `0 7 * * *` | Every day at 7 AM |
| Twice daily tweet ideas | `0 9,18 * * *` | 9 AM and 6 PM daily |
| Weekend content batch | `0 10 * * 6` | Every Saturday at 10 AM |

---

## File Location

```
agentflow-backend/
  services/
    agents/
      content.js    ← all content agent logic lives here
    groq.js         ← Groq API call + key fallback logic
    runner.js       ← wires content agent into the execution pipeline
    delivery.js     ← sends output to the right channel
```

---

## Error Scenarios

| Error | Cause | Fix |
|-------|-------|-----|
| `No Groq API key available` | Both user key and system key are missing | Add `GROQ_API_KEY` to `.env` |
| `Request failed with status code 400` | Invalid Groq key or malformed prompt | Check key is valid at console.groq.com |
| `No channel configured for type: email` | User hasn't connected a channel yet | Call `POST /channels/connect/email` first |
| Output is generic or off-topic | Topic is too vague | Be more specific in `config.topic` |
