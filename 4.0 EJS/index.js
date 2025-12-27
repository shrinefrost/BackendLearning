import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.listen(port, () => console.log(`server started at ${port}`));

function dayCal() {
  const today = new Date();
  const day = today.getDay();
  return day;
}
//get
app.get("/", (req, res) => {
  let day = dayCal();
  res.render(__dirname + "/view/index.ejs", {
    day: day,
  });
});
