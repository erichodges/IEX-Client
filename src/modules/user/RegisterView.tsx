import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { gql } from "apollo-boost";
import React, { PureComponent } from "react";
import { Mutation } from "react-apollo";
import { Link, RouteComponentProps } from "react-router-dom";
import DarkTextField from "../../components/styleComponents/DarkTextField";
// import Typography from "@material-ui/core/Typography";
import styles from "../../components/styles/LoginView.module.css";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";

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
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Card className={styles.card}>
                <CardContent>
                  <div className={styles.contentWrapper}>
                    <DarkTextField
                      autoFocus={true}
                      variant="outlined"
                      margin="dense"
                      type="text"
                      name="userName"
                      placeholder="Username"
                      value={userName}
                      onChange={this.handleChange}
                    />
                    <DarkTextField
                      variant="outlined"
                      margin="dense"
                      type="text"
                      name="email"
                      placeholder="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                    <DarkTextField
                      variant="outlined"
                      margin="dense"
                      type="password"
                      name="password"
                      placeholder="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className={styles.contentWrapper}>
                    <br />
                    <Button
                      onClick={async () => {
                        const response = await mutate({
                          variables: this.state
                        });
                        console.log(response);
                        this.props.history.push("/login");
                      }}
                      color="primary"
                      variant="outlined"
                      size="small"
                    >
                      Register
                    </Button>
                  </div>
                  <br />
                  <Button
                    component={Link}
                    to="/"
                    color="primary"
                    variant="outlined"
                    size="small"
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </div>
        )}
      </Mutation>
    );
  }
}

export default RegisterView;
