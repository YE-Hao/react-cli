import React, { Component } from 'react';

interface Props {
  
}
interface State {
  
}

export default class index extends Component<Props, State> {
  state = {}
  MediaStreamTrack = {}
  context = {};
  video = {};
  componentDidMount(){
    const canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
    this.video = document.querySelector('#video');

  }
  handleOpenCamera = (e:React.MouseEvent) => {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      }).then((stream: any) => {
        console.log(stream);
        this.MediaStreamTrack = typeof stream.stop==='function'? stream:stream.getTracks();
        // const url = URL.createObjectURL(stream);
        // video.src = url;
        this.video.srcObject = stream;
        this.video.play();
      }).catch((err) => {
        console.log(err);
      })
    }
  }
  closeCamera = () => {
    console.log(this.MediaStreamTrack)
    this.MediaStreamTrack && this.MediaStreamTrack[1].stop();
    this.MediaStreamTrack && this.MediaStreamTrack[0].stop();
  }
  handleImg = () => {
    this.context.drawImage(this.video, 0, 0,200,150);
  }
  testWs = () => {
    const ws = new WebSocket('ws://10.10.30.125:8803');
    ws.onopen = () => {
      console.log("Connection open ..."); 
      ws.send("Hello WebSockets!");
    }
    ws.onmessage = (evt) => {
      console.log( "Received Message: " + evt.data);
      ws.close();
    };
    ws.onclose = (evt) => {
      console.log("Connection closed.");
    };
  }
  render() {
    return (
      <div>
        <video width="200px" height="150px" id="video"></video>
        <canvas width="200px" height="150px" id="canvas"></canvas>
        <p>
            <button onClick={this.handleOpenCamera}>打开摄像头</button>
            <button id="snap" onClick={this.handleImg}>截取图像</button>
            <button id="close" onClick={this.closeCamera}>关闭摄像头</button>
            <button onClick={this.testWs}>测试ws</button>
        </p>
      </div>
    )
  }
}
