import * as React from 'react';
import {Button, Navbar} from 'react-bootstrap';
import './App.css';
import {inject, observer} from "mobx-react";
import {when} from "mobx";

const ButtonAuthenticated = (props: any) => {
  const {onClick} = props;
  return (
    <Button
      {...props}
      bsStyle="primary"
      className="btn-margin"
      onClick={onClick}>
      Log Out
    </Button>
  )
}
const ButtonUnAuthenticated = (props: any) => {
  const {onClick} = props;
  return (
    <Button
      {...props}
      bsStyle="primary"
      className="btn-margin"
      onClick={onClick}>Log In</Button>
  )
}

interface AppPropTypes {
  auth: any;
  history: any;
  authStore?: any;
}

@inject('authStore')
@observer
class App extends React.Component<AppPropTypes> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {

    when(
      // once...
      () => !this.props.authStore.isAuthenticated,
      // ... then
      () => {
        debugger
      }
    );
  }

  goTo(route: any) {
    this
      .props
      .history
      .replace(`/${route}`)
  }

  login() {
    this
      .props
      .auth
      .login();
  }

  logout() {
    this
      .props
      .auth
      .logout();
  }

  render() {
    const {isAuthenticated} = this.props.auth;
    // const {token} = this.props.authStore;

    return (
      <div>
        <Navbar fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}>Home</Button>
            {!isAuthenticated() && (<ButtonUnAuthenticated onClick={this.login.bind(this)}/>)}
            {isAuthenticated() && (<ButtonAuthenticated onClick={this.logout.bind(this)}/>)}
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
