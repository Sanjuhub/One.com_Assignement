const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.TOKEN;
  if (token === 'null') {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = payload;
    next();
  });
};
