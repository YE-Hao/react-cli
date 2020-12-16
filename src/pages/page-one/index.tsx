import React, { Component } from 'react';
import { Resizable } from 're-resizable';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import './index.scss';
import Test from '@/Test';
const { SubMenu } = Menu;
interface Props {
  dataSource?: Record<string, unknown>
}

interface State {
  data?:any
}
export default class index extends Component<Props, State> {
  
  render() {
    return (
      <Resizable
        defaultSize={{
          width: 320,
          height: 200,
        }}
      >
        <div className="left-menu">
          
        </div>
      </Resizable>
    );
  }
}
