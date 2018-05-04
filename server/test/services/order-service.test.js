import orderService from '../../services/order-service';

import menuService from '../services/menu';
import { assert } from 'chai';

const Order = require('../../models/Order');

describe('order-services', () => {
  const orderarr = ['item1', 'fh'];
  const customer = 'customer1';
  const date = 'chi';


  const anOrder = new Order(orderarr, customer, date);
  const ObjreturnedbymakeOrder = orderService.makeOrder(anOrder);


  describe('valid order object test', () => {
    it('checks if created item is an object', () => {
      assert.isObject(orderService);
    });

    it('should return all the orders in db', () => {
      assert.isDefined(orderService.getAllMeals());
    });


    it('should create a new order using values passed', () => {
      assert.isDefined(validObj);
    });
    describe('get by name and id and their respective test', () => {
      it('testing return value for name', () => {
        assert.isDefined(ObjreturnedbymakeOrder);
      });


      it(`expects returned value to have an name of ${orderarr}`, () => {
        assert.isTrue(ObjreturnedbymakeOrder.orderarr == orderarr);
      });

      it(`expects returned value to have a name of${customer}`, () => {
        assert.isTrue(ObjreturnedbymakeOrder.customer == customer);
      });
      it(`expects returned value to have a password of ${date}`, () => {
        assert.isTrue(ObjreturnedbymakeOrder.date == date);
      });
    });
  });

  describe('invalid order object test', () => {
    it('should create a new order using values passed', () => {
      assert.isDefined(orderService.makeOrder());
    });

    it('testing return value for name', () => {
      assert.isDefined(orderService.modify());
    });

    it('should find a order using ID', () => {
      assert.isDefined(orderService.getOrdersByDate());
    });


    it('should delete a order using ID', () => {
      assert.isDefined(orderService.getOrderFromMealIdArr());
    });
  });
});
