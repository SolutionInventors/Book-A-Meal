'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _userService = require('../services/userService');

var _userService2 = _interopRequireDefault(_userService);

var _authenticaticator = require('../services/authenticaticator');

var _authenticaticator2 = _interopRequireDefault(_authenticaticator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: 'register',
    value: function register(req, resp) {
      // declaring callbacks
      var errorCallback = function errorCallback(err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
          resp.status(412).json({
            success: false,
            message: 'Either the email or the username already exists'
          });
        } else {
          resp.status(500).json({
            success: false,
            message: 'An unknown server error occured while processing your request'
          });
        }
      };

      var successCallback = function successCallback(user) {
        if (user) {
          _authenticaticator2.default.createToken(user, function (err, token) {
            if (err) {
              resp.status(500).json({
                success: false,
                message: 'An error occured while the server was processing your request....'
              });
            } else {
              resp.status(201).json({
                success: true,
                user: user,
                token: token
              });
            }
          });
        } else {
          errorCallback();
        }
      };
      // processing request
      var _req$body = req.body,
          username = _req$body.username,
          email = _req$body.email,
          password = _req$body.password,
          userType = _req$body.userType;

      var userObj = { username: username, email: email, password: password };

      if (username && password && email && userType) {
        if (userType.toLowerCase() === 'customer' || userType.toLowerCase() === 'caterer') {
          _userService2.default.register(userObj, userType, successCallback, errorCallback);
        } else {
          resp.status(400).json({
            success: false,
            message: 'The userType value must be either caterer or customer'
          });
        }
      } else {
        var missingData = [];
        if (!username) missingData.push('username');
        if (!password) missingData.push('password');
        if (!email) missingData.push('email');
        if (!userType) missingData.push('userType');
        resp.status(400).json({
          success: false,
          message: 'Some required fields are missing',
          missingData: missingData
        });
      }
    }
  }, {
    key: 'login',
    value: function login(req, resp) {
      var callback = function callback(userObj) {
        if (userObj) {
          _authenticaticator2.default.createToken(userObj, function (err, token) {
            if (err) {
              resp.status(500).json({
                success: false,
                message: 'An error occured while the server was creating your token...'
              });
            } else {
              resp.status(201).json({
                success: true,
                user: userObj,
                token: token
              });
            }
          });
        } else {
          resp.status(404).json({
            success: false,
            data: 'The spcified username and password was not found in the database'
          });
        }
      };

      var errorCallback = function errorCallback(err) {
        console.log(err);
        resp.status(500).json({
          success: false,
          message: 'Unknown Error'
        });
      };
      var _req$body2 = req.body,
          username = _req$body2.username,
          password = _req$body2.password,
          userType = _req$body2.userType;

      if (username && password && userType) {
        if (userType === 'customer' || userType === 'caterer') {
          _userService2.default.find({
            username: username,
            password: password
          }, userType, callback, errorCallback);
        } else {
          resp.status(400).json({
            success: false,
            message: 'The userType value must be either caterer or customer'
          });
        }
      } else {
        var missingData = [];
        if (!username) missingData.push('username');
        if (!password) missingData.push('password');
        if (!userType) missingData.push('userType');
        resp.status(400).json({
          success: false,
          message: 'Some required fields are missing',
          missingData: missingData
        });
      }
    }
  }]);

  return UserController;
}();

exports.default = UserController;
//# sourceMappingURL=userController.js.map