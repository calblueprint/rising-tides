import React from "react";
import axios from 'axios';


class SideBar extends React.Component {

  constructor(props) {
    super(props);
  }

  goToDashboard = () => {
    window.location.href = `/`;
  };

  goToProfile = () => {
    window.location.href = `/users/${this.props.id}`;
  };

  goToBrowse = () => {
    window.location.href = `/projects`;
  };

}

SideBar.proptypes = {
  id: PropTypes.number
}