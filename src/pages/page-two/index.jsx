import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Draggable from 'react-draggable';
import JSEncrypt from 'jsencrypt'
import './index.scss';
import { Button } from 'antd';

const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDXaFoMlA3ctUguD0rLbbFVqbajvlBH5jSWaZl7re + Xqp7BvoRwc5HOWGwtNvkUlv3WNIAw / YlUgWIz5r0fV6N8KHqSnV0CIpy7OJW67H1tVQ9Fbt4ZVx9RSJ378IBqN4ucacw2OuqA29I5AS9EhLCJWIXljPNNACmubPiv5mcn6wIDAQAB';

export default class index extends Component {
  state = {
    value: '#fefefe'
  }
  handleChange = (e) => {
    const value = e.target.value;
    document.documentElement.style.setProperty('--THEME-COLOR', value);
    // window.open('https://www.baidu.com');
    // window.opener.postMessage('nihao','https://www.baidu.com');
    // const encryptor = new JSEncrypt();
    // encryptor.setPublicKey(publicKey);
    // const passWord = encryptor.encrypt('yehao1991');
    // console.log(passWord);
    // const container = document.createElement('div');

    const dom = (
      <div>nihaoya</div>
    );
    ReactDom.createPortal(dom, document.getElementById('root'));
    // document.body.appendChild(container);
  //  this.target = window.open('http://127.0.0.1:5500/demo.html');
  }
  handleClick = () => {
    this.target.postMessage('hello tab', 'http://127.0.0.1:5500/demo.html');
  }
  render() {
    return (
      <>
        <div className="main-content-wrapper">
          <input type="color" onChange={e => this.handleChange(e)} value={this.state.value}/>
        </div>
        <Button onClick={this.handleClick}>
          dianji
        </Button>
        <div>
          <Draggable>
            <div>this is a dragger</div>
          </Draggable>
        </div>
      </>
    );
  }
}
