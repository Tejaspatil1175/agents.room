const axios = require('axios');
const { callGroq } = require('../groq');

async function runNewsAgent(config, user) {
  const { topic, language = 'en' } = config;
  if (!topic) throw new Error('News agent requires a topic in config');

  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&language=${language}&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`;

  const newsRes = await axios.get(url);
  const articles = newsRes.data.articles;

  if (!articles || articles.length === 0) throw new Error('No articles found for topic: ' + topic);

  const articlesData = articles
    .map((a, i) => `${i + 1}. ${a.title}\n   ${a.description || 'No description'}\n   URL: ${a.url}`)
    .join('\n\n');

  const systemPrompt = 'You are a news summarizer. Summarize these 5 articles into 3 clean bullet points. Be concise.';
  return callGroq(user, systemPrompt, articlesData);
}

module.exports = { runNewsAgent };
