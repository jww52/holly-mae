import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class EditDebtor extends React.Component {
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
      debt: '',
      isOpen: false,
      error: ''
    };
  }

  onSubmit(e) {
    const { fname, middle, lname, phone, email, mailing, apt, city, state, zip, debt } = this.state;

    e.preventDefault();

    Meteor.call('debtors.upsert', fname, middle, lname, phone, email, mailing, apt, city, state, zip, debt, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }

  onChange(e) {
    const target = e.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

  handleModalClose() {
    this.setState({
      isOpen: false,
      error: ''
    });
  }

  render() {
    return (
      <div>
        <div className="page-content">
          <p>Edit Debtor Paragraph</p>
          <div className="debtor-data">
            <button className="button" onClick={() => this.setState({isOpen: true})}>Edit your information</button>
            <Modal
              isOpen={this.state.isOpen}
              contentLabel="Edit your info"
              onAfterOpen={() => this.refs.fname.focus()}
              onRequestClose={this.handleModalClose.bind(this)}
              className="boxed-view__box"
              overlayClassName="boxed-view boxed-view--modal">
          <h1>Edit your info</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)}>
              <input type="text" name="fname" ref="fname" value={this.state.fname} placeholder="First Name" onChange={this.onChange.bind(this)}/>
              <input type="text" name="middle" ref="middle" value={this.state.middle} placeholder="MI" onChange={this.onChange.bind(this)}/>
              <input type="text" name="lname" ref="lname" value={this.state.lname} placeholder="Last Name" onChange={this.onChange.bind(this)}/>
              <input type="text" name="phone" ref="phone" value={this.state.phone} placeholder="Phone" onChange={this.onChange.bind(this)}/>
              <input type="email" name="email" ref="email" value={this.state.email} placeholder="Email" onChange={this.onChange.bind(this)}/>
              <input type="text" name="mailing" ref="mailing" value={this.state.mailing} placeholder="Mailing Address" onChange={this.onChange.bind(this)}/>
              <input type="text" name="apt" ref="apt" value={this.state.apt} placeholder="Apt/Unit #" maxLength="10" onChange={this.onChange.bind(this)}/>
              <input type="text" name="city" ref="city" value={this.state.city} placeholder="City" onChange={this.onChange.bind(this)}/>
              <input type="text" name="state" ref="state" value={this.state.state} placeholder="ST" maxLength="2" onChange={this.onChange.bind(this)}/>
              <input type="text" name="zip" ref="zip" value={this.state.zip} placeholder="Zip" onChange={this.onChange.bind(this)}/>
              <label>What is your est. debt at this time?</label>
              <span>$</span><input type="text" name="debt" ref="debt" value={this.state.debt} placeholder="25,000" onChange={this.onChange.bind(this)}/>
              <button className="button">Save</button>
            </form>
          </Modal>
          </div>
          <div>
            <input type="checkbox" name="agreement"/>
            <label>Agree to terms</label>
          </div>
        </div>
      </div>
    );
  }
};
