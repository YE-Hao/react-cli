import React, { Component } from 'react';
import { Resizable } from 're-resizable';
import './index.scss';
interface Props {
  dataSource?: Record<string, unknown>
}

interface State {

}
export default class index extends Component<Props, State> {
  test() {
    const str = 'b';
    const a = 'a' + str;
  }
  render() {
    return (
      <Resizable
        defaultSize={{
          width: 320,
          height: 200,
        }}
      >
        <div className="menu-list">

        </div>
      </Resizable>
    );
  }
}
