const { callGroq } = require('../groq');

async function runContentAgent(config, user) {
  const { topic, format, tone } = config;
  if (!topic || !format || !tone) throw new Error('Content agent requires topic, format, and tone in config');

  const systemPrompt = 'You are a professional content writer.';
  const userPrompt = `Write a ${format} about ${topic} in a ${tone} tone. Keep it under 150 words. Make it ready to post.`;

  return callGroq(user, systemPrompt, userPrompt);
}

module.exports = { runContentAgent };
