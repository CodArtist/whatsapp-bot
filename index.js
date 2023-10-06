// const express = require("express");
// const qrcode = require('qrcode-terminal');

// const { Client, RemoteAuth } = require('whatsapp-web.js');

// const { MongoStore } = require('wwebjs-mongo');
// const mongoose = require('mongoose');
// const uri = "mongodb+srv://harshabcd9:Harshmongodb2001*@cluster0.nitambn.mongodb.net/?retryWrites=true&w=majority";
// const app = express();
// const PORT = process.env.PORT || 8000;
// const cors = require("cors");
// const fs = require("fs");
// const { initializeWhatsapp } = require("./server");

// app.use(express.json());
// app.use(cors());
// let store
// // mongoose.connect(uri).then(() => {
// //     console.log("connected to mongo db")
// //     store = new MongoStore({ mongoose: mongoose });
   
// // });
    
// function createWhatsappSession(res){
//        const client = new Client({
//     // authStrategy: new RemoteAuth({
//     //     clientId:'hj',
//     //     store: store,
//     //     backupSyncIntervalMs: 300000
//     // }),
//     puppeteer:{
//         // headless:false,
//         args:[
//             "-no-sandbox",
//             "-disable-setuid-sandbox",
//             "-disable-dev-shm-usage"
//         ]
//     }

// });
// // const client = new Client()
// client.on('qr', qr => {
//     console.log("Generating QR");
//     // qrcode.generate(qr, {small: true});
//     console.log("generated qr")
//     res.emit('qrCode', qr);
// });


// client.on('ready', () => {
//     console.log('Client is ready!');
   
//      // Number where you want to send the message.
//     // const number = "+917771830634";
   
//     //  // Your message.
//     // const text = "Hey Harshita";
   
//     //  // Getting chatId from the number.
//     //  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
//     // const chatId = number.substring(1) + "@c.us";
   
//     // // Sending message.
//     // client.sendMessage(chatId, text);
//    });
//    client.initialize()
// }
   

// app.get("/init", (req, res) => {
//   res.on('qrCode', qr => {
//     // Redirect to the /qrcode endpoint with the QR code data
//     console.log("helllooooo")
//     const qrImageUrl = `/qrcode?data=${encodeURIComponent(qr)}`;
//     const htmlResponse = `<html><body><img src="${qrImageUrl}" alt="QR Code"></body></html>`;
//     res.send(htmlResponse);
// });
//   createWhatsappSession(res)
//   res.status(200).send("initializing");
// });

// app.get("/qrcode", (req, res) => {
//   const { data } = req.query;
//   console.log("/qrcode")
//   // Convert the QR code to an image and send it as a response
//   qrcode.toDataURL(data, (err, url) => {
//       if (err) {
//           console.error(err);
//           res.status(500).send("Internal Server Error");
//       } else {
//           res.send(`<img src="${url}" alt="QR Code">`);
//       }
//   });
// });

// app.get("/dir", (req, res) => {
//   fs.readdir("./", (err, files) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send("Dir read failed");
//     } else {
//       console.log(files);
//       return res.status(200).json({ dir: files });
//     }
//   });
// });

// app.listen(PORT, () => console.log(`listening on PORT - ${PORT}`));










const express = require("express");
const qrcode = require('qrcode');
const { Client } = require('whatsapp-web.js');

const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

function createWhatsappSession(res) {
    return new Promise((resolve, reject) => {
        const client = new Client({
            puppeteer: {
                args: [
                    "-no-sandbox",
                    "-disable-setuid-sandbox",
                    "-disable-dev-shm-usage"
                ]
            }
        });

        client.on('qr', qr => {
            console.log("Generating QR");
            console.log(qr)
            // qrcode.generate(qr, { small: true });
            // Resolve the promise with the QR data
            resolve(qr);
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

        client.initialize();
    });
}

app.get("/init", async (req, res) => {
    try {
        // Send the "initializing" message
        // res.write("initializing");

        // Create a promise for the Whatsapp session creation
        const qrCode = await createWhatsappSession(res);

        // Send an HTML response with an img tag directly
        // const qrImageUrl = `/qrcode?data=${encodeURIComponent(qrCode)}`;
        qrcode.toDataURL(qrCode, (err, url) => {
          if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
          } else {
            // console.log(url)
            res.send(`<html><body><img src="${url}" alt="QR Code"></body></html>`)
              // res.send(`<img src="${url}" alt="QR Code">`);

          }
      });
        // const htmlResponse = `<html><body><img src="${qrImageUrl}" alt="QR Code"></body></html>`;
        // console.log(htmlResponse);
        // // End the response with the HTML content
        // res.end(htmlResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Endpoint to get the QR code as an image
app.get("/qrcode", (req, res) => {
    const { data } = req.query;
    // Convert the QR code to an image and send it as a response
    qrcode.toDataURL(data, (err, url) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
          // console.log(url)
          res.send('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />')
            // res.send(`<img src="${url}" alt="QR Code">`);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
