import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//opening server
app.listen(port, () => console.log(`server started at ${port}`));

//using body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  console.log(req.body);
});
