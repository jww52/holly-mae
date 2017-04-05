import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class LandingPage extends React.Component {

  render() {
    return (
        <div className="page-content">
          <div>
            <h1>Holly Mae Nut Co</h1>
            <Link to="/login">Have an account?</Link>
            <Link to="/signup">Need an account?</Link>
          </div>
        </div>
    );
  }
}
