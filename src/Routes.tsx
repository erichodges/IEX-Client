import React, { PureComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginView from "./modules/user/LoginView";
import RegisterView from "./modules/user/RegisterView";
import MeView from "./modules/user/MeView";
import Main from "./components/Main";
import { Logout } from "./modules/user/LogoutIndex";
export default class Routes extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" component={LoginView} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterView} />
          <Route path="/me" component={MeView} />
        </Switch>
      </BrowserRouter>
    );
  }
}
