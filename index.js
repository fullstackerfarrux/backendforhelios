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
let auth = 0;

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

bot.on("contact", async (msg) => {
  userInfo.phone_number = msg.contact.phone_number;
  userInfo.username = msg.from.username;
  userInfo.first_name = msg.from.first_name;
  userInfo.language = msg.from.language_code;
  userInfo.user_id = msg.from.id;
  auth = 0;

  let get = await client.query("SELECT * FROM allusers where user_id = $1", [
    userInfo.user_id,
  ]);

  const checkUser = await fetch(
    `https://api.kaizen-group.uz/smartup/getByPhone`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // phone_number: get.rows[0].phone_number.replace("998", ""),
        phone_number: "934581774",
      }),
    }
  )
    .then((res) => {
      return res.statusText;
    })
    .catch((err) => {
      console.log(err);
    });

  if (checkUser == "OK") {
    bot.sendMessage(msg.chat.id, `Пожалуйста отправьте геопозицию`, {
      reply_markup: JSON.stringify({
        keyboard: [[{ text: "Отправить геопозицию", request_location: true }]],
        resize_keyboard: true,
      }),
    });
  } else if (checkUser == "Bad Request") {
    bot.sendMessage(msg.chat.id, `royxatdan otish`, {
      reply_markup: JSON.stringify({
        keyboard: [[{ text: "Yuridik Shaxs" }, { text: "Jismoniy shaxs" }]],
        resize_keyboard: true,
      }),
    });
  }
});

bot.on("message", async (msg) => {
  if (msg.text == "Yuridik Shaxs") {
    await bot.sendMessage(msg.chat.id, "Kompaniyangiz nomini yozing");
    auth = 1;
    console.log("rhis text after shaxs", msg.text);
  } else if (msg.text == "Jismoniy shaxs") {
    bot.sendMessage(msg.chat.id, "Ism Familyezzi yozing");
    auth = 2;
  } else if (auth == 1) {
    console.log("yuridik", msg.text);
  } else if (auth == 2) {
    console.log("jismoniy", msg.text);
  }
});

// bot.on("text", async (msg) => {
//   console.log("tes=xt", msg);
// });

bot.on("location", async (msg) => {
  let { latitude, longitude } = msg.location;

  userInfo.location_latitude = latitude;
  userInfo.location_longitude = longitude;
  userInfo.user_id = msg.from.id;
  auth = 0;

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
      "INSERT INTO allusers(user_id, tg_username, phone_number, users_location, user_language, tg_name) values($1, $2, $3, $4, $5, $6)",
      [
        userInfo.user_id,
        userInfo.username,
        userInfo.phone_number,
        [`${latitude}`, `${longitude}`],
        userInfo.language,
        userInfo.first_name,
      ]
    );
  } else {
    let update = await client.query(
      "UPDATE allusers SET users_location = $1 where user_id = $2",
      [[`${latitude}`, `${longitude}`], userInfo.user_id]
    );
  }
  let get = await client.query("SELECT * FROM allusers where user_id = $1", [
    userInfo.user_id,
  ]);

  await fetch(`https://api.kaizen-group.uz/smartup/createUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: `${get.rows[0].tg_username}`,
      phone_number: `${get.rows[0].phone_number.replace("998", "")}`,
    }),
  })
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log(err);
    });

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
    auth = 0;
    let resN = number[0] + 1;
    number.unshift(resN);

    try {
      const data = JSON.parse(msg.web_app_data.data);
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
        let text = `<b> %0A      - ${i.product_name} x ${i.product_quant} (${i.product_price})</b>`;
        return text;
      })}</b> %0A
      %0A
      <b>Информация об оплате (наличные)</b> %0A
      <b>Подытог: ${data.total - 15000} сум</b> %0A
      <b>Доставка: 15 000 сум</b> %0A
      <b>Скидка: ${data.discount == undefined ? "0" : data.discount} сум</b> %0A
      <b>Итого: ${data.total} сум</b> %0A
    `;

        // await axios.post(
        //   `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${message}`
        // );
        // await axios.post(
        //   `https://api.telegram.org/bot${token}/sendLocation?chat_id=${chat_id}&latitude=${userInfo.location_latitude}&longitude=${userInfo.location_longitude}`
        // );
        await fetch(`https://api.kaizen-group.uz/smartup/createOrder`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: get.rows[0].phone_number.replace("998", ""),
            client_name: get.rows[0].tg_name,
            person_latitude: get.rows[0].users_location[0],
            person_longitude: get.rows[0].users_location[1],
            note: "for bot",
            ...data,
          }),
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
    auth = 0;
    let get = await client.query("SELECT * FROM allusers where user_id = $1", [
      msg.from.id,
    ]);
    console.log(get.rows[0].phone_number.replace("998", ""));
    const myOrders = `https://helios-test.vercel.app/myorders/${get.rows[0].phone_number.replace(
      "998",
      ""
    )}`;
    await bot.sendMessage(
      msg.chat.id,
      `Ваш заказ принят! 
Спасибо за доверие 😊`,
      {
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: "Создать новый заказ", request_location: true }],
            [
              {
                text: "Проверить статус заказы",
                web_app: {
                  url: `${myOrders}`,
                },
              },
            ],
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
