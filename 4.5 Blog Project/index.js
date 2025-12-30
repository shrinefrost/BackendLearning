import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
import fs from "fs";

const publicBlogs = JSON.parse(
  fs.readFile(__dirname + "/public/blogContent/publicBlogs.json", "utf-8")
);

const userBlogs = JSON.parse(
  await fs.readFile(__dirname + "/public/blogContent/userBlogs.json", "utf-8")
);

const app = express();
const port = 3000;

//opening server to listen
app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});

//storing the static for browser
app.use(express.static("public"));

/* ------------------------ Handling the readSection Routes from here-----------------------------*/

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
});

//handling post from the root showing list and the selected blog
app.post("/blogList", (req, res) => {
  res.render(__dirname + "/views/ReadingSectionFiles/blogList.ejs", {
    userBlogs: userBlogs,
    publicBlogs: publicBlogs,
  });
});

app.get("/blogList/:blogId", (req, res) => {
  const blogId = req.params.blogId;
  const blog = publicBlogs[blogId];

  res.render(__dirname + "/views/ReadingSectionFiles/selectedBlog.ejs", {
    title: blogId,
    blog: blog,
  });
});

//handling blog list get request
app.get("/blogReadingPage", (req, res) => {
  res.render(__dirname + "/views/ReadingSectionFiles/blogReadingPage.ejs");
});

/* ------------------------ Handling the Writing Section details from here-----------------------------*/

app.post("/write", (req, res) => {
  res.render(__dirname + "/views/writingSectionFiles/writingArea.ejs");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/blogCreated", (req, res) => {
  console.log(req.body);
});
