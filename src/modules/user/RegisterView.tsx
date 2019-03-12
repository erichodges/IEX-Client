import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RegisterMutationVariables, RegisterMutation } from "../../schemaTypes";
import { RouteComponentProps } from "react-router-dom";

const registerMutation = gql`
  mutation RegisterMutation(
    $userName: String
    $email: String!
    $password: String!
  ) {
    register(userName: $userName, email: $email, password: $password)
  }
`;
class RegisterView extends PureComponent<RouteComponentProps<{}>> {
  state = {
    userName: "",
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
    const { password, email, userName } = this.state;
    return (
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
      >
        {mutate => (
          <div>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={userName}
              onChange={this.handleChange}
            />
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
            <button
              onClick={async () => {
                const response = await mutate({
                  variables: this.state
                });
                console.log(response);
                this.props.history.push("/login");
              }}
            >
              Register
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default RegisterView;
