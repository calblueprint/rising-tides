import React from "react";
import logo from "images/rising-tides-logo.svg";
import logoImg from "images/rising-tides-logo-img.png";
import SVG from "react-inlinesvg";
import Login from "./Login";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="vh-100 flex flex-column justify-center items-center">
        <SVG src={logo} className="w-30r">
          <img src={logoImg} alt="logo" />
        </SVG>  
        <div className="w-30r relative">
          <div className="bg-primary h2 w-30r absolute top--1-15" />
        </div>
        <Login />
      </div>
    );
  }
}

export default Home;
