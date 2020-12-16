import React, { Component } from 'react';
import PageOne from '@/pages/page-one';
import PageTwo from '@/pages/page-two';
import './index.scss';
import './index.less';
export default class Test extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className="main-wrapper">
        <PageOne/>
        <PageTwo/>
      </div>
    );
  }
}
