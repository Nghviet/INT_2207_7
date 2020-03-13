const express = require("express");
const router = express.Router();
const db = require('../src/db');

router.get("/",(req,res) => {
	res.send("API is working properly");
});

router.post("/login",async function(req,res) {
	console.log("Login");
	try {
		await db.checkLogin(req.body.email,req.body.password);
		let messege = {
			code : 1,
			token : 1 
		};
		res.send(messege);
	} catch(err) {
		console.log("Err");
		console.log(err);
		let messege = {
			code : 0,
			token : 1 
		};
		res.send(messege);
	}
});

router.post("/signup",async (req,res) => {
	console.log("Sign up");
	console.log(req.body);
	try {
		username = req.body.username;
		password = req.body.password;
		email = req.body.email;

		await db.checkEmail(email);
		db.add(username,password,email);
		res.send({code : 1,token : 1}); 
	}
	catch (err) {
		res.send({code : 0,token : 1});
	}
});



module.exports = router;