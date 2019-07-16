import React, { PureComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

import styles from "../../components/styles/LoginView.module.css";
import DarkTextField from "../../components/styleComponents/DarkTextField";
import { LoginMutationVariables, LoginMutation } from "../../schemaTypes";

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

const userItemsStyle = {
  marginRight: "2rem"
};

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
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item>
                <Card className={styles.card}>
                  <CardContent>
                    <div className={styles.contentWrapper}>
                      <DarkTextField
                        variant="outlined"
                        type="text"
                        margin="dense"
                        name="email"
                        placeholder="email"
                        required={true}
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className={styles.contentWrapper}>
                      <DarkTextField
                        margin="dense"
                        variant="outlined"
                        type="password"
                        name="password"
                        placeholder="password"
                        required={true}
                        value={password}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className={styles.contentWrapper}>
                      <Button
                        onClick={async () => {
                          const response = await mutate({
                            variables: this.state
                          });
                          console.log(response);
                          this.props.history.push("/");
                        }}
                      >
                        Login
                      </Button>
                    </div>
                    <div>
                      <br />
                      <br />
                      &nbsp;&nbsp;&nbsp;<Link to="/">Main Page</Link>
                      <br />
                      <br />
                      &nbsp;&nbsp;&nbsp;If you don't have a login, please &nbsp;
                      &nbsp;&nbsp;&nbsp;
                      <Link to="/register" style={userItemsStyle}>
                        Register
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
      </Mutation>
    );
  }
}

export default LoginView;
