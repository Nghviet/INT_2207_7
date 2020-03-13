const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Viet:h38zErMyM8KyxHcP@mongodb-hreew.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db;

router.get("/",(req,res) => {
});

client.connect((err,db_pointer) => {
	if(err) throw err;
	db = db_pointer.db('DB');
	console.log("DB Connected");
})

function add(username,password,email) {
	bcrypt.hash(password,10,(err,hash) => {
		db.collection('user').insertOne({
			name:username,
			password:hash,
			email:email
		}, (err,res) => {
			if(err) throw err;
		});
	});
}

async function checkLogin(_email,_password) {
	var query = db.collection('user').findOne({email:_email});
	var userData = await query;
	if(userData == null) throw 'Email not exsits';
	var ac = bcrypt.compareSync(_password,userData.password);
	if(ac == false) throw 'Wrong password';
}	

async function checkEmail(email) {
	var query = db.collection('user').findOne({email:email});
	var userData = await query;
	if(userData != null) throw 'Email exsited';
}

module.exports = { 
	add        : add,
	checkLogin : checkLogin,
	checkEmail : checkEmail,
	router     : router
};