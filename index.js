import express from "express";
import client from "./db/config.js";
import cors from "cors";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import usersandorders from "./Router/orders.router.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

let port = process.env.PORT || 3030;

const bot = new TelegramBot(process.env.TelegramApi, { polling: true });
const webAppUrl = "https://805d-195-158-20-242.ngrok-free.app/catalogforbot";
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
  userInfo.user_id = msg.from.id;

  bot.sendMessage(msg.chat.id, `Пожалуйста отправьте геопозицию`, {
    reply_markup: JSON.stringify({
      keyboard: [[{ text: "Отправить геопозицию", request_location: true }]],
      resize_keyboard: true,
    }),
  });
});

bot.on("location", async (msg) => {
  let { latitude, longitude } = msg.location;

  userInfo.location_latitude = latitude;
  userInfo.location_longitude = longitude;
  userInfo.user_id = msg.from.id;

  fetch("http://localhost:4444/postuser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userInfo.user_id,
      username: userInfo.username,
      phone_number: userInfo.phone_number,
      users_location: [`${latitude}`, `${longitude}`],
      user_language: userInfo.language,
    }),
  });

  bot.sendMessage(
    msg.chat.id,
    `Отлично! Для выбора товара нажмите на кнопку "Меню"`,
    {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            {
              text: `Меню`,
              web_app: {
                url: `${webAppUrl}`,
              },
            },
          ],
        ],
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
    let max = 0;
    let UsersData = [];
    let products = [];
    let total = +data[0].total;

    for (let i = 0; i < data.length; i++) {
      products.push(data[i]);
    }

    if (msg?.web_app_data?.data.length > 0) {
      fetch("http://localhost:4444/postorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: products,
          total: total,
          by_username: msg.from.username,
        }),
      });

      await fetch("http://localhost:4444/get", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          max = +data.max;
        });

      await fetch("http://localhost:4444/getuser", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          UsersData.push(data);
        });
    }
    console.log(UsersData);
    console.log(UsersData[0].users_location);
    console.log(UsersData[0].users_location[0]);
    const token = process.env.TelegramApi;
    const chat_id = process.env.CHAT_ID;
    const message = ` <b>Заявка с сайта!</b> %0A
    <b>Заказ номер: ${max}</b> %0A
    <b>Имя пользователя: @${UsersData[0].username}</b> %0A
    <b>Адрес: ${UsersData[0].users_location[0]}, ${
      UsersData[0].users_location[1]
    } (Локация после сообщения)</b> %0A
    <b>Номер телефона: +${UsersData[0].phone_number}</b> %0A
    <b>Товары в корзине: ${data.map((i) => {
      let text = `<b> %0A      - ${i.product_name} x ${i.count} (${i.regular_price})</b>`;
      return text;
    })}</b> %0A
    %0A 
    <b>Информация об оплате (наличные)</b> %0A
    <b>Подытог: ${data[0].total - 15000} сум</b> %0A
    <b>Доставка: 15 000 сум</b> %0A
    <b>Скидка: ${data[0].discount} сум</b> %0A
    <b>Итого: ${data[0].total} сум</b> %0A`;

    await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${message}`
    );
    await axios.post(
      `https://api.telegram.org/bot${token}/sendLocation?chat_id=${chat_id}&latitude=${userInfo.location_latitude}&longitude=${userInfo.location_longitude}`
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
      `Buyurtmangiz qabul qilindi tez orada operatorarlar siz bilan bog'lanishadi`,
      {
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: "Отправить геопозицию", request_location: true }],
          ],
          resize_keyboard: true,
        }),
      }
    );
  }
});

app.use(usersandorders);

app.listen(port, () => {
  console.log(port);
});
