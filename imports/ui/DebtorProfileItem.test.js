import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import DebtorProfileItem from './DebtorProfileItem';

if (Meteor.isClient) {
  describe('DebtorProfileItem', function () {

    it('should render first name and timestamp', function (){
      const fname = 'Georgia';
      const updatedAt = 1491254901151;
      const wrapper = mount(<DebtorProfileItem debtor={{fname, updatedAt}}/>);

      expect(wrapper.find('h5').text()).toBe(fname);
      expect(wrapper.find('p').text()).toBe('4/05/17');
    });

    it('should set default first name if no title set', function() {
      const fname = undefined;
      const updatedAt = 1491254901151;
      const wrapper = mount(<DebtorProfileItem debtor={{fname, updatedAt}}/>);

      expect(wrapper.find('h5').text()).toBe('Unnamed');
    });
  });
}
