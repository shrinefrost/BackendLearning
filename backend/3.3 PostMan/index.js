import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => console.log(`server have started a ${port}`));

//get request
app.get("/", (req, res) => {
  res.send("welcome at ROOT!");
});

//post request
app.post("/register", (req, res) => {
  res.sendStatus(200);
});

//put request
app.put("/user/suraj", (req, res) => {
  res.sendStatus(201);
});

//patch()
app.patch("/user/surajPandey", (req, res) => {
  res.sendStatus(202);
});

//delete()
app.delete("/user", (req, res) => {
  res.sendStatus(203);
});
