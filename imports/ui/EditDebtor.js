import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { Debtors } from '../api/debtors';

export class EditDebtor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fname: '',
        middle: '',
        lname: '',
        phone: '',
        email: '',
        mailing: '',
        apt: '',
        city: '',
        state: '',
        zip: '',
        debt: ''
      };
    }

  handleFnameChange(e) {
    const fname = e.target.value;
    this.setState({ fname })
    this.props.call('debtors.update', this.props.debtor._id, { fname });
  }
  handleMIChange(e) {
    const middle = e.target.value;
    this.setState({ middle })
    this.props.call('debtors.update', this.props.debtor._id, { middle });
  }
  handleLnameChange(e) {
    const lname = e.target.value;
    this.setState({ lname })
    this.props.call('debtors.update', this.props.debtor._id, { lname });
  }
  handlePhoneChange(e) {
    const phone = e.target.value;
    this.setState({ phone })
    this.props.call('debtors.update', this.props.debtor._id, { phone });
  }
  handleEmailChange(e) {
    const email = e.target.value;
    this.setState({ email })
    this.props.call('debtors.update', this.props.debtor._id, { email });
  }
  handleMailingChange(e) {
    const mailing = e.target.value;
    this.setState({ mailing })
    this.props.call('debtors.update', this.props.debtor._id, { mailing });
  }
  handleAptChange(e) {
    const apt = e.target.value;
    this.setState({ apt })
    this.props.call('debtors.update', this.props.debtor._id, { apt });
  }
  handleCityChange(e) {
    const city = e.target.value;
    this.setState({ city })
    this.props.call('debtors.update', this.props.debtor._id, { city });
  }
  handleStateChange(e) {
    const state = e.target.value;
    this.setState({ state })
    this.props.call('debtors.update', this.props.debtor._id, { state });
  }
  handleZipChange(e) {
    const zip = e.target.value;
    this.setState({ zip })
    this.props.call('debtors.update', this.props.debtor._id, { zip });
  }
  handleDebtChange(e) {
    const debt = e.target.value;
    this.setState({ debt })
    this.props.call('debtors.update', this.props.debtor._id, { debt });
  }

  handleRemoval() {
    this.props.call('debtors.remove', this.props.debtor._id);
    this.props.browserHistory.push('/dashboard');
  }

  componentDidUpdate(prevProps, prevState) {
    const currentProfileId =  this.props.debtor ? this.props.debtor._id : undefined;
    const prevProfileId = prevProps.debtor ? prevProps.debtor._id : undefined;

    if (currentProfileId && currentProfileId !== prevProfileId) {
      this.setState({
        fname: this.props.debtor.fname,
        middle: this.props.debtor.middle,
        lname: this.props.debtor.lname,
        phone: this.props.debtor.phone,
        email: this.props.debtor.email,
        mailing: this.props.debtor.mailing,
        apt: this.props.debtor.apt,
        city: this.props.debtor.city,
        state: this.props.debtor.state,
        zip: this.props.debtor.zip,
        debt: this.props.debtor.debt
      })
    }
  }

  render () {
    if (this.props.debtor) {
      return (
        <div>
          <input className="fname" value={this.state.fname} placeholder="First Name" onChange={this.handleFnameChange.bind(this)}/>
          <input value={this.state.middle} placeholder="MI" onChange={this.handleMIChange.bind(this)}/>
          <input value={this.state.lname} placeholder="Last Name" onChange={this.handleLnameChange.bind(this)}/>
          <input value={this.state.phone} placeholder="Phone" onChange={this.handlePhoneChange.bind(this)}/>
          <input value={this.state.email} placeholder="Email" onChange={this.handleEmailChange.bind(this)}/>
          <input value={this.state.mailing} placeholder="Street Address" onChange={this.handleMailingChange.bind(this)}/>
          <input value={this.state.apt} placeholder="Apt" onChange={this.handleAptChange.bind(this)}/>
          <input className="city" value={this.state.city} placeholder="City" onChange={this.handleCityChange.bind(this)}/>
          <input value={this.state.state} placeholder="State" onChange={this.handleStateChange.bind(this)}/>
          <input value={this.state.zip} placeholder="Zip" onChange={this.handleZipChange.bind(this)}/>
          <input value={this.state.debt} placeholder="Est Student Debt" onChange={this.handleDebtChange.bind(this)}/>

          <button onClick={this.handleRemoval.bind(this)}>Delete Note</button>
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
  selectedProfileId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
}

export default createContainer(() => {
  const selectedProfileId = Session.get('selectedProfileId');

  return {
    selectedProfileId,
    debtor: Debtors.findOne(selectedProfileId),
    call: Meteor.call,
    browserHistory
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
