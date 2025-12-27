import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

//creating a path to the file
const __dirname = dirname(fileURLToPath(import.meta.url));

//server opening
const app = express();
const port = 3000;
app.listen(port, () => console.log("Listening at 3000"));

//root get call sending a file in response
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//applying the middleware morgan
app.use(morgan("tiny"));

//handling the submit of the form
app.post("/login", (req, res) => {
  res.sendStatus(200);
});
