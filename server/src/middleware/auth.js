const { verify } = require('jsonwebtoken');

const authentication = (req, res, next) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(401).send({ error: 'Please authenticate' });
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.currentUser = payload;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = authentication;
