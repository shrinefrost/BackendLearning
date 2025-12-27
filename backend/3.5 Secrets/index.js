import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const password = "ILoveProgramming";

app.listen(port, () => console.log("port started at 3000"));

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
//handel the get request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});

//handling the form data
app.post("/check", (req, res) => {
  let enteredPassword = req.body.password;
  if (enteredPassword == password) {
    res.sendFile(__dirname + "/public/secrets.html");
  } else {
    res.sendFile(__dirname + "/public/form.html");
  }
});
