import {action, computed, observable, reaction} from "mobx";

export default class AuthStore {
  @observable token: any = window.localStorage.getItem('access_token');

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('access_token', token);
        } else {
          window.localStorage.removeItem('access_token');
        }
      }
    );
  }
  @computed get isAuthenticated() {
    return  this.token !== null || (typeof this.token === 'string')
  }

  @action setToken(value: string | null) {
    this.token = value;
  }
}

export const authStore = new AuthStore();
