'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, [{
    key: 'register',
    value: function register(userObj, userType, successCallback, errorCallback) {
      if (userType === 'customer') {
        _index2.default.Customer.create(userObj).then(function (obj) {
          var customer = {
            username: obj.username,
            email: obj.email,
            id: obj.id,
            userType: userType
          };
          successCallback({ customer: customer });
        }).catch(function (err) {
          return errorCallback(err);
        });
      } else {
        _index2.default.Caterer.create(userObj).then(function (obj) {
          var caterer = {
            username: obj.username,
            email: obj.email,
            id: obj.id,
            userType: userType
          };
          successCallback({ caterer: caterer });
        }).catch(function (err) {
          return errorCallback(err);
        });
      }
    }
  }, {
    key: 'find',
    value: function find(userObj, userType, callback, errorCallback) {
      var whereObj = { username: userObj.username, password: userObj.password };
      var attributes = ['id', 'username', 'email'];
      if (userType === 'caterer') {
        _index2.default.Caterer.findOne({
          where: whereObj,
          attributes: attributes
        }).then(function (caterer) {
          if (caterer) {
            callback({ caterer: caterer });
          }
          callback();
        }).catch(function (error) {
          return errorCallback(error);
        });
      } else {
        _index2.default.Customer.findOne({
          where: whereObj,
          attributes: attributes
        }).then(function (customer) {
          if (customer) {
            callback({ customer: customer });
          }
          callback();
        }).catch(function (error) {
          return errorCallback(error);
        });
      }
    }
  }]);

  return UserService;
}();

exports.default = new UserService();
//# sourceMappingURL=userService.js.map