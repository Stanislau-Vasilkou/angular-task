var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var port = 3000;
var users = JSON.parse(fs.readFileSync('./users.json'), 'utf-8');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/users', function (req, res) { return res.send(users); });
app.get('/users/:id', function (req, res) {
    var reqId = +req.params.id;
    if (checkId(reqId)) {
        var user = checkId(reqId);
        res.send(user);
    }
    else {
        res.send("user id#" + reqId + " is not found");
    }
});
app.post('/users/add', function (req, res) {
    var lastId = users[users.length - 1].id + 1;
    var user = {
        id: lastId,
        name: null,
        password: null,
        birthDay: null,
        firtstLogin: null,
        notification: null,
        information: null
    };
    setValues(req.body, user);
    users.push(user);
    res.send("user id#" + lastId + " was added");
});
app.put('/users/:id', function (req, res) {
    var reqId = +req.params.id;
    if (checkId(reqId)) {
        var user = checkId(reqId);
        setValues(req.body, user);
        res.send("user id#" + reqId + " was updated");
    }
    else {
        res.send("user id#" + reqId + " is not found");
    }
});
app["delete"]('/users/:id', function (req, res) {
    var reqId = +req.params.id;
    if (checkId(reqId)) {
        users = users.filter(function (user) { return user.id !== reqId; });
        res.send("user id#" + reqId + " was deleted");
    }
    else {
        res.send("user id#" + reqId + " is not found");
    }
});
function checkId(id) {
    return users.find(function (user) { return user.id === id; });
}
function setValues(obj, user) {
    Object.keys(obj).forEach(function (key) { return user[key] = obj[key]; });
}
app.listen(port, function () { return console.log("App running on port " + port + "!"); });
