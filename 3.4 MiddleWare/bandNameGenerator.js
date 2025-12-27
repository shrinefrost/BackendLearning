import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.listen(port, () => console.log("Listening at 3000"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/bandName.html");
});

app.post("/submit", (req, res) => {
  let bandName = req.body.City + req.body.petName + "😁";
  res.send(`
    <html>
      <body>
        <h1>your band Name is: </h1>
        <h2>${bandName}</h2>
      </body>
    </html>`);
});
