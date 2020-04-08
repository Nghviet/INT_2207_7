require('dotenv').config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const api = require('../src/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api",api);
app.get("/",(req,res) => {
	res.send("Welcome to Express");
});

app.listen(port,() =>{
	console.log("Listening");
});