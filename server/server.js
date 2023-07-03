const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
 });

app.post('/webhook', (req, res) => {
  const payload = req.body;
  
  // Extract relevant information from the payload
  const status = payload.status;
  const labels = payload.labels;
  const annotations = payload.annotations;
  
  // Prepare the message to be sent to Telegram
  let message = `Alert status: ${status}\n\nLabels:\n`;
  for (const [key, value] of Object.entries(labels)) {
    message += `${key}: ${value}\n`;
  }
  
  message += '\nAnnotations:\n';
  for (const [key, value] of Object.entries(annotations)) {
    message += `${key}: ${value}\n`;
  }
  
  // Replace 'YOUR_TELEGRAM_BOT_TOKEN with your actual Telegram bot token
  const botToken = '5665722957:AAGdw3k6q-1HgtYXu3oRLckTT6LyWJzA0Vw';
  // Replace 'YOUR_CHAT_ID' with your actual chat ID where you want to send the message
  const chatId = '5404725958';
  
  // Send the message to Telegram using the Telegram Bot API
  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const params = {
    chat_id: chatId,
    text: message,
  };
  
  axios.post(telegramUrl, params)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error sending message to Telegram:', error);
      res.sendStatus(500);
    });
});

app.listen(5555, () => {
  console.log('Webhook receiver started on port 5555');
});
