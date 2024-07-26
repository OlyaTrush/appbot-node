const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

const token = "7204920055:AAH-GT5Sdh5EvwZiFERC_dBsub1-QlTM9Vw";
const webAppUrl = "https://tranquil-manatee-a43f4a.netlify.app";

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

app.post("/web-data", async (req, res) => {
  const { queryId, products = [], totalPrice } = req.body;
  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Успішна покупка",
      input_message_content: {
        message_text: ` Вітаємо з покупкою ${totalPrice}, ${products
          .map((item) => item.title)
          .join(", ")}`,
      },
    });
    return res.status(200).json({});
  } catch (e) {
    return res.status(500).json({});
  }
});

const PORT = 8000;

app.listen(PORT, () => console.log("server started on PORT " + PORT));
