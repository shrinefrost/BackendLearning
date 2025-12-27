import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

//opening server
app.listen(port, () => {
  console.log(`server started at ${port}`);
});

//using body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//giving the html form in response to the root get request

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
