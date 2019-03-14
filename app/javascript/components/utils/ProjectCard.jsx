import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Card } from "antd";



class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
    this.renderHoveredCard = this.renderHoveredCard.bind(this);
    this.goToProject = this.goToProject.bind(this);
  }


  renderHoveredCard() {
    return (
      <Card
        title={this.props.project.title} 
        bordered={true} 
        style={{ width: 300, background: '#F2F2F2'}}>
      </Card>
    )
  }

  renderNormalCard() {
    return (
      <article 
        className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <h2>{this.props.project.title}</h2>
      </article>
    )
  }

  goToProject = () => {
    window.location.href = `/projects/${this.props.project.id}`;
  };

  render() {
    return this.renderNormalCard();
  }
}

ProjectCard.propTypes = {
  project: PropTypes.object,
  // photos: PropTypes.string,
  // project_type: PropTypes.string
};

export default ProjectCard;