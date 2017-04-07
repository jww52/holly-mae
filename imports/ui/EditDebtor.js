import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Debtors } from '../api/debtors';

export class EditDebtor extends React.Component {
  handleFnameChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      fname: e.target.value
    });
  }
  handleMIChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      middle: e.target.value
    });
  }
  handleLnameChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      lname: e.target.value
    });
  }
  handlePhoneChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      phone: e.target.value
    });
  }
  handleEmailChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      email: e.target.value
    });
  }
  handleMailingChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      mailing: e.target.value
    });
  }
  handleAptChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      apt: e.target.value
    });
  }
  handleCityChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      city: e.target.value
    });
  }
  handleStateChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      state: e.target.value
    });
  }
  handleZipChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      zip: e.target.value
    });
  }
  handleDebtChange(e) {
    this.props.call('debtors.update', this.props.debtor._id, {
      debt: e.target.value
    });
  }

  render () {
    if (this.props.debtor) {
      return (
        <div>
          <input value={this.props.debtor.fname} placeholder="First Name" onChange={this.handleFnameChange.bind(this)}/>
          <input value={this.props.debtor.middle} placeholder="MI" onChange={this.handleMIChange.bind(this)}/>
          <input value={this.props.debtor.lname} placeholder="Last Name" onChange={this.handleLnameChange.bind(this)}/>
          <input value={this.props.debtor.phone} placeholder="Phone" onChange={this.handlePhoneChange.bind(this)}/>
          <input value={this.props.debtor.email} placeholder="Email" onChange={this.handleEmailChange.bind(this)}/>
          <input value={this.props.debtor.mailing} placeholder="Street Address" onChange={this.handleMailingChange.bind(this)}/>
          <input value={this.props.debtor.apt} placeholder="Apt" onChange={this.handleAptChange.bind(this)}/>
          <input value={this.props.debtor.city} placeholder="City" onChange={this.handleCityChange.bind(this)}/>
          <input value={this.props.debtor.state} placeholder="State" onChange={this.handleStateChange.bind(this)}/>
          <input value={this.props.debtor.zip} placeholder="Zip" onChange={this.handleZipChange.bind(this)}/>
          <input value={this.props.debtor.debt} placeholder="Est Student Debt" onChange={this.handleDebtChange.bind(this)}/>

          <button>Delete Note</button>
        </div>
      );
    } else {
      return (
        <p>{ this.props.selectedProfileId ? 'Profile not found': 'Edit or create your profile.' }</p>
      );
    }
  };
};

EditDebtor.propTypes = {
  debtor: React.PropTypes.object,
  selectedProfileId: React.PropTypes.string
}

export default createContainer(() => {
  const selectedProfileId = Session.get('selectedProfileId');

  return {
    selectedProfileId,
    debtor: Debtors.findOne(selectedProfileId),
    call: Meteor.call
  };
}, EditDebtor);

//       fname: '',
//       middle: '',
//       lname: '',
//       phone: '',
//       email: '',
//       mailing: '',
//       apt: '',
//       city: '',
//       state: '',
//       zip: '',
//       debt: '',
//       isOpen: false,
//       error: ''
//     };
//   }
//
//   onSubmit(e) {
//     const { fname, middle, lname, phone, email, mailing, apt, city, state, zip, debt } = this.state;
//
//     e.preventDefault();
//
//     Meteor.call('debtors.upsert', fname, middle, lname, phone, email, mailing, apt, city, state, zip, debt, (err, res) => {
//       if (!err) {
//         this.handleModalClose();
//       } else {
//         this.setState({ error: err.reason });
//       }
//     });
//   }
//
//   onChange(e) {
//     const target = e.target;
//       const value = target.value;
//       const name = target.name;
//
//       this.setState({
//         [name]: value
//       });
//     }
//
//   handleModalClose() {
//     this.setState({
//       isOpen: false,
//       error: ''
//     });
//   }
//
//   render() {
//     return (
//       <div>
//         <div className="page-content">
//           <p>Edit Debtor Paragraph</p>
//           <div className="debtor-data">
//             <button className="button" onClick={() => this.setState({isOpen: true})}>Edit your information</button>
//             <Modal
//               isOpen={this.state.isOpen}
//               contentLabel="Edit your info"
//               onAfterOpen={() => this.refs.fname.focus()}
//               onRequestClose={this.handleModalClose.bind(this)}
//               className="boxed-view__box"
//               overlayClassName="boxed-view boxed-view--modal">
//           <h1>Edit your info</h1>
//             {this.state.error ? <p>{this.state.error}</p> : undefined}
//             <form onSubmit={this.onSubmit.bind(this)}>
//               <input type="text" name="fname" ref="fname" value={this.state.fname} placeholder="First Name" onChange={this.onChange.bind(this)}/>
//               <input type="text" name="middle" ref="middle" value={this.state.middle} placeholder="MI" onChange={this.onChange.bind(this)}/>
//               <input type="text" name="lname" ref="lname" value={this.state.lname} placeholder="Last Name" onChange={this.onChange.bind(this)}/>
//               <input type="text" name="phone" ref="phone" value={this.state.phone} placeholder="Phone" onChange={this.onChange.bind(this)}/>
//               <input type="email" name="email" ref="email" value={this.state.email} placeholder="Email" onChange={this.onChange.bind(this)}/>
//               <input type="text" name="mailing" ref="mailing" value={this.state.mailing} placeholder="Mailing Address" onChange={this.onChange.bind(this)}/>
//               <input type="text" name="apt" ref="apt" value={this.state.apt} placeholder="Apt/Unit #" maxLength="10" onChange={this.onChange.bind(this)}/>
//               <input type="text" name="city" ref="city" value={this.state.city} placeholder="City" onChange={this.onChange.bind(this)}/>
//               <input type="text" name="state" ref="state" value={this.state.state} placeholder="ST" maxLength="2" onChange={this.onChange.bind(this)}/>
//               <input type="text" name="zip" ref="zip" value={this.state.zip} placeholder="Zip" onChange={this.onChange.bind(this)}/>
//               <label>What is your est. debt at this time?</label>
//               <span>$</span><input type="text" name="debt" ref="debt" value={this.state.debt} placeholder="25,000" onChange={this.onChange.bind(this)}/>
//               <button className="button">Save</button>
//             </form>
//           </Modal>
//           </div>
//           <div>
//             <input type="checkbox" name="agreement"/>
//             <label>Agree to terms</label>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };
