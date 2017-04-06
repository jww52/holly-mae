import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { DebtorProfile } from './DebtorProfile';
import { debtors } from '../fixtures/fixtures';


if (Meteor.isClient) {
  describe('DebtorProfile', function() {

    it('should render DebtorProfileItem for each debtor', function() {
      const wrapper = mount(<DebtorProfile debtors={debtors}/>);

      expect(wrapper.find('DebtorProfileItem').length).toBe(2);
      expect(wrapper.find('DebtorProfileEmpty').length).toBe(0);
    })

    it('should render DebtorProfileEmpty if zero debtor items', function () {
      const wrapper = mount(<DebtorProfile debtors={[]}/>);

      expect(wrapper.find('DebtorProfileItem').length).toBe(0);
      expect(wrapper.find('DebtorProfileEmpty').length).toBe(1);
    });

  });
};
