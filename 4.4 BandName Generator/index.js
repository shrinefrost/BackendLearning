import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});

//to use static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
});

//body parser
app.use(bodyParser.urlencoded({ extended: true }));

//fnction to generate random name
function nameGenerator() {
  const adjectives = [
    "Silent",
    "Electric",
    "Crimson",
    "Broken",
    "Golden",
    "Neon",
    "Midnight",
    "Wild",
    "Fading",
    "Lunar",
  ];

  const nouns = [
    "Echoes",
    "Dreams",
    "Riders",
    "Shadows",
    "Wolves",
    "Storm",
    "Hearts",
    "Skies",
    "Flames",
    "Voyage",
  ];
  const firstWord = adjectives[Math.floor(Math.random() * adjectives.length)];
  const SecondWord = nouns[Math.floor(Math.random() * nouns.length)];

  return firstWord + " " + SecondWord;
}
//writing the main logic

app.post("/generate", (req, res) => {
  const data = nameGenerator();
  res.render(__dirname + "/views/index.ejs", {
    data: data,
  });
});
