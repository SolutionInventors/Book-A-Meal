export default function verifyToken(req, resp, next) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const splittedStr = bearerHeader.split(' ');
    [, req.token] = splittedStr;
    next();
  } else {
    resp.status(403).json({
      success: false,
      message: 'Restricted to unauthorized users. Provide authentification and try again.',
    });
  }
}

