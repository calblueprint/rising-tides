import React from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
 
/* const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

*/
 
class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let loader;

    loader = this.props.loading ? (
    <div className="tc pt4 pb4">
        <ClipLoader
          sizeUnit={"px"}
          size={85}
          color={'#000000'}
          loading={this.props.loading}
        />
      </div> 
      ): null;

    return (
        <div>
      {loader}
      </div>
    )
  }
}

export default Loader;