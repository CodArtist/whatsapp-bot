const express = require("express");
const qrcode = require('qrcode-terminal');

const { Client, RemoteAuth } = require('whatsapp-web.js');

const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const uri = "mongodb+srv://harshabcd9:Harshmongodb2001*@cluster0.nitambn.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const fs = require("fs");
const { initializeWhatsapp } = require("./server");

app.use(express.json());
app.use(cors());
let store
// mongoose.connect(uri).then(() => {
//     console.log("connected to mongo db")
//     store = new MongoStore({ mongoose: mongoose });
   
// });
    
function createWhatsappSession(){
       const client = new Client({
    // authStrategy: new RemoteAuth({
    //     clientId:'hj',
    //     store: store,
    //     backupSyncIntervalMs: 300000
    // }),
    puppeteer:{
        // headless:false,
        args:[
            "-no-sandbox",
            "-disable-setuid-sandbox",
            "-disable-dev-shm-usage"
        ]
    }

});
// const client = new Client()
client.on('qr', qr => {
    console.log("Generating QR");
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
   
     // Number where you want to send the message.
    // const number = "+917771830634";
   
    //  // Your message.
    // const text = "Hey Harshita";
   
    //  // Getting chatId from the number.
    //  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    // const chatId = number.substring(1) + "@c.us";
   
    // // Sending message.
    // client.sendMessage(chatId, text);
   });
   client.initialize()
}
   

app.get("/init", (req, res) => {
  createWhatsappSession()
  res.status(200).send("initializing");
});



app.get("/dir", (req, res) => {
  fs.readdir("./", (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Dir read failed");
    } else {
      console.log(files);
      return res.status(200).json({ dir: files });
    }
  });
});

app.listen(PORT, () => console.log(`listening on PORT - ${PORT}`));
