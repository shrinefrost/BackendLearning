import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
import fs from "fs/promises";

let publicBlogs = "";
let userBlogs = "";

//function to handel the data extraction from the json files
async function readData() {
  publicBlogs = await fs.readFile(
    __dirname + "/public/blogContent/publicBlogs.json",
    "utf-8"
  );

  userBlogs = await fs.readFile(
    __dirname + "/public/blogContent/userBlogs.json",
    "utf-8"
  );
  publicBlogs = JSON.parse(publicBlogs);
  userBlogs = JSON.parse(userBlogs);
}

//function to handle the data writing of the user
async function writeData(title, blog) {
  //reading the file
  let logs = await fs.readFile(
    __dirname + "/public/blogContent/userBlogs.json",
    "utf-8"
  );
  logs = JSON.parse(logs);

  //adding the entered blog
  logs[title] = blog;
  //writing file
  await fs.writeFile(
    __dirname + "/public/blogContent/userBlogs.json",
    JSON.stringify(logs, null, 2)
  );
}

const app = express();
const port = 3000;

//opening server to listen
app.listen(port, async () => {
  console.log(`server is listening at ${port}`);
});

//storing the static for browser
app.use(express.static("public"));

/* ------------------------ Handling the readSection Routes from here-----------------------------*/

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
});

//handling post from the root showing list and the selected blog
app.post("/blogList", async (req, res) => {
  await readData();
  res.render(__dirname + "/views/ReadingSectionFiles/blogList.ejs", {
    userBlogs: userBlogs,
    publicBlogs: publicBlogs,
  });
});

app.get("/blogList/:blogId", async (req, res) => {
  await readData();
  const blogId = req.params.blogId;
  const blog =
    publicBlogs[blogId] == undefined ? userBlogs[blogId] : publicBlogs[blogId];

  res.render(__dirname + "/views/ReadingSectionFiles/selectedBlog.ejs", {
    title: blogId,
    blog: blog,
  });
});

/* ------------------------ Handling the Writing Section details from here-----------------------------*/

app.post("/write", (req, res) => {
  res.render(__dirname + "/views/writingSectionFiles/writingArea.ejs");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/blogCreated", async (req, res) => {
  console.log(req.body);
  await writeData(req.body.title, req.body.blog);
  await readData();
  res.render(__dirname + "/views/ReadingSectionFiles/blogList.ejs", {
    userBlogs: userBlogs,
    publicBlogs: publicBlogs,
  });
});
