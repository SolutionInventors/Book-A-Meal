'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apiV1Router = require('./routers/apiV1Router');

var _apiV1Router2 = _interopRequireDefault(_apiV1Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 4000; /* eslint no-console: off */

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

app.use(_bodyParser2.default.json());

app.listen(port, function (err) {
  if (err) console.log('Error');else {
    console.log('Successfully set up in port ' + port);
  }
});

app.use('/api', _apiV1Router2.default);
app.get('/*', function (req, resp) {
  resp.status(404).json({
    success: false,
    message: 'Specified route is not valid'
  });
});
//# sourceMappingURL=app.js.map