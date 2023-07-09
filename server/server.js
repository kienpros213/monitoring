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
  console.log(payload)
  const alertName = payload.commonLabels.alertname
  const instance = payload.commonLabels.instance
  const description = payload.commonAnnotations.description
  const summary = payload.commonAnnotations.summary

  //message to be sent to Telegram
  let message = `*firing*
- 🚨Alert: ${alertName}
- 📰Summary: ${summary}🔥🔥🔥
- 📝Description: ${description}
`

  //Telegram bot token
  const botToken = '5665722957:AAGdw3k6q-1HgtYXu3oRLckTT6LyWJzA0Vw';
  //Telegram chat ID
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
