const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Viet:h38zErMyM8KyxHcP@mongodb-hreew.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const objectID = require('mongodb').ObjectID;
var db;

router.get("/",(req,res) => {
});

client.connect((err,db_pointer) => {
	if(err) throw err;
	db = db_pointer.db('DB');
	console.log("DB Connected");
})

function add(name,password,email) {
	bcrypt.hash(password,10,(err,hash) => {
		db.collection('user').insertOne({
			name:name,
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
	return userData;
}	

async function checkEmail(email) {
	var query = db.collection('user').findOne({email:email});
	var userData = await query;
	console.log(userData._id);
	if(userData == null) throw 'Email not exsits';
}

async function post(userID,post,name) {
	try {
		var query = db.collection('user').findOne({ _id : new objectID(userID) });
		var userData = await query;
		if(userData == null) throw 'User not exsist';

		var today = Date.now();

		db.collection('post').insertOne({
			userID : userID,
			post : post,
			name : name,
			date : new Date(Date.now())
		} , (err,res) => {
			if(err) throw err;
		});
	}
	catch(err) {
		console.log("Err");
		console.log(err);
		return err;
	}	
}

async function retriveAll(userID) {
	return db.collection('post').find({userID : userID}).toArray();
}

module.exports = { 
	add        : add,
	checkLogin : checkLogin,
	checkEmail : checkEmail,
	post 	   : post,
	retriveAll : retriveAll,
	router     : router
};