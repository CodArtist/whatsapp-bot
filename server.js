const qrcode = require('qrcode-terminal');

const { Client, RemoteAuth } = require('whatsapp-web.js');

// Require database
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const uri = "mongodb+srv://harshabcd9:Harshmongodb2001*@cluster0.aky57zv.mongodb.net/?retryWrites=true&w=majority";

    


const client = new Client();



//    const client = new Client({
//     authStrategy: new RemoteAuth({
//         store: store,
//         backupSyncIntervalMs: 300000
//     })
// });
client.on('qr', qr => {
    console.log("Generating QR");
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
   
     // Number where you want to send the message.
    const number = "+917771830634";
   
     // Your message.
    const text = "Hey Harshita";
   
     // Getting chatId from the number.
     // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";
   
    // Sending message.
    client.sendMessage(chatId, text);
   });
   
   
   function initializeWhatsapp() {
    
   
    console.log("Initializing Whatsapp");
    client.initialize();
    }

// const fs = require('fs');
// const { Client } = require('whatsapp-web.js');

// // Path where the session data will be stored
// const SESSION_FILE_PATH = './session.json';

// // Load the session data if it has been previously saved
// let sessionData;
// if(fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

// // Use the saved values
// const client = new Client({
//     session: sessionData
// });

// // Save session values to the file upon successful auth
// client.on('authenticated', (session) => {
//     sessionData = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// });

   

// const fs = require('fs');
// const { Client, LegacySessionAuth } = require('whatsapp-web.js');

// // Path where the session data will be stored
// const SESSION_FILE_PATH = './session.json';

// // Load the session data if it has been previously saved
// let sessionData;
// if(fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

// // Use the saved values
// const client = new Client({
//     authStrategy: new LegacySessionAuth({
//         session: sessionData
//     })
// });

// // Save session values to the file upon successful auth
// client.on('authenticated', (session) => {
//     sessionData = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// });
 
module.exports =  { initializeWhatsapp}