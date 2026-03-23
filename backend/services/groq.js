const axios = require('axios');

function getGroqKey(user) {
  return user.groq_api_key || process.env.GROQ_API_KEY;
}

async function callGroq(user, systemPrompt, userPrompt) {
  const key = getGroqKey(user);
  if (!key) throw new Error('No Groq API key available');

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 512,
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 seconds
    }
  );

  return response.data.choices[0].message.content.trim();
}

module.exports = { getGroqKey, callGroq };
