import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Debtors } from '../api/debtors';
import DebtorProfileHeader from './DebtorProfileHeader';
import DebtorProfileItem from './DebtorProfileItem'

export const DebtorProfile = (props) => {
  return(
    <div>
      <DebtorProfileHeader/>
      {props.debtors.map((debtor) => {
        return <DebtorProfileItem key={debtor._id} debtor={debtor}/>;
      })};
      DebtorProfile { props.debtors.length }
    </div>
  );
};

DebtorProfile.propTypes = {
  debtors: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('debtors');

  return {
    debtors: Debtors.find().fetch()
  };
}, DebtorProfile);
