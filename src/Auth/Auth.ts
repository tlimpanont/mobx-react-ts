import * as auth0 from 'auth0-js';

import history from '../history';
import {authStore} from "../Store/AuthStore";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'tlimpanont.eu.auth0.com',
    clientID: 'uVmmT727EptmpfSm2aj5X1w73wOlOfeX',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://tlimpanont.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this
      .login
      .bind(this);
    this.logout = this
      .logout
      .bind(this);
    this.handleAuthentication = this
      .handleAuthentication
      .bind(this);
    this.isAuthenticated = this
      .isAuthenticated
      .bind(this);
  }

  handleAuthentication() {
    this
      .auth0
      .parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          history.replace('/home');
        } else if (err) {
          history.replace('/home');
          console.log(err);
        }
      });
  }

  setSession(authResult: any) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    authStore.setToken(authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    authStore.setToken(null);
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at') as string);
    return new Date().getTime() < expiresAt;
  }

  login() {
    this
      .auth0
      .authorize();
  }
}
