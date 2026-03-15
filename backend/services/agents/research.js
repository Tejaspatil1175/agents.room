const axios = require('axios');
const { callGroq } = require('../groq');

async function runResearchAgent(config, user) {
  const { topic, depth = 'advanced' } = config;
  if (!topic) throw new Error('Research agent requires a topic in config');

  const apiKey = process.env.TAVILY_API_KEY;
  const response = await axios.post(
    'https://api.tavily.com/search',
    { query: topic, search_depth: depth, max_results: 5 },
    { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
  );

  const results = response.data.results;
  if (!results || results.length === 0) throw new Error('No research results found for: ' + topic);

  const researchData = results
    .map((r, i) => `${i + 1}. ${r.title}\n   ${r.content}\n   URL: ${r.url}`)
    .join('\n\n');

  const systemPrompt = 'You are a research analyst. Read these sources and write a clear 5-bullet research summary. End with one key insight.';
  return callGroq(user, systemPrompt, researchData);
}

module.exports = { runResearchAgent };
