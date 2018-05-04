'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

exports.default = verifyToken;

var _authenticaticator = require('../services/authenticaticator');

var _authenticaticator2 = _interopRequireDefault(_authenticaticator);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function verifyToken(req, resp, next) {
  var bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    var splittedStr = bearerHeader.split(' ');

    var _splittedStr = _slicedToArray(splittedStr, 2),
        token = _splittedStr[1];

    req.token = token;
    _authenticaticator2.default.validateToken(token, function (err, authData) {
      if (err) {
        resp.status(403).json({
          success: false,
          message: 'The token you provided is invalid'
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
      message: 'Restricted to unauthorized users. Provide authentification and try again.'
    });
  }
}
//# sourceMappingURL=verifyToken.js.map
//# sourceMappingURL=verifyToken.js.map