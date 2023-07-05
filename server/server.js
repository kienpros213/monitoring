const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.get("/:universalURL", (req, res) => {
    res.send("this webhook is lit!!!!!");
 });

app.post('/webhook', (req, res) => {
  const payload = req.body;
  // Extract relevant information from the payload
  console.log(payload.alerts[0].labels)
  const receiver = payload.receiver
  const status = payload.status
  const label = payload.alerts[0].labels.alertname
  const instance = payload.alerts[0].labels.instance

  // Prepare the message to be sent to Telegram
  let message = `the CPU is on fire!!!!\n${receiver}\n${status}\n${label}\n${instance}`

  // Replace 'YOUR_TELEGRAM_BOT_TOKEN with your actual Telegram bot token
  const botToken = '6046664628:AAGZmu-8kUYdGxRQz_ewX1mzUKKbmC41Q6Y';
  // Replace 'YOUR_CHAT_ID' with your actual chat ID where you want to send the message
  const chatId = '-869553842';

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
