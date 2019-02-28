import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;
class RegisterView extends PureComponent {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { password, email } = this.state;
    return (
      <Mutation mutation={registerMutation}>
        {() => (
          <form>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={this.handleChange}
            />
            <button onClick={() => console.log("clicked register")}>
              register
            </button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default RegisterView;
