import express from "express";
import client from "./db/config.js";
import cors from "cors";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import usersandorders from "./Router/orders.router.js";
import SmartUpApi from "./Router/smartup.router.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

let port = process.env.PORT;

const bot = new TelegramBot(process.env.TelegramApi, { polling: true });
const webAppUrl = "https://helios-test.vercel.app/en/catalogforbot";
let number = [1000];
let userInfo = {};

bot.onText(/start/, async (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Здравствуйте ${msg.chat.first_name}!
       Добро пожаловать! Я официальный бот Kaizen Group.
       Здесь можно посмотреть меню и заказать на дом!`,
    {
      reply_markup: JSON.stringify({
        keyboard: [[{ text: "Отправить контакт", request_contact: true }]],
        resize_keyboard: true,
      }),
    }
  );
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

  let check = true;

  let find = await client.query("SELECT * FROM allusers where user_id = $1", [
    userInfo.user_id,
  ]);

  if (find.rows.length > 0) {
    for (let i = 0; i < find.rows.length; i++) {
      if (find.rows[i].user_name == userInfo.username) {
        check = false;
      }
    }
  }

  if (!find.rows.length) {
    let create = await client.query(
      "INSERT INTO allusers(user_id, tg_username, phone_number, users_location, user_language) values($1, $2, $3, $4, $5)",
      [
        userInfo.user_id,
        userInfo.username,
        userInfo.phone_number,
        [`${latitude}`, `${longitude}`],
        userInfo.language,
      ]
    );
  } else {
    let update = await client.query(
      "UPDATE allusers SET users_location = $1 where user_id = $2",
      [[`${latitude}`, `${longitude}`], userInfo.user_id]
    );
  }

  bot.sendMessage(msg.chat.id, `Выберите продукты из раздела Меню`, {
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
  });
});

bot.on("message", async (msg) => {
  if (msg.web_app_data?.data) {
    let resN = number[0] + 1;
    number.unshift(resN);

    try {
      const data = JSON.parse(msg.web_app_data.data);
      console.log("data", data);
      let UsersData = [];
      let products = [];
      let total = +data.total;

      for (let i = 0; i < data.order_products.length; i++) {
        products.push(data.order_products[i]);
      }

      if (msg.web_app_data.data.length >= 0) {
        let get = await client.query(
          "SELECT * FROM allusers where user_id = $1",
          [userInfo.user_id]
        );
        let date = new Date();
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();
        let created_date = `${month}.${day}.${year}`;
        let create = await client.query(
          "INSERT INTO orders(products, total, created_date, username) values($1, $2, $3, $4)",
          [products, total, created_date, get.rows[0].tg_username]
        );

        let max = await client.query("SELECT MAX(id) FROM orders");

        const token = process.env.TelegramApi;
        const chat_id = process.env.CHAT_ID;
        const message = ` <b>Заявка с бота!</b> %0A
      <b>Заказ номер: ${max.rows[0].max}</b> %0A
       <b>Имя пользователя: @${get.rows[0].tg_username}</b> %0A
       <b>Адрес: ${get.rows[0].users_location[0]}, ${
          get.rows[0].users_location[1]
        } (Локация после сообщения)</b> %0A
      <b>Номер телефона: +${get.rows[0].phone_number}</b> %0A
      <b>Товары в корзине: ${data.order_products.map((i) => {
        let text = `<b> %0A      - ${i.product_name} x ${i.count} (${i.regular_price})</b>`;
        return text;
      })}</b> %0A
      %0A
      <b>Информация об оплате (наличные)</b> %0A
      <b>Подытог: ${data.total - 15000} сум</b> %0A
      <b>Доставка: 15 000 сум</b> %0A
      <b>Скидка: ${data.discount} сум</b> %0A
      <b>Итого: ${data.total} сум</b> %0A
    `;

        // await axios.post(
        //   `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${message}`
        // );
        // await axios.post(
        //   `https://api.telegram.org/bot${token}/sendLocation?chat_id=${chat_id}&latitude=${userInfo.location_latitude}&longitude=${userInfo.location_longitude}`
        // );
        console.log(data);
        await fetch(`https://api.kaizen-group.uz/smartup/createOrder`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
        })
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log("error ->", error);
    }
  }
});

bot.on("message", async (msg) => {
  if (msg.web_app_data?.data) {
    await bot.sendMessage(
      msg.chat.id,
      `Ваш заказ принят!    Спасибо за доверие 😊`,
      {
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: "Создать новый заказ", request_location: true }],
            [{ text: "Проверить статус заказы" }],
          ],
          resize_keyboard: true,
        }),
      }
    );
  }
});

app.use(usersandorders);
app.use(SmartUpApi);

app.listen(port, () => {
  console.log(port);
});
