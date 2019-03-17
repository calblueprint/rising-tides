import React from "react";
import logo from "images/arctic-institute-logo.png";
import Registration from "./Registration";
import Login from "./Login";
import Button from "../helpers/Button";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img alt="The Arctic Institute Logo" src={logo} />
        <h1> Welcome to Rising Tides </h1>
        <Login />
        <Registration />
        <Button type="button-secondary">
          Sign up
        </Button>
        <Button type="button-primary">
          Sign In
        </Button>
      </div>
    );
  }
}

export default Home;
