import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import LandingPage from '../ui/LandingPage';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

const onEnterDebtorPage = (nextState) => {
    Session.set('selectedProfileId', nextState.params.id)
};

const onLeaveDebtorPage = () => {
    Session.set('selectedProfileId', undefined);
};

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  //if on unauthenticated page and logged in, redirect to /dashboard
  if (isUnauthenticatedPage && isAuthenticated) {browserHistory.replace('/dashboard');}
  //if on authenticated page and not logged in, redirect to /
  if (isAuthenticatedPage && !isAuthenticated) {browserHistory.replace('/');}
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};

//onEnterPrivatePage - check if user is not logged in.  If they're not, redirect to /
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={LandingPage} privacy="unauth"/>
      <Route path="/login" component={Login} privacy="unauth"/>
      <Route path="/signup" component={Signup} privacy="unauth"/>
      <Route path="/dashboard" component={Dashboard} privacy="auth"/>
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterDebtorPage} onLeave={onLeaveDebtorPage}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
