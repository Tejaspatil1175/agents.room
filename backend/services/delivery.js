const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');
const axios = require('axios');

async function sendEmail(to, message) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  await sgMail.send({
    to,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@agentflow.app',
    subject: 'AgentFlow Update',
    text: message
  });
}

async function sendWhatsApp(to, message) {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: `whatsapp:${to}`,
    body: message
  });
}

async function sendTelegram(chatId, message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: message
  });
}

async function sendSlack(webhookUrl, message) {
  await axios.post(webhookUrl, { text: message });
}

async function sendMessage(channel, value, message) {
  switch (channel) {
    case 'email':
      await sendEmail(value, message);
      break;
    case 'whatsapp':
      await sendWhatsApp(value, message);
      break;
    case 'telegram':
      await sendTelegram(value, message);
      break;
    case 'slack':
      await sendSlack(value, message);
      break;
    default:
      throw new Error('Unknown channel type: ' + channel);
  }
}

module.exports = { sendMessage };
