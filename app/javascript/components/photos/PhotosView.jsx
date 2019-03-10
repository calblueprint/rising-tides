/**
* @prop project - project object associated with this row
*/

import React from "react";
import axios from 'axios';
import PhotoView from './PhotoView'

class PhotosView extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        photos: []
    }
  }

  componentDidMount() {
  }

  render() {
    const { photos } = this.props;

    let photosList;

    if (photos.length != 0) {
      photosList = photos.map((photo, index) => {
          return <PhotoView photo={photo} key={index} />
      });
    } else {
        photosList = (
          <li>
          No Results
          </li>
          )
    }

    return (
        <div>
            {photosList}
        </div>
    );
  }
}

export default PhotosView;
