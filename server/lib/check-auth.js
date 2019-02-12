const crypto = require("crypto");

const salt = "some-secret-key";

function authCheck(req, res, next) {
  const token = req.headers["Authorization"];

  if (!token) return res.status(401).send();

  const hash = crypto.createHash('md5');
  hash.update(token + salt);
  const hashStr = hash.digest('base64');

  if (token) console.log(hashStr);
  req.session.id = token;
  req.session.token = hashStr;
  next();
}

module.exports = authCheck;
