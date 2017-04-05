//import test modules
import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';
//import Component
import {DebtorProfileHeader} from './DebtorProfileHeader';
//if on client, set up describe block
if (Meteor.isClient) {
  describe('DebtorProfileHeader', function() {

    it('should call meteorCall onClick', function() {
      //create spy
      const spy = expect.createSpy();
      //render component with spy
      const wrapper = mount(<DebtorProfileHeader meteorCall={spy}/>);

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalledWith('debtors.insert');

    });
  });
}



  //simulate button click
  //assert spy was called correctly
