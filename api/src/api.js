const express = require("express");
const router = express.Router();
const db = require('../src/db');

router.get("/",(req,res) => {
	res.send("API is working properly");
});

router.post("/login",async function(req,res) {
	try {
		var userData = await db.checkLogin(req.body.email,req.body.password);
		let messege = {
			code : 1,
			token : 1,
			_id: userData._id,
			name : userData.name
		};
		res.send(messege);
	} catch(err) {
		console.log(err);
		let messege = {
			code : 0,
			token : 1 
		};
		res.send(messege);
	}
});

router.post("/signup",async (req,res) => {
	try {
		name = req.body.name;
		password = req.body.password;
		email = req.body.email;

		await db.checkEmail(email);
		await db.add(name,password,email);
		var userData = await db.checkLogin(email,password);
		res.send({code : 1,token : 1,_id : userData._id}); 
	}
	catch (err) {
		res.send({code : 0,token : 1});
	}
});

router.post("/post",async(req,res) => {
	//console.log(req.body);
	try {
		console.log(req.body);
		await db.post(req.body.userID,req.body.post,req.body.name);
		res.send({code :1,token :1});
	}
	catch(err) {
		console.log(err);
		res.send({code : 0,token : 1});
	}
})

router.post("/allPost", async(req,res) => {
	try {
		var querry = db.retriveAll(req.body.userID);
		var data = await querry;
		res.send(data);
	}
	catch(err) {
		console.log(err);
	}
})

router.post("/checkEmail", async (req,res) => {
	try {
		await db.checkEmail(req.body.email);
		res.send("1");
	}
	catch(err) {
		res.send("0");
		console.log(err);
	}
})

module.exports = router;