import { message } from 'antd';

export default class Chart {
  constructor(ws, remoteUserId, $) {
    this.mediaStream = null;
    this.ws = ws;
    this.pc = null;
    this.remoteUserId = remoteUserId;
    this.candidates = [];
    this.setedRemoteDesc = false;
    this.$ = $;
  }
  initConnect() {
    this.pc = new RTCPeerConnection();
    // 向对方发送nat candidate
    this.pc.onicecandidate = event => {
      if (!event.candidate) {
        return;
      }
      console.log('send remote with my nat candidate', event.candidate);
      this.ws.sendData({
        type: 'candidate',
        data: {
          candidate: event.candidate,
          remoteUserId: this.remoteUserId,
        },
      });
    };
    // 收到对方的视频流
    this.pc.onaddstream = event => {
      const { $ } = this;
      console.log('onaddstream trigger', event.stream);
      $('.remote-video').srcObject = event.stream;
    };
    // 对方关闭
    this.pc.oniceconnectionstatechange = event => {
      console.log('signalingstatechange', this.pc.iceConnectionState);
      const { $ } = this;
      if (this.pc.iceConnectionState === 'disconnected') {
        message.warn('对方关闭了链接！');
        $('.remote-video').srcObject = null;
        this.mediaStream.getVideoTracks()[0].stop();
        $('.video-box').style.display = 'none';
      }
    };
  }
  addCandidate(candidate) {
    candidate && this.candidates.push(candidate);
    if (this.setedRemoteDesc) {
      this.candidates.forEach(cd =>
        this.pc.addIceCandidate(new RTCIceCandidate(cd))
      );
    }
  }
  ring() {
    message.info('正在呼叫对方...');
    this.ws.sendData({
      type: 'setUpCall',
      data: {
        remoteUserId: this.remoteUserId,
      },
    });
  }
  // 收到对方的offer后进行响应
  async answer(offer) {
    // open要在setRemote之前，不然不会触发对方的addstream事件
    await this.openMyCamera();
    await this.pc.setRemoteDescription(offer);
    await this.pc.setLocalDescription(await this.pc.createAnswer());
    console.log('this.pc.localDescription', this.pc.localDescription);
    this.ws.sendData({
      type: 'answer',
      data: {
        desc: this.pc.localDescription,
      },
    });
    this.setedRemoteDesc = true;
    this.addCandidate();
  }
  async onReceiveAnswer(offer) {
    console.log('onRecvAnswer', offer);
    await this.pc.setRemoteDescription(offer);
    this.setedRemoteDesc = true;
    this.addCandidate();
  }
  async call() {
    this.initConnect();
    await this.openMyCamera();
    this.sendOffer();
  }
  async sendOffer() {
    const offer = await this.pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await this.pc.setLocalDescription(offer);
    this.ws.sendData({
      type: 'offer',
      data: {
        desc: this.pc.localDescription,
      },
    });
  }
  async openMyCamera() {
    const { $ } = this;
    $('.video-box').style.display = 'block';
    await this.showMyVideo();
    // this.pc.addStream(this.mediaStream);
    // this.mediaStream.getTracks().forEach(track => {
    //     this.pc.addTrack(track, this.mediaStream);
    // });
  }
  showMyVideo() {
    return navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(mediaStream => {
        const { $ } = this;
        console.log('addStream');
        this.pc.addStream(mediaStream);
        this.mediaStream = mediaStream;
        $('.my-video').srcObject = mediaStream;
      });
  }
  stopMyVideo() {
    if (this.mediaStream) {
      this.mediaStream.getVideoTracks()[0].stop();
      this.mediaStream.getAudioTracks()[0].stop();
    }
  }
  closeConnection() {
    const { $ } = this;
    this.pc.close();
    this.stopMyVideo();
    $('.video-box').style.display = 'none';
  }
}
