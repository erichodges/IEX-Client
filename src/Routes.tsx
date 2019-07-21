import React, { PureComponent } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Error from "./components/Error";
import Main from "./components/Main";
import LoginView from "./modules/user/LoginView";
import { Logout } from "./modules/user/LogoutIndex";
import MeView from "./modules/user/MeView";
import RegisterView from "./modules/user/RegisterView";
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
          <Route path="/error" component={Error} />
          <Route path="*" component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}
