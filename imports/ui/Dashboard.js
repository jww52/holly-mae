import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
// import Modal from 'react-modal';

import PrivateHeader from './PrivateHeader';
// import EditDebtor from './EditDebtor';
import DebtorProfile from './DebtorProfile';

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Dashboard"/>
      <div className="page-content">
        <DebtorProfile/>
        {/* <EditDebtor/> */}
      </div>

    </div>
  );
};
