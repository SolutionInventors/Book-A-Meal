import { getCaterer } from '../services/caterer-service';

export default class CatererController {
  login(req, resp) {
    const { username, password } = req.body;
    if (username && password) {
      const caterer = getCaterer(username, password);
      if (caterer) {
        resp.status(200).json({
          success: true,
          caterer,
        });
      } else {
        resp.status(404).json({
          success: false,
          message: 'Wrong username and password',
        });
      }
    } else {
      resp.status(400).json({
        success: false,
        message: 'Some required arguments are missing',
      });
    }
  }
}

