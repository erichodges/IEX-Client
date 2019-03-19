import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { LoginMutationVariables, LoginMutation } from "../../schemaTypes";
import { RouteComponentProps } from "react-router-dom";

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userName
      id
      email
    }
  }
`;

const meQuery = gql`
  query MeQuery {
    me {
      userName
      email
      id
    }
  }
`;

class LoginView extends PureComponent<RouteComponentProps<{}>> {
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
      <Mutation<LoginMutation, LoginMutationVariables>
        update={(cache, { data }) => {
          if (!data || !data.login) {
            return;
          }
          cache.writeQuery({
            query: meQuery,
            data: { me: data.login }
          });
        }}
        mutation={loginMutation}
      >
        {(mutate, { client }) => (
          <div>
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
                this.props.history.push("/");
              }}
            >
              Login
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default LoginView;
