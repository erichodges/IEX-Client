import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RegisterMutationVariables, RegisterMutation } from "../../schemaTypes";
import { RouteComponentProps } from "react-router-dom";

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;
class RegisterView extends PureComponent<RouteComponentProps<{}>> {
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
      <Mutation<RegisterMutation, RegisterMutationVariables>
        mutation={registerMutation}
      >
        {mutate => (
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
            <button
              onClick={async () => {
                const response = await mutate({
                  variables: this.state
                });
                console.log(response);
                this.props.history.push("/login");
              }}
            >
              register
            </button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default RegisterView;
