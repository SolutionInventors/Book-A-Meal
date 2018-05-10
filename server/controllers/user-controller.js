import userService from '../services/user-service';
import authenticator from '../services/authenticaticator';

class UserController {
  register(req, resp) {
    // declaring callbacks
    const errorCallback = (err) => {
      if (err.name == 'SequelizeUniqueConstraintError') {
        resp.status(412).json({
          success: false,
          message: 'Either the email or the username already exists',
        });
      } else {
        resp.status(500).json({
          success: false,
          message: 'An unknown server error occured while processing your request',
        });
      }
    };

    const successCallback = (user) => {
      if (user) {
        authenticator.createToken(user, (err, token) => {
          if (err) {
            resp.status(500).json({
              success: false,
              message: 'An error occured while the server was processing your request....',
            });
          } else {
            resp.status(201).json({
              success: true,
              user,
              token,
            });
          }
        });
      } else {
        errorCallback();
      }
    };
    // processing request
    const {
      username, email, password, userType,
    } = req.body;
    const userObj = { username, email, password };

    if (username && password && email && userType) {
      if (userType.toLowerCase() == 'customer' || userType.toLowerCase() == 'caterer') {
        userService.register(userObj, userType, successCallback, errorCallback);
      } else {
        resp.status(400).json({
          success: false,
          message: 'The userType value must be either caterer or customer',
        });
      }
    } else {
      const missingData = [];
      if (!username) missingData.push('username');
      if (!password) missingData.push('password');
      if (!email) missingData.push('email');
      if (!userType) missingData.push('userType');
      resp.status(400).json({
        success: false,
        message: 'Some required fields are missing',
        missingData,
      });
    }
  }

  login(req, resp) {
    const callback = (userObj) => {
      if (userObj) {
        authenticator.createToken(userObj, (err, token) => {
          if (err) {
            resp.status(500).json({
              success: false,
              message: 'An error occured while the server was creating your token...',
            });
          } else {
            resp.status(201).json({
              success: true,
              user: userObj,
              token,
            });
          }
        });
      } else {
        resp.status(404).json({
          success: false,
          data: 'The spcified username and password was not found in the database',
        });
      }
    };

    const errorCallback = (err) => {
      console.log(err);
      resp.status(500).json({
        success: false,
        message: 'Unknown Error',
      });
    };
    const {
      username, password, userType,
    } = req.body;
    if (username && password && userType) {
      if (userType == 'customer' || userType == 'caterer') {
        userService.find({
          username,
          password,
        }, userType, callback, errorCallback);
      } else {
        resp.status(400).json({
          success: false,
          message: 'The userType value must be either caterer or customer',
        });
      }
    } else {
      const missingData = [];
      if (!username) missingData.push('username');
      if (!password) missingData.push('password');
      if (!userType) missingData.push('userType');
      resp.status(400).json({
        success: false,
        message: 'Some required fields are missing',
        missingData,
      });
    }
  }
}

export default UserController;
