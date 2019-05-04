import React from "react";
import PropTypes from "prop-types";
import profile_pic from "images/profile_pic.png";

class UserCard extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    let profileUrl = this.props.user.profile_image_file_name;
    if (profileUrl === "/profile_images/original/missing.png" || !this.props.user.profile_image_file_name) {
        profileUrl = profile_pic
    }
      return (
        <a href ={"/users/" + this.props.user.id}>
        <div className="col-item">
            <img src={profileUrl} className="db shadow-1 user-card"/>
                <p className="f4 b lato compact mt2 icon-link black">
                {this.props.user.first_name} {this.props.user.last_name} 
                </p>
            </div>
        </a>
      )
  }
}

UserCard.propTypes = {
    user: PropTypes.object
  };
  
  export default UserCard;