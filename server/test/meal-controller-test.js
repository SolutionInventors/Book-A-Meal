import request from "supertest"; 
import mealRouter from "../routes/meals-router"; 
import express from "express"; 
import {expect} from 'chai'; 

const app = express(); 
app.use(mealRouter);
describe('/GET /meal ', ()=> {
    it('should return an object', ()=> {
        
        request(app)
            .get('/meals')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp)=>{
                if(err) throw err; 
            });
    });
});

describe('/POST /meals should create a new meal', ()=> {
    it('should return the created object', ()=> {
        let meal={
            mealName: 'Jollof Rice', 
            amount: 300, 
        };
        request(app)
            .post('/meals/')
            .send(meal)
            .expect('Content-Type', /json/)
            .end((err, resp) => {
                expect(resp.statusCode).to.equal(201); 
                done(); 
            })
    });

    it('should return error when no meal is passed as argument', ()=> {
        request(app)
            .post('/meals/') 
            .end((err, resp)=> {
                expect(resp.statusCode).to.equal(400)
                done(); 
            });
    });
});