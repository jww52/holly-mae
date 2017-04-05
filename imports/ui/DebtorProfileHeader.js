import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export const DebtorProfileHeader = (props) => {
  return (
      <div>
        <p>DebtorProfileHeader</p>
        <button onClick={() => {
          props.meteorCall('debtors.insert');
        }}>Create Profile</button>
      </div>
    );
  };

  DebtorProfileHeader.propyTypes = {
    meteorCall: Ract.PropTypes.func.isRequired
  };

export default createContainer(() => {
  return{
    meteorCall: Meteor.call
  };
}, DebtorProfileHeader);
