import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

//Here is where you fill out the full debtor profile
export const DebtorProfileItem = (props) => {
  return(
    <div onClick={() => {
      props.Session.set('selectedProfileId', props.debtor._id)
    }}>
      <h5>{ props.debtor.fname || 'Unnamed' }</h5>
      <p>{ moment(props.debtor.createdAt).format('M/DD/YY') }</p>
    </div>
  );
};

DebtorProfileItem.propTypes = {
  debtor: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return {Session}
}, DebtorProfileItem);
