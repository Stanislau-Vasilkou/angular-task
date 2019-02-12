const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authCheck = require('./lib/check-auth');
const session = require('express-session');
let users = require('./users.json');
const delay = require("express-delay");

const app = express();
const PATH = '/users';
const port = 3000;
const delayTime = 500;
let isAutorized = false;

app.use(delay(delayTime));
app.use(bodyParser.json());
// app.set('trust proxy', 1);
// app.use(session({
//   secret: 'skibidi',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));
// app.use(authCheck);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.get(PATH, (req, res) => res.send(users));

app.get(`${PATH}/:id`, (req, res) =>	{
	let reqId = +req.params.id;
	if(checkId(reqId)) {
		let user = checkId(reqId);
		res.send(user);
	} else {
	  res.sendStatus(404);
	}
});

app.post(`${PATH}/add`, (req, res) => {
	let lastId = users[users.length - 1].id + 1; 
	let user = {
		id: lastId,
		name: null,
		password: null,
		birthDay: null,
		firstLogin: null,
		notification: null,
		information: null
	};
	setValues(req.body, user);
	users.push(user);
	res.sendStatus(201);
});

app.post(`${PATH}/login`, (req, res) => {
  const pass = req.body.password;
  const name = req.body.name;
  const user = users.find(user => user.name === name);
  if (user && user.password === pass) {
    res.send(user);
  } else  if (user && user.password !== pass){
    res.send(`incorrect password`);
  } else {
    res.send(401);
  }
});


app.put(`${PATH}/:id`, (req, res) => {
	let reqId = +req.params.id;
	if(checkId(reqId)) {
		let user = checkId(reqId);
		setValues(req.body, user);
		res.send(users[reqId]);
	} else {
		res.sendStatus(404);
	}
});

app.delete(`${PATH}/:id`, (req, res) =>  {
	let reqId = +req.params.id;
	if(checkId(reqId)) {
		users = users.filter((user) => user.id !== reqId);
		res.sendStatus(200);
	} else {
	  res.sendStatus(404);
	}
});

function checkId (id) {
	return users.find((user) => user.id === id);
}

function setValues (obj, user) {
	Object.keys(obj).forEach((key) => user[key] = obj[key]);
}

app.listen(port, () => console.log(`App running on port ${port}!`));
