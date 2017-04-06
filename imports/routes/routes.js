import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import LandingPage from '../ui/LandingPage';
import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup', '/login'];
const authenticatedPages = ['/dashboard'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  //if on unauthenticated page and logged in, redirect to /dashboard
  if (isUnauthenticatedPage && isAuthenticated) {browserHistory.replace('/dashboard');}
  //if on authenticated page and not logged in, redirect to /
  if (isAuthenticatedPage && !isAuthenticated) {browserHistory.replace('/');}
};

//onEnterPrivatePage - check if user is not logged in.  If they're not, redirect to /
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={LandingPage} onEnter={onEnterPublicPage}/>
    <Route path="/login" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
