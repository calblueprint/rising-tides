import React from "react";
import axios from 'axios'
import Registration from './Registration'
import Login from './Login'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1> Welcome to Rising Tides </h1>

        <Login />

        <Registration/>

      </div>
    )
  }
}

export default Home
