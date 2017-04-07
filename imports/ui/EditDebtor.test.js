import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { EditDebtor } from './EditDebtor';
import { debtors } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('EditDebtor', function() {
    let browserHistory;
    let call;

    beforeEach(function() {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render edit or create profile message', function() {
      const wrapper = mount(<EditDebtor browserHistory={browserHistory} call={call}/>)
      expect(wrapper.find('p').text()).toBe('Edit or create your profile.');
    });

    it('should render profile not found message', function() {
      const wrapper = mount(<EditDebtor browserHistory={browserHistory} call={call} selectedProfileId={debtors[0]._id}/>)
      expect(wrapper.find('p').text()).toBe('Profile not found');
    });

    it('should remove profile', function() {
      const wrapper = mount(<EditDebtor browserHistory={browserHistory} call={call} selectedProfileId={debtors[0]._id} debtor={debtors[0]}/>)
      wrapper.find('button').simulate('click');

      expect(call).toHaveBeenCalledWith('debtors.remove', debtors[0]._id);
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');

    });
    it('should update the first name on input change', function() {
          const newFname = 'Rick'
          const wrapper = mount(<EditDebtor browserHistory={browserHistory} call={call} selectedProfileId={debtors[0]._id} debtor={debtors[0]}/>);

          wrapper.find('.fname').simulate('change', {
            target: {
              value: newFname
            }
          });

          expect(wrapper.state('fname')).toBe(newFname);
          expect(call).toHaveBeenCalledWith('debtors.update', debtors[0]._id, { fname: newFname });
        });

    it('should update the city on input change', function() {
      const newCity = 'Lansing';
      const wrapper = mount(<EditDebtor browserHistory={browserHistory} call={call} selectedProfileId={debtors[0]._id} debtor={debtors[0]}/>);

      wrapper.find('.city').simulate('change', {
        target: {
          value: newCity
        }
      });

      expect(wrapper.state('city')).toBe(newCity);
      expect(call).toHaveBeenCalledWith('debtors.update', debtors[0]._id, { city: newCity });
    });

    it('should set state for new profile data', function() {
        const wrapper = mount(<EditDebtor browserHistory={browserHistory} call={call}/>);

        wrapper.setProps({
          selectedProfileId: debtors[0]._id,
          debtor: debtors[0]
          });

          expect(wrapper.state('fname')).toBe(debtors[0].fname);
          expect(wrapper.state('city')).toBe(debtors[0].city);
        });

    it('should not set state for profile if data prop not provided', function() {
        const wrapper = mount(<EditDebtor browserHistory={browserHistory} call={call}/>);

        wrapper.setProps({
          selectedProfileId: debtors[0]._id,
          });

          expect(wrapper.state('fname')).toBe('');
          expect(wrapper.state('city')).toBe('');
        });

      });
    }
