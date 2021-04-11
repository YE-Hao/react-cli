import React, { Component, createRef } from 'react';
import chart from './charts';
import handleChart from './handleChart';
export default class Chart extends Component {
  constructor(props) {
    super();
    this.dom = createRef();
  }
  componentDidMount() {
    const dom = this.dom.current;
    handleChart(dom.querySelector.bind(dom));
  }
  render() {
    return (
      <div ref={this.dom}>
        <div>
          <p>个人信息：
            <strong className="your-user-id"></strong>
            <span style={{ marginLeft: '40px' }}>你的IP地址：</span><strong className="your-ip-addr"></strong>
          </p>
          <p className="msg-info"></p>
          <div style={{ display: 'none', margin: '10px 0 20px' }} className="answer-box">
        收到来自<span className="ringing-ip"></span> user <span className="ringing-user-id"></span>的视频聊天邀请，是否应答？
            <button className="answer-call">接受</button>
            <button className="reject-call">拒绝</button>
          </div>
        </div>
        <main>
          <table className="online-user-list" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>在线用户</th>
                <th>IP</th>
                <th>登陆时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <div className="video-box" style={{ display: 'none' }}>
            <video className="my-video" width="300" height="150" autoPlay></video>
            <video className="remote-video" width="300" height="150" autoPlay></video>
            <div>
              <button className="close-connection-btn">关闭连接</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}