import React from 'react';
import moment from 'moment';

//Here is where you fill out the full debtor profile
const DebtorProfileItem = (props) => {
  return(
    <div>
      <h5>{ props.debtor.fname || 'Unnamed' }</h5>
      <p>{ moment(props.debtor.createdAt).format('M/DD/YY') }</p>
    </div>
  );
};

DebtorProfileItem.propTypes = {
  debtor: React.PropTypes.object.isRequired
};

export default DebtorProfileItem;
