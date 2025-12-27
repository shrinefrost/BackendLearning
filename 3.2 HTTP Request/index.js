import express from "express";

const app = express();
const port = 3000;

//handel the get message in the root

//handel the /about
app.get("/about", (req, res) => {
  res.send("Just testing the get request!");
});

//
//handel the /about
app.get("/contact", (req, res) => {
  res.send("come to my place i will make contact then!");
});

app.listen(port, () => console.log(`server started at port number ${port}`));
