import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";

class AppReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          appStatus: this.props.application.status,
          //userType
        }
    }

    // componentDidMount() {
    //     if (this.props.application.project_id != null) {
    //       console.log(this.props);
    //       axios.get(`/api/project/${this.props.application.project_id}`).then(ret => {
    //         let project = ret.data;
    //         this.setState({ project });
    //         axios.get(`/api/organization/${this.state.project.organization_id}`).then(ret => {
    //           let organization = ret.data;
    //           this.setState({ organization });
    //         })
    //       })
          
    //     } else {
    //       console.log(`Application ${this.props.application.id} not tied to a project!`);
    //     }
    //   }
    
    goBack = e => {
        e.preventDefault();
        window.location.href = "/applications";
    };

    render() {
      return(
        <div>
          <a className="no-link black f2" onClick={this.goBack}>
            <i class="fas fa-angle-left"></i>
          </a>
          <h2 className="impact ma3">{this.props.user.first_name} {this.props.user.last_name}</h2>
  
          <div>{this.state.appStatus}</div>
        </div>
      )
    }
}

AppReview.propTypes = {
    application: PropTypes.object,
    user: PropTypes.object,
    project: PropTypes.object,
    organization: PropTypes.object
  };

export default AppReview;