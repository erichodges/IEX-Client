import * as React from "react";
import { LogoutController } from "./LogoutController";
import { RouteComponentProps } from "react-router-dom";
import { LogoutCall } from "./LogoutCall";

export class Logout extends React.PureComponent<RouteComponentProps<{}>> {
  onFinish = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <LogoutController>
        {({ logout }) => (
          <LogoutCall logout={logout} onFinish={this.onFinish} />
        )}
      </LogoutController>
    );
  }
}
