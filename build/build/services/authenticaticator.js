'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var secretkey = 'IaF^M(8%hts$oeL#h3/c*+F"p';

var Authenticator = function () {
  function Authenticator() {
    _classCallCheck(this, Authenticator);
  }

  _createClass(Authenticator, [{
    key: 'createToken',
    value: function createToken(obj, callback) {
      _jsonwebtoken2.default.sign({ user: obj }, secretkey, function (err, token) {
        console.log('create obj', obj);
        callback(err, token);
      });
    }
  }, {
    key: 'validateToken',
    value: function validateToken(token, callback) {
      _jsonwebtoken2.default.verify(token, secretkey, function (err, authData) {
        console.log('validate authData', authData);
        callback(err, authData);
      });
    }
  }]);

  return Authenticator;
}();

exports.default = new Authenticator();
//# sourceMappingURL=authenticaticator.js.map
//# sourceMappingURL=authenticaticator.js.map