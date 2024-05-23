const mineflayer = require("mineflayer"); // Khai báo mineflayer
const info = require("./config.json"); // Khai báo thông tin
const ms = require("ms");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const pathfinder = require('mineflayer-pathfinder').pathfinder;

const admins = ['namprosh','Homeless'];
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"], // Khai báo ý định
});
const { Client, GatewayIntentBits, ActivityType, PresenceUpdateStatus } = require('discord.js');

function run() {
  const bot = mineflayer.createBot({
    username: info.username,
    version: info.version,
    host: info.ip,
    port: Number(info.port),
   

  });
 
  bot.on("messagestr", async (message) => {
    try {
      if (message.includes("Hãy nhập lệnh : /login < mật khẩu của bạn> để vào server")) {
        setTimeout(() => {
          bot.chat(`/login `); // Chat command to log in
          console.log(" Đã đăng nhập");
        }, 1000); // Wait for 5 seconds before logging in
      }

      if (message.includes("Đăng nhập thành công!")) {
        setTimeout(() => {
          bot.activateItem(0); // Click the first item on the hotbar
          console.log(" Đã click vào item trên hotbar đầu tiên");
        }, 1000); // Wait for 5 seconds before clicking
      }
    } catch (error) {
      console.error(" Lỗi khi thực hiện hành động:", error);
    }
  });

  bot.on('windowOpen', (window) => {
          window.requiresConfirmation = false;

          if (window.slots.length >= 62) {
              bot.simpleClick.leftMouse(13)
          }
      });

  bot.on('end', (reason) => {
    // Thông báo tới console (làm màu thôi ;-;)
    console.log(' Bot mất kết nối với sevrer: ' + info.ip)
    console.log('Với lý do: ' + reason.toString()) // Thông báo lý do
    console.log(' Kết nối lại sau 5 giây.')

    setTimeout(() => {
      console.log(' Đang kết nối lại với server: ' + info.ip)
      run()
    }, ms(`3s`))
  })
 

  const array = [
    "> xem cu Bình bò liên hệ disc: homelessn01",
    "> chó Bình bò ngu vailon",
    "> Homeless đẹp trai",
    "> prefix bot là $ ",
    "> Sử dụng lệnh $help để biết chi tiết",
    "> hãy dùng bot để spam",
    "> cafe Finn mãi đỉnh"
    //...
  ];
  setInterval(
    () => bot.chat(array[Math.floor(Math.random() * array.length)]),
    ms(`25s`),
  );
  
  bot.loadPlugin(tpsPlugin) // Load the plugin

  // Example how to use
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message === '$help') {
      bot.chat(" bạn có thể sử dụng các lệnh như $tps, $skin ...")
    }
  })
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message === '$tps') {
      bot.chat(' tps server là: ' + bot.getTps())
      
    }
  })
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message === '$info') {
      bot.chat(' chủ của bot là homelessn01, muốn biết chi tiết ib')
     
    }
  })
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message === '$discord') {
      bot.chat('tham gia discord của bot: https://discord.gg/d7kdWgu2fd')

    }
  })
  // Sự kiện Discord khi bot sẵn sàng
  client.on("ready", () => {
    console.log(" Bot đã sẵn sàng.");
  });
  client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
      // Thiết lập trạng thái của bot
      client.user.setPresence({
          activity: {
              name: 'with namprosh', // Tên hoạt động của bot
              type: 'STREAMGING' // Loại hoạt động: PLAYING, WATCHING, LISTENING, STREAMING
          },
          status: 'idle' // Trạng thái của bot:e, idle, dnd, invisible
      });
  });
  // Sự kiện Discord khi có tin nhắn mới
  client.on("message", async (message) => {
    if (!message.guild) return; // Bỏ qua nếu không phải trong máy chủ
    if (message.author.bot || message.author.id === client.user.id) return; // Bỏ qua nếu là bot

    if (message.channel.id === "1237408652575510639") {
      message.react("👍"); // Phản ứng với emoji "thích"
      bot.chat(`[${message.author.tag}] ${message.content} | Homeless on top`); // Gửi tin nhắn trong Minecraft
    }

    if (message.author.id === "1237408652575510639") {
      const args = message.content.split(" "); // Tách tin nhắn thành các từ
      const cmd = args.shift().toLowerCase(); // Lấy lệnh và chuyển thành chữ thường
      switch (cmd) {
        case "!chat": {
          if (!args.length) return; // Không có nội dung thì bỏ qua
          await message.react("❤"); // Phản ứng với emoji "trái tim"
          await bot.chat(args.join(" ")); // Gửi nội dung trong Minecraft
          break;
        }
      }
    }
  });

  // Sự kiện khi bot Minecraft gửi tin nhắn
  bot.on("message", (username, message) => {
    let channel = client.channels.cache.get("1237408652575510639");
    if (!channel) return;

    const embed = new MessageEmbed()
      .setColor("#09ED1C")
      .setTitle("livechat")
      .setDescription(`${username}`)
      .setTimestamp();

    channel.send({ embeds: [embed] }); // Gửi tin nhắn đến Discord
  });
}

// Khởi động Discord Bot
client.login(
  "MTIzNTE0MjMwMjIzMDY0MjY5OA.GcmTww.UBTV_OApQ9Gcc6gu9fpr7zxZ7Cgf-CwhgjEwb0",
);

run();
