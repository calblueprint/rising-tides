import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";

class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
    this.renderCard = this.renderCard.bind(this);
    this.goToProject = this.goToProject.bind(this);
    this.state = {
    }
  }
    
  renderCard() {
    let card = null;
    card = this.state.organization ? 
    <div className="proj-card col-item fl ma2 shadow-1" onClick={this.goToProject}>
        <img src="http://placekitten.com/g/600/300" className="db pic-height w-100 br2 br--top" alt="Photo of a kitten looking menacing."/>
        <div className="bt b--white pa3">
          <p className="f4 b lato compact mt3 ma2">
            {this.props.project.title}
          </p>
          <p className="f5 lato fl truncate mb0 ma2">
            {this.state.organization.name}
          </p>
      </div>
    </div>: null;
    return card;
  }

  goToProject = () => {
    window.location.href = `/projects/${this.props.project.id}`;
  };

  render() {
    return (
      <div>
        {this.renderCard()}
      </div>
    )
  }
}

ProjectCard.propTypes = {
  project: PropTypes.object
};

export default ProjectCard;