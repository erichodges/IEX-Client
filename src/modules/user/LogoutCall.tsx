import * as React from "react";

interface Props {
  logout: () => void;
  onFinish: () => void;
}

export class LogoutCall extends React.PureComponent<Props> {
  async componentDidMount() {
    await this.props.logout();
    this.props.onFinish();
  }

  render() {
    return null;
  }
}
