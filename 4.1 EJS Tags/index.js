import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.listen(port, () => console.log(`server listening at ${port}`));

app.get("/", (req, res) => {
  const data = {
    title: "EJS Tags",
    seconds: new Date().getSeconds(),
    items: ["apples", "bananas", "cherries"],
    htmlContent: "<em>this is some em text</em>",
  };
  res.render(__dirname + "/view/index.ejs", data);
});
