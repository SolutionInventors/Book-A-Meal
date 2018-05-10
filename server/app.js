/* eslint no-console: off */

import bodyParser from 'body-parser';
import express from 'express';
import apiV1 from './routers/apiV1Router';


const port = process.env.PORT || 4000;
const app = express();


app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.listen(port, (err) => {
  if (err) console.log('Error');
  else {
    console.log(`Successfully set up in port ${port}`);
  }
});

app.use('/api', apiV1);
app.get('/*', (req, resp) => {
  resp.status(404).json({
    success: false,
    message: 'Specified route is not valid',
  });
});
