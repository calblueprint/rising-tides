import React from "react";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.updateEvents();
  }

  // myFunction() {
  //   var x = document.getElementById("applications");
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }
  // }

  render() {
    console.log(this.props);
    return (
      <div class="mw9 center">
        <h3>Projects</h3> <button onclick="myFunction()"><i class="fas fa-caret-down"></i></button>
        <div id="applications" class="bt">

        </div>
      </div>

    );
  }
}

export default Projects;
