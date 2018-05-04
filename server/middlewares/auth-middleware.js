
function verifyToken(req, resp, next) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    req.token = token;
    next();
  } else {
    resp.status(403).send({
      error: { message: 'Restricted to unauthorized users. Provide authentification and try again.' },
    });
  }
}

module.exports = {
  verifyToken,
};
