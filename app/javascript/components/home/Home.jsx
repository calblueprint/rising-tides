import React from "react";
import Registration from "./Registration";
import Login from "./Login";
import Button from "../helpers/Button";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1> Welcome to Rising Tides </h1>
        <Login />
        <Registration />
        <Button type="button-primary">
          hello
        </Button>
      </div>
    );
  }
}

export default Home;
