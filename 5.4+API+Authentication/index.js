import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "skadoosh";
const yourPassword = "Suraj2#";
let yourAPIKey = "";
let yourBearerToken = "";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get(`${API_URL}random`);
    console.log(response.data);
    res.render("index.ejs", {
      content: JSON.stringify(response.data),
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  const URL = `${API_URL}all?page=1`;

  const response = await axios.get(URL, {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });

  res.render("index.ejs", {
    content: JSON.stringify(response.data),
  });
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  let response = await axios.get(`${API_URL}generate-api-key`);
  const apiKey = response.data.apiKey;

  response = await axios.get(`${API_URL}filter?score=5&apiKey=${apiKey}`);

  res.render("index.ejs", {
    content: JSON.stringify(response.data),
  });
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402

  let URL = `${API_URL}get-auth-token`;
  try {
    let response = await axios.post(URL, {
      username: yourUsername,
      password: yourPassword,
    });
    yourBearerToken = response.data.token;
    console.log(yourBearerToken);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
  try {
    URL = `${API_URL}secrets/42`;
    let response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    console.log(response.data);
    res.render("index.ejs", {
      content: JSON.stringify(response.data),
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
