import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Card, Avatar } from "antd";



class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
    this.renderHoveredCard = this.renderHoveredCard.bind(this);
    this.goToProject = this.goToProject.bind(this);
  }


  renderHoveredCard() {
    return (
      <Card
        title={this.props.project.title} bordered={true} style={{ width: 300, background: '#ececec'}}>
      </Card>
    )
  }

  renderNormalCard() {
    return (
      <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
        <h2>{this.props.project.title}</h2>
      </article>
    )
  }

  goToProject = () => {
    window.location.href = `/projects/${this.props.project.id}`;
  };

  render() {
    return this.renderHoeveredCard();
  }
}

ProjectCard.propTypes = {
  project: PropTypes.object,
  // photos: PropTypes.string,
  // project_type: PropTypes.string
};

export default ProjectCard;