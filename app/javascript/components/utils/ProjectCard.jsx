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
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.toggleHoverState = this.toggleHoverState.bind(this)
    this.state = {
      organization: null,
      type: null,
      isHover: false
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
    <div className="w-third col-item fl">
    <div className="pa2 ma2 bg-white vh-50 shadow-1" onClick={this.goToProject}>
      <h1 className="f3 lato">
        {this.props.project.title}
      </h1>
      <p className="f5 lato">
      {this.state.organization.name} 
      </p> 
      <p className="f6 lato">
      {this.props.project.limit} spots left<br/><br/> 
      {this.state.organization.city}, {this.state.organization.city} <br/><br/>
      {this.props.project.volunteer_requirements}skills needed is null <br/><br/>
      {this.renderDate(this.props.project.start_time)} to {this.renderDate(this.props.project.end_time)}
      </p>
      <p className="f7 lato"> 
        {this.props.project.description} 
      </p>
  </div>
  </div>: null
    return hoveredCard
  }

  renderNormalCard() {
    let normalCard = null;
    normalCard = this.state.organization ? 
    <div className="w-third col-item fl">
      <div className="bg-black vh-50 ma2 shadow-1" onClick={this.goToProject}>
        <img src="http://placekitten.com/g/600/300" className="db h5 w-100 br2 br--top" alt="Photo of a kitten looking menacing."/>
        <div className="bt b--white pr3 pl3 pb3">
          <h1 className="white f4 b lato compact">
            {this.props.project.title}
          </h1>
          <p className="white f5 lato fl truncate">
            {this.state.organization.name}
          </p>
          <br/><br/><br/>
          <div className="fl f5 w4 tc br1 ph3 pv2 mb2 black bg-accent lato b">Status</div>
      </div>
      </div>
  </div> : null
    return normalCard
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHover: !state.isHover
    };
  }

  goToProject = () => {
    window.location.href = `/projects/${this.props.project.id}`;
  };

  render() {
    return (
      <div onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
      >
        {
        this.state.isHover ?
        <div>
          {this.renderHoveredCard()}
        </div>:
        <div>
          {this.renderNormalCard()}
        </div>
        }
      </div>
    )
  }
}

ProjectCard.propTypes = {
  project: PropTypes.object,
  // TO-DO: add photos, project_type, project_status, project_capacity
  // photos: PropTypes.string,
  // project_type: PropTypes.string
};

export default ProjectCard;