import authenticator from '../services/authenticaticator';

export default function verifyToken(req, resp, next) {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const splittedStr = bearerHeader.split(' ');
    const [, token] = splittedStr;
    req.token = token;
    authenticator.validateToken(token, (err, authData) => {
      if (err) {
        resp.status(403).json({
          success: false,
          message: 'The token you provided is invalid',
        });
      } else {
        req.user = authData;
        console.log(authData, 'authData');
        next();
      }
    });
  } else {
    resp.status(403).json({
      success: false,
      message: 'Restricted to unauthorized users. Provide authentification and try again.',
    });
  }
}

