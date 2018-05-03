import catererService from "../services/caterer-service";
import Caterer from "../models/Caterer";

export default function () {
   
    for (let i = 0; i < 50; i++) {
        let caterer = new Caterer(`Rice${i}`, 2000 + i, 'img.jpg')
        catererService.registerCaterer(caterer);
    }
}