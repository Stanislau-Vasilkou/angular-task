const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;
let users = JSON.parse(fs.readFileSync('./API/users.json'), 'utf-8');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', (req, res) => res.send(users));

app.get('/users/:id', (req, res) =>	{
	let reqId = +req.params.id;
	if(checkId(reqId)) {
		let user = checkId(reqId);
		res.send(user);
	} else {
	res.send(`user id#${reqId} is not found`);
	}
})

app.post('/users/add', (req, res) => {
	let lastId = users[users.length - 1].id + 1; 
	let user = {
		id: lastId,
		name: null,
		password: null,
		birthDay: null,
		firtstLogin: null,
		notification: null,
		information: null
	}
	setValues(req.body, user);
	users.push(user);
	res.send(`user id#${lastId} was added`);
})

app.put('/users/:id', (req, res) => {
	let reqId = +req.params.id;
	if(checkId(reqId)) {
		let user = checkId(reqId);
		setValues(req.body, user);
		res.send(`user id#${reqId} was updated`);
	} else {
		res.send(`user id#${reqId} is not found`);
	}
})

app.delete('/users/:id', (req, res) =>  {
	let reqId = +req.params.id;
	if(checkId(reqId)) {
		users = users.filter((user) => user.id !== reqId);
		res.send(`user id#${reqId} was deleted`);
	} else {
	 res.send(`user id#${reqId} is not found`);
	}
})

function checkId (id) {
	return users.find((user) => user.id === id);
}

function setValues (obj, user) {
	Object.keys(obj).forEach((key) => user[key] = obj[key]);
}

app.listen(port, () => console.log(`App running on port ${port}!`));

