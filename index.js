import express from "express";
import client from "./db/config.js";
import cors from "cors";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

let port = process.env.PORT || 3030;

const bot = new TelegramBot(process.env.TelegramApi, { polling: true });
const webAppUrl = "https://76d7-84-54-84-91.ngrok-free.app/catalog-forbot";
let number = [1000];
let userInfo = {};

bot.onText(/start/, async (msg) => {
  bot.sendMessage(msg.chat.id, `  Assalomu alaykum ${msg.chat.first_name}!`, {
    reply_markup: JSON.stringify({
      keyboard: [[{ text: "Отправить контакт", request_contact: true }]],
      resize_keyboard: true,
    }),
  });
});
bot.on("contact", (msg) => {
  userInfo.phone_number = msg.contact.phone_number;
  userInfo.username = msg.from.username;
  userInfo.language = msg.from.language_code;

  console.log(userInfo);
  bot.sendMessage(msg.chat.id, `Пожалуйста отправьте геопозицию`, {
    reply_markup: JSON.stringify({
      keyboard: [[{ text: "Отправить геопозицию", request_location: true }]],
      resize_keyboard: true,
    }),
  });
});

bot.on("location", (msg) => {
  let { latitude, longitude } = msg.location;

  userInfo.location_latitude = latitude;
  userInfo.location_longitude = longitude;

  console.log(userInfo);

  bot.sendMessage(
    msg.chat.id,
    `Отлично! Для выбора товара нажмите на кнопку "Меню"`,
    {
      reply_markup: JSON.stringify({
        keyboard: [[{ text: `Меню`, web_app: { url: webAppUrl } }]],
        resize_keyboard: true,
      }),
    }
  );
});

bot.on("message", async (msg) => {
  if (msg?.web_app_data?.data) {
    let resN = number[0] + 1;
    number.unshift(resN);
  }
  try {
    const data = JSON.parse(msg?.web_app_data?.data);

    console.log(data);
    const token = process.env.TelegramApi;
    const chat_id = process.env.CHAT_ID;
    const message = ` <b>Заявка с сайта!</b> %0A
    <b>Заказ номер: ${number[0]}</b> %0A
    <b>User_Name: @${userInfo.username}</b> %0A
    <b>Location: ${userInfo.location_latitude}, ${
      userInfo.location_longitude
    }</b> %0A
    <b>Phone_number: ${userInfo.phone_number}</b> %0A
    <b>Product: ${data.map((i) => {
      let text = `${i.product_name} -> ${i.count}`;
      return text;
    })}</b> %0A
    <b>Total: ${data[0].total}</b> %0A `;

   await fetch(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${message}`,
      {
        method: "POST",
      }
    );
  } catch (error) {
    console.log(error);
  }
});

bot.on("message", async (msg) => {
  console.log(msg);
  if (msg?.web_app_data?.data) {
    await bot.sendMessage(
      msg.chat.id,
      `Buyurtma bersh uchun mahsulotlarni menu dan tanlang`,
      {
        reply_markup: JSON.stringify({
          keyboard: [[{ text: "Отправить контакт", request_contact: true }]],
          resize_keyboard: true,
        }),
      }
    );
  }
});

app.listen(port, () => {
  console.log(port);
});
