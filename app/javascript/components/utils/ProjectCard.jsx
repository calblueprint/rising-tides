import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";

class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
    this.renderHoveredCard = this.renderHoveredCard.bind(this);
    this.renderNormalCard = this.renderNormalCard.bind(this);
    this.goToProject = this.goToProject.bind(this);
    this.renderDate = this.renderDate.bind(this);
    this.state = {
      organization: null
    }
  }

  componentDidMount() {
    if (this.props.project.organization_id != null) {
      console.log(this.props);
      axios.get(`/api/organizations/${this.props.project.organization_id}`).then(ret => {
        let organization = ret.data;
        this.setState({ organization });
      })
    } else {
      console.log(`Project ${this.props.project.id} not tied to an organization!`);
    }
  }

  renderDate(date) {
    let d = new Date(date);
    return d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
  }

  renderHoveredCard() {
    let hoveredCard = null;

    hoveredCard = this.state.organization ? 
    <div className="ma2 pa2 h-auto col-item bg-white fl w-100 w-third-ns relative" onClick={this.goToProject}>
      <h1 className="f3 roboto">
        {this.props.project.title}
      </h1>
      <p className="f5 roboto">
      {this.state.organization.name} 
      </p>
      <p className="f6 roboto">
        {this.state.organization.city}, {this.state.organization.city} <br/>
        {this.props.project.volunteer_requirements} <br/> 
        {this.renderDate(this.props.project.start_time)} to {this.renderDate(this.props.project.end_time)}
      </p> <br/>
      <p className="f7 roboto"> 
        {this.props.project.description} 
      </p>
  </div>: null
    return hoveredCard
  }

  renderNormalCard() {
    let normalCard = null;
    normalCard = this.state.organization ? 
    <div className="ma2 pa2 col-item bg-lightest-blue fl w-100 w-third-ns relative" onClick={this.goToProject}>
      <img src="http://placekitten.com/g/600/300" className="db h5 w-100 br2 br--top" alt="Photo of a kitten looking menacing."/>
      <h1 className="f3 roboto">
        {this.props.project.title}
      </h1>
      <p className="f5 roboto">
        {this.state.organization.name}
      </p>
  </div> : null
    return normalCard
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