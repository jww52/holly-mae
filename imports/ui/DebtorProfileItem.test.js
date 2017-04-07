import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { DebtorProfileItem } from './DebtorProfileItem';
import { debtors } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('DebtorProfileItem', function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should render first name and timestamp', function (){
      const wrapper = mount(<DebtorProfileItem debtor={debtors[0]} Session={Session}/>);

      expect(wrapper.find('h5').text()).toBe(debtors[0].fname);
      expect(wrapper.find('p').text()).toBe('4/07/17');
    });

    it('should set default first name if no title set', function() {
      const wrapper = mount(<DebtorProfileItem debtor={debtors[1].fname} Session={Session}/>);

      expect(wrapper.find('h5').text()).toBe('Unnamed');
    });

    it('should call set on click', function() {
      const wrapper = mount(<DebtorProfileItem debtor={debtors[0]} Session={Session}/>);

      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectedProfileId', debtors[0]._id)
    })
  });
}
