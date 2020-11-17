import React, { Component } from 'react';
import './index.scss';

export default class index extends Component {
  test() {
    const str = 'b';
    const a = 'a' + str;
  }
  render() {
    return (
      <div className="main-content-wrapper">
        this is page two
      </div>
    );
  }
}
